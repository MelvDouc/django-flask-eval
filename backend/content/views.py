import json
from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from ai import services as AiService
from .models import CocktailRecipe
from main.utils import result_json_response, safe_parse_int


@csrf_exempt
def recipe_route(request: HttpRequest, id: int) -> HttpResponse:
    match request.method:
        case "GET":
            return recipe_get(id)
        case "PATCH":
            form_data = json.loads(request.body)
            return recipe_patch(form_data, id)
        case "DELETE":
            return recipe_delete(id)
        case _:
            return HttpResponseNotAllowed("Method not allowed")


@csrf_exempt
def recipes_route(request: HttpRequest) -> HttpResponse:
    match request.method:
        case "GET":
            start = safe_parse_int(request.GET.get("start", "0"), 0)
            end = safe_parse_int(request.GET.get("end", "10"), 10)
            print({
                "start": start,
                "end": end,
            })
            return recipes_get(start, end)
        case "POST":
            form_data = json.loads(request.body)
            return recipes_post(form_data)
        case _:
            return HttpResponseNotAllowed("Method not allowed")


def recipe_get(id: int) -> HttpResponse:
    recipe = get_object_or_404(CocktailRecipe, pk=id)
    return result_json_response(True, recipe.to_json())


def recipe_patch(form_data: dict, id: int) -> HttpResponse:
    recipe = get_object_or_404(CocktailRecipe, pk=id)

    for key, value in form_data.items():
        setattr(recipe, key, value)

    recipe.save()
    return result_json_response(True, recipe.to_json())


def recipe_delete(id: int) -> HttpResponse:
    recipe = get_object_or_404(CocktailRecipe, pk=id)
    recipe.delete()
    return result_json_response(True, None)


def recipes_get(start: int, end: int) -> HttpResponse:
    recipes = CocktailRecipe.objects.order_by("id")[start:end]
    data = [r.to_json() for r in recipes]
    return result_json_response(True, data)


def recipes_post(form_data) -> HttpResponse:
    if type(form_data) != dict:
        return invalid_form_data_response()

    user_prompt = form_data.get("prompt")

    if not user_prompt or type(user_prompt) != str:
        return invalid_form_data_response()

    recipe_json = AiService.get_cocktail_recipe(user_prompt)
    recipe = create_recipe_from_json(recipe_json)
    recipe.save()
    return result_json_response(True, recipe_json)


def invalid_form_data_response() -> JsonResponse:
    return result_json_response(False, "Invalid form data")


def create_recipe_from_json(recipe_json: dict) -> CocktailRecipe:
    recipe = CocktailRecipe()
    recipe.name = recipe_json["name"]
    recipe.description = recipe_json["description"]
    recipe.ingredients = recipe_json["ingredients"]

    if "musical_genre" in recipe_json:
        recipe.musical_genre = recipe_json["musical_genre"]

    return recipe
