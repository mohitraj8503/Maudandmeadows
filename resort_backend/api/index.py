from resort_backend.main import app

# Vercel serverless function handler
def handler(request, context):
    return app(request, context)
