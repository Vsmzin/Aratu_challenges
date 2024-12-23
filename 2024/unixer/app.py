from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import HTMLResponse
from starlette.routing import Route
from starlette.templating import Jinja2Templates
import json

templates = Jinja2Templates(directory="templates")

async def index(request: Request) -> HTMLResponse:
    return HTMLResponse("Redirect to /static/templates/index.html")

async def render_html(request: Request) -> HTMLResponse:
    return templates.TemplateResponse('index.html', {'request': request})

async def upload_file(request: Request) -> HTMLResponse:

    body = await request.json()
    content = body.get('content', '')
    path = body.get('path', '')

    with open(path, "w") as f:
        f.write(content)

    return HTMLResponse(f"You have written to {path} with: {content}")

async def read_file(request: Request) -> HTMLResponse:
    file_name = request.path_params.get('file_path')

    try:
        with open(file_name, "r") as file:
            content = file.read()
    except FileNotFoundError:
        return HTMLResponse("File not found.", status_code=200)
    except Exception as e:
        return HTMLResponse(f"An error occurred: {e}", status_code=500)

    return HTMLResponse(content)

app = Starlette(
    routes=[
        Route("/", index),
        Route("/upload", upload_file, methods=["POST"]),
        Route("/render_html", render_html),
        Route("/static/{file_path:path}", read_file),
    ],
)