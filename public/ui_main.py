import typer
import os
import shutil
import subprocess
import re
from rich.console import Console
from rich.panel import Panel
from typing import Optional

app = typer.Typer(help="Agent UI Starter Pack CLI - The Face (Frontend)", no_args_is_help=True)
console = Console()

REPO_URL = "https://github.com/enriquekalven/agent-ui-starter-pack"

@app.command()
def version():
    """Show the version of the Agent UI Starter Pack CLI."""
    console.print("[bold cyan]agent-ui-starter-pack CLI v0.2.0 (The Face)[/bold cyan]")

@app.command()
def create(
    project_name: str = typer.Argument(..., help="The name of the new UI project"),
    template: str = typer.Option("a2ui", "-t", "--template", help="UI Template (a2ui, agui, lit)"),
):
    """
    Scaffold a new high-fidelity Agent UI project. Focuses on A2UI rendering and premium UX.
    The new project is automatically configured to use the Playground as the main dashboard.
    """
    console.print(Panel(f"🎨 Creating High-Fidelity UI: [bold cyan]{project_name}[/bold cyan]", expand=False))
    
    if os.path.exists(project_name):
        console.print(f"[bold red]Error:[/bold red] Directory '{project_name}' already exists.")
        raise typer.Exit(code=1)
        
    try:
        console.print(f"📡 Cloning A2UI template from [cyan]{REPO_URL}[/cyan]...")
        subprocess.run(["git", "clone", "--depth", "1", REPO_URL, project_name], check=True, capture_output=True)
        
        # Remove git tracking
        git_dir = os.path.join(project_name, ".git")
        if os.path.exists(git_dir):
            shutil.rmtree(git_dir)
        
        # --- Project Transformation (App-ification) ---
        console.print("🛠️  Configuring project as a standalone A2UI Sandbox...")
        app_tsx_path = os.path.join(project_name, "src", "App.tsx")
        if os.path.exists(app_tsx_path):
            with open(app_tsx_path, "r") as f:
                content = f.read()
            
            # Swap Home and Playground routes
            content = content.replace('<Route path="/" element={<Home />} />', '<Route path="/" element={<Playground />} />')
            content = content.replace('<Route path="/playground" element={<Playground />} />', '<Route path="/landing" element={<Home />} />')
            
            with open(app_tsx_path, "w") as f:
                f.write(content)
        
        # Initialize new git repo
        console.print("🔧 Initializing new git repository...")
        subprocess.run(["git", "init"], cwd=project_name, check=True, capture_output=True)
        
        console.print(Panel(
            f"✅ [bold green]Success![/bold green] Agent UI [bold cyan]{project_name}[/bold cyan] created.\n\n"
            f"[bold]Project Mode:[/bold] [yellow]A2UI Sandbox Native[/yellow]\n\n"
            f"[bold]Quick Start:[/bold]\n"
            f"  1. [dim]cd[/dim] {project_name}\n"
            f"  2. [dim]npm install[/dim]\n"
            f"  3. [dim]npm run dev[/dim]\n\n"
            f"Template: [bold cyan]{template}[/bold cyan]\n"
            f"Main Route (/) is now the [bold green]A2UI Playground[/bold green].",
            title="[bold green]Agent UI Scaffolding Complete[/bold green]",
            expand=False,
            border_style="green"
        ))
    except subprocess.CalledProcessError as e:
        console.print(f"[bold red]Error during git operation:[/bold red] {e.stderr.decode() if e.stderr else str(e)}")
        raise typer.Exit(code=1)
    except Exception as e:
        console.print(f"[bold red]Unexpected Error:[/bold red] {str(e)}")
        raise typer.Exit(code=1)

@app.command()
def deploy(
    project: str = typer.Option(None, "--project", "-p", help="GCP Project ID"),
    region: str = typer.Option("us-central1", "--region", "-r", help="GCP Region"),
    skip_engine: bool = typer.Option(False, "--skip-engine", help="Only deploy the frontend UI"),
):
    """
    Deploy the Full Stack (The Face + The Engine).
    Deploys the UI to Firebase Hosting and the Agent Backend to Cloud Run.
    """
    if not project:
        project = os.getenv("GOOGLE_CLOUD_PROJECT")
    
    if not project:
        console.print("[bold red]Error:[/bold red] Project ID must be provided via --project or GOOGLE_CLOUD_PROJECT environment variable.")
        raise typer.Exit(1)

    console.print(Panel(
        f"🚀 Deploying [bold cyan]Agent UI Stack[/bold cyan]\n"
        f"Project: [bold]{project}[/bold]\n"
        f"Region: [bold]{region}[/bold]\n"
        f"Targets: [bold]Face (Firebase)[/bold] + [bold]Engine (Cloud Run)[/bold]",
        title="[bold blue]One-Click Stack deployment[/bold blue]",
        expand=False,
        border_style="blue"
    ))

    try:
        # 1. Deploy the Engine (Backend) - "On behalf of the user"
        if not skip_engine:
            console.print("⚙️  [bold yellow]Step 1/2:[/bold yellow] Deploying Agent Engine to Cloud Run...")
            # Use gcloud to deploy the backend using the provided Dockerfile.backend
            # service name handles both the face and engine context
            service_name = "agent-ui-engine"
            subprocess.run([
                "gcloud", "run", "deploy", service_name,
                "--source", ".",
                "--dockerfile", "Dockerfile.backend",
                "--region", region,
                "--allow-unauthenticated",
                "--project", project,
                "--quiet"
            ], check=True)
            console.print("✅ Agent Engine live on Cloud Run.")

        # 2. Build and Deploy the Face (Frontend)
        console.print("🎭 [bold yellow]Step 2/2:[/bold yellow] Deploying A2UI Face to Firebase Hosting...")
        console.print("🏗️  Building production assets...")
        subprocess.run(["npm", "run", "build"], check=True)
        
        console.print("🚀 Uploading to Firebase...")
        subprocess.run(["firebase", "deploy", "--only", "hosting", "--project", project], check=True)
        
        console.print(Panel(
            f"✨ [bold green]Full Stack Deployment Successful![/bold green]\n\n"
            f"[bold]The Face (UI):[/bold] https://{project}.web.app\n"
            f"[bold]The Engine (API):[/bold] See Cloud Run dashboard\n\n"
            f"Your High-Fidelity Agent UI is now live and connected to its managed runtime.",
            title="[bold green]Deployment Complete[/bold green]",
            expand=False,
            border_style="green"
        ))
        
    except Exception as e:
        console.print(f"[bold red]Deployment Failed:[/bold red] {str(e)}")
        raise typer.Exit(code=1)

def main():
    app()

if __name__ == "__main__":
    main()
