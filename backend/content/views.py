import json
from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ai.services import get_cocktail_recipe


@csrf_exempt
def cocktails(request: HttpRequest) -> HttpResponse:
    match request.method:
        case "POST":
            form_data = json.loads(request.body)

            if type(form_data) != dict:
                return invalid_form_data_response()

            user_prompt = form_data.get("prompt")

            if not user_prompt:
                return invalid_form_data_response()

            recipe = get_cocktail_recipe(user_prompt)
            return JsonResponse({
                "success": True,
                "recipe": recipe
            })
        case _:
            return HttpResponseNotAllowed("Method not allowed")


def invalid_form_data_response() -> JsonResponse:
    return JsonResponse({
        "success": False,
        "errors": ["Invalid form data"]
    })
