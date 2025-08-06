import json
from main.env import get_env
from ollama import Client as OllamaClient

OLLAMA_API_URL = f"{get_env("SLM_HOST")}/api/generate"

OLLAMA_CLIENT = OllamaClient(
    host=get_env("SLM_HOST")
)


def get_cocktail_recipe(prompt: str) -> dict | None:
    full_prompt = f"""
        You are a cocktail recipe generator with a PhD in mixology. Create a cocktail recipe from the following prompt:

        "{prompt}"

        Your response will be passed into a JSON parser so please respond ONLY with valid JSON in this exact format:
        {{
            "name": "Cocktail Name",
            "description": "Brief description",
            "ingredients": ["ingredient1", "ingredient2"],
            "musical_genre?": "optional music genre"
        }}
    """
    messages = [
        {
            "role": "system",
            "content": "You are a cocktail recipe generator with a PhD in mixology and a flair for always answering in the requested JSON format."
        },
        {
            "role": "user",
            "content": full_prompt
        }
    ]

    try:
        response = OLLAMA_CLIENT.chat(
            model="llama3.1",
            messages=messages
        )
        content = response.message.content
        return json.loads(content) if content else None

    except Exception as e:
        print(f"Error: {e}")
        return None
