import json
from os import getenv
import requests

OLLAMA_API_URL = f"{getenv("SLM_HOST")}/api/chat"


def get_cocktail_recipe(prompt: str) -> dict | None:
    messages = [
        {
            "role": "system",
            "content": "You are a cocktail recipe generator with a PhD in mixology and a flair for always answering in the requested JSON format."
        },
        {
            "role": "user",
            "content": f"""
                Create a cocktail recipe from the following prompt:

                    "{prompt}"

                Your response will be fed to a JSON parser. Consequently I need it to STRICTLY match the following JSON format:

                ```
                {{
                    "name": string;
                    "description": string;
                    "ingredients": string[];
                    "musical_genre"?: string; /* music that might fit well the drink */
                }}
                ```

                Failure to comply will earn you a one-way ticket to jail.
            """
        }
    ]

    payload = {
        "model": "llama3.1",
        "messages": messages,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_API_URL, json=payload)
        response.raise_for_status()
        content = response.json()["message"]["content"]
        return json.loads(content)

    except Exception as e:
        print(f"Error: {e}")
        return None
