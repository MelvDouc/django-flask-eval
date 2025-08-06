import json
from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ai.services import get_cocktail_recipe
from .models import CocktailRecipe


@csrf_exempt
def cocktails(request: HttpRequest) -> HttpResponse:
    match request.method:
        case "POST":
            form_data = json.loads(request.body)
            print("Received request")
            print(form_data)
            return cocktails_post(form_data)
        case _:
            return HttpResponseNotAllowed("Method not allowed")


def cocktails_post(form_data) -> HttpResponse:
    if type(form_data) != dict:
        return invalid_form_data_response()

    user_prompt = form_data.get("prompt")

    if not user_prompt or type(user_prompt) != str:
        return invalid_form_data_response()

    recipe_json = get_cocktail_recipe(user_prompt)

    if not recipe_json:
        result = [
            None,
            ["An occurred while generating the recipe."]
        ]
        return JsonResponse(result, safe=False)

    recipe = CocktailRecipe()
    recipe.name = recipe_json["name"]
    recipe.description = recipe_json["description"]
    recipe.ingredients = recipe_json["ingredients"]

    if "musical_genre" in recipe_json:
        recipe.musical_genre = recipe_json["musical_genre"]

    recipe.save()

    result = [
        recipe_json,
        None
    ]
    return JsonResponse(result, safe=False)


def invalid_form_data_response() -> JsonResponse:
    result = [
        None,
        ["Invalid form data"]
    ]
    return JsonResponse(result, safe=False)
