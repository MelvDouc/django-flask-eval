from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from src.ai.services import get_cocktail_recipe


@csrf_exempt
def generate_cocktail(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        data = json.loads(request.body)
        user_prompt = data.get("prompt", "")

        result = get_cocktail_recipe(user_prompt)
        return JsonResponse({"recipe": result})

    return JsonResponse({"error": "Only POST allowed"}, status=405)
