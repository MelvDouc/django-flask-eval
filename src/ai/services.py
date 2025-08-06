from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import ollama
import json
from typing import List, Dict


class CocktailAI:
    def __init__(self, model_name: str = "llama3.1"):
        self.model_name = model_name

    def suggest_cocktails(self, preferences: Dict) -> List[Dict]:
        """
        Generate cocktail suggestions based on user preferences
        """
        prompt = self._build_prompt(preferences)

        try:
            response = ollama.chat(
                model=self.model_name,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a world-renowned bartender. Respond only with valid JSON containing cocktail recipes."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            # Parse the response
            cocktails = self._parse_response(response['message']['content'])
            return cocktails

        except Exception as e:
            print(f"Error generating cocktails: {e}")
            return []

    def _build_prompt(self, preferences: Dict) -> str:
        """Build a prompt based on user preferences"""
        base_spirits = preferences.get('base_spirits', [])
        flavor_profile = preferences.get('flavor_profile', '')
        occasion = preferences.get('occasion', '')
        difficulty = preferences.get('difficulty', 'easy')

        prompt = f"""
        Suggest 3 cocktail recipes based on these preferences:
        - Base spirits: {', '.join(base_spirits) if base_spirits else 'any'}
        - Flavor profile: {flavor_profile}
        - Occasion: {occasion}
        - Difficulty: {difficulty}

        Return a JSON array with this structure:
        [
            {{
                "name": "Cocktail Name",
                "description": "Brief description",
                "ingredients": [
                    {{"name": "Ingredient", "amount": "2 oz", "type": "spirit/liqueur/mixer"}},
                ],
                "instructions": ["Step 1", "Step 2", "Step 3"],
                "difficulty": "easy/medium/hard",
                "glass_type": "rocks/martini/coupe",
                "garnish": "lemon twist"
            }}
        ]
        """
        return prompt

    def _parse_response(self, response_text: str) -> List[Dict]:
        """Parse AI response and extract cocktail data"""
        try:
            # Clean up the response - sometimes AI adds extra text
            start_idx = response_text.find('[')
            end_idx = response_text.rfind(']') + 1

            if start_idx != -1 and end_idx != 0:
                json_str = response_text[start_idx:end_idx]
                return json.loads(json_str)
            else:
                return []

        except json.JSONDecodeError:
            return []


# views.py


@csrf_exempt
@require_http_methods(["POST"])
def get_cocktail_suggestions(request):
    try:
        data = json.loads(request.body)
        preferences = {
            'base_spirits': data.get('base_spirits', []),
            'flavor_profile': data.get('flavor_profile', ''),
            'occasion': data.get('occasion', ''),
            'difficulty': data.get('difficulty', 'easy')
        }

        ai = CocktailAI()
        suggestions = ai.suggest_cocktails(preferences)

        return JsonResponse({
            'success': True,
            'cocktails': suggestions
        })

    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
