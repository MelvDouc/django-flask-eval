import json
from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from ai.services import get_cocktail_recipe
from .models import CocktailRecipe
from main.utils import result_json_response, safe_parse_int


@csrf_exempt
def cocktail(request: HttpRequest, id: int) -> HttpResponse:
    match request.method:
        case "GET":
            return cocktail_get(id)
        case _:
            return HttpResponseNotAllowed("Method not allowed")


@csrf_exempt
def cocktails(request: HttpRequest) -> HttpResponse:
    match request.method:
        case "GET":
            start = safe_parse_int(request.GET.get("start", "0"), 0)
            end = safe_parse_int(request.GET.get("end", "10"), 10)
            return cocktails_get(start, end)
        case "POST":
            form_data = json.loads(request.body)
            return cocktails_post(form_data)
        case _:
            return HttpResponseNotAllowed("Method not allowed")


def cocktail_get(id: int) -> HttpResponse:
    recipe = get_object_or_404(CocktailRecipe, pk=id)
    return result_json_response(True, recipe.to_json())


def cocktails_get(start: int, end: int) -> HttpResponse:
    recipes = CocktailRecipe.objects.order_by("id")[start:end]
    data = [r.to_json() for r in recipes]
    return result_json_response(True, data)


def cocktails_post(form_data) -> HttpResponse:
    if type(form_data) != dict:
        return invalid_form_data_response()

    user_prompt = form_data.get("prompt")

    if not user_prompt or type(user_prompt) != str:
        return invalid_form_data_response()

    recipe_json = get_cocktail_recipe(user_prompt)

    if not recipe_json:
        return result_json_response(False, "An occurred while generating the recipe.")

    recipe = CocktailRecipe()
    recipe.name = recipe_json["name"]
    recipe.description = recipe_json["description"]
    recipe.ingredients = recipe_json["ingredients"]

    if "musical_genre" in recipe_json:
        recipe.musical_genre = recipe_json["musical_genre"]

    recipe.save()
    return result_json_response(True, recipe)


def invalid_form_data_response() -> JsonResponse:
    return result_json_response(False, "Invalid form data")
