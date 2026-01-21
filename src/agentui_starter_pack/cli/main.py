import typer
import os
import shutil
import subprocess
from rich.console import Console
from rich.panel import Panel

app = typer.Typer(help="Agent UI Starter Pack CLI")
console = Console()

REPO_URL = "https://github.com/enriquekalven/agent-ui-starter-pack"

@app.command()
def create(
    project_name: str = typer.Argument(..., help="The name of the new project"),
    ui: str = typer.Option("typescript", "-ui", help="UI Template (currently only typescript supported)"),
):
    """
    Scaffold a new Agent UI project.
    """
    console.print(Panel(f"🚀 Creating project: [bold cyan]{project_name}[/bold cyan]", expand=False))
    
    if os.path.exists(project_name):
        console.print(f"[bold red]Error:[/bold red] Directory '{project_name}' already exists.")
        raise typer.Exit(code=1)
        
    try:
        console.print(f"📡 Cloning template from [cyan]{REPO_URL}[/cyan]...")
        # We use a depth of 1 to keep it fast
        subprocess.run(["git", "clone", "--depth", "1", REPO_URL, project_name], check=True, capture_output=True)
        
        # Remove git tracking for the template
        shutil.rmtree(os.path.join(project_name, ".git"))
        
        # Initialize new git repo
        console.print("🔧 Initializing new git repository...")
        subprocess.run(["git", "init"], cwd=project_name, check=True, capture_output=True)
        
        console.print(Panel(
            f"✅ [bold green]Success![/bold green] Project [bold cyan]{project_name}[/bold cyan] created.\n\n"
            f"[bold]Quick Start:[/bold]\n"
            f"  1. [dim]cd[/dim] {project_name}\n"
            f"  2. [dim]npm install[/dim]\n"
            f"  3. [dim]npm run dev[/dim]\n\n"
            f"The documentation portal will be available as your home page!",
            title="[bold green]Project Scaffolding Complete[/bold green]",
            expand=False,
            border_style="green"
        ))
    except subprocess.CalledProcessError as e:
        console.print(f"[bold red]Error during git operation:[/bold red] {e.stderr.decode() if e.stderr else str(e)}")
        raise typer.Exit(code=1)
    except Exception as e:
        console.print(f"[bold red]Unexpected Error:[/bold red] {str(e)}")
        raise typer.Exit(code=1)

def main():
    app()

if __name__ == "__main__":
    main()
