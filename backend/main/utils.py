from django.http import JsonResponse


def result_json_response(success: bool, data_or_error):
    result = {
        "success": success,
        "error": data_or_error
    }
    return JsonResponse(result)


def safe_parse_int(input: str, default: int) -> int:
    try:
        return int(input)
    except:
        return default
