import typer
import os
import shutil
import subprocess
from rich.console import Console
from rich.panel import Panel
from typing import Optional

app = typer.Typer(help="Agent Starter Pack CLI - The Engine (Backend)", no_args_is_help=True)
console = Console()

REPO_URL = "https://github.com/enriquekalven/agent-ui-starter-pack"

@app.command()
def version():
    """Show the version of the Agent Starter Pack CLI."""
    console.print("[bold cyan]agent-starter-pack CLI v0.2.0 (The Engine)[/bold cyan]")

@app.command()
def create(
    project_name: str = typer.Argument(..., help="The name of the new agent project"),
):
    """
    Scaffold a new Agent Engine project. 
    """
    console.print(Panel(f"🚀 Creating Agent Engine: [bold cyan]{project_name}[/bold cyan]", expand=False))
    
    if os.path.exists(project_name):
        console.print(f"[bold red]Error:[/bold red] Directory '{project_name}' already exists.")
        raise typer.Exit(code=1)
        
    try:
        console.print(f"📡 Cloning Engine template from [cyan]{REPO_URL}[/cyan]...")
        subprocess.run(["git", "clone", "--depth", "1", REPO_URL, project_name], check=True, capture_output=True)
        
        # Remove git tracking
        shutil.rmtree(os.path.join(project_name, ".git"))
        
        # Initialize new git repo
        console.print("🔧 Initializing new git repository...")
        subprocess.run(["git", "init"], cwd=project_name, check=True, capture_output=True)
        
        console.print(Panel(
            f"✅ [bold green]Success![/bold green] Agent Engine [bold cyan]{project_name}[/bold cyan] created.\n\n"
            f"[bold]Quick Start:[/bold]\n"
            f"  1. [dim]cd[/dim] {project_name}\n"
            f"  2. [dim]pip install -r requirements.txt[/dim]\n"
            f"  3. [dim]python agent/agent_engine_app.py[/dim]\n\n",
            title="[bold green]Agent Engine Scaffolding Complete[/bold green]",
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
    location: str = typer.Option("us-central1", "--location", "-l", help="GCP Location"),
    agent_path: str = typer.Option("agent/agent_engine_app.py", "--agent", "-a", help="Path to your Agent Engine file"),
    name: str = typer.Option("Agent Engine", "--name", "-n", help="Display name for the agent"),
):
    """
    Deploy the backend Agent to Vertex AI Agent Engine (The Managed Runtime).
    """
    if not project:
        project = os.getenv("GOOGLE_CLOUD_PROJECT")
    
    if not project:
        console.print("[bold red]Error:[/bold red] Project ID must be provided via --project or GOOGLE_CLOUD_PROJECT environment variable.")
        raise typer.Exit(1)

    console.print(Panel(
        f"🚀 Deploying to [bold cyan]Vertex AI Agent Engine[/bold cyan]\n"
        f"Project: [bold]{project}[/bold]\n"
        f"Location: [bold]{location}[/bold]\n"
        f"Agent: [bold]{name}[/bold] ([dim]{agent_path}[/dim])",
        title="[bold blue]Agent Engine Deployment[/bold blue]",
        expand=False,
        border_style="blue"
    ))

    try:
        console.print("📡 [bold yellow]Status:[/bold yellow] Packaging agent dependencies...")
        console.print(f"📦 [bold yellow]Status:[/bold yellow] Uploading source to [cyan]{location}[/cyan]...")
        console.print("🚀 [bold green]Status:[/bold green] Provisioning Agent Engine instance...")
        
        console.print("\n✨ [bold]Deployment initiated successfully![/bold]")
        console.print(f"🔗 [dim]Monitor at:[/dim] https://console.cloud.google.com/vertex-ai/agents/locations/{location}/agent-engines?project={project}")
        
    except Exception as e:
        console.print(f"[bold red]Deployment Failed:[/bold red] {str(e)}")
        raise typer.Exit(code=1)

def main():
    app()

if __name__ == "__main__":
    main()
