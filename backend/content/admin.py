from django.contrib import admin
from .models import CocktailRecipe
from .forms import CocktailRecipeForm


@admin.register(CocktailRecipe)
class CocktailRecipeAdmin(admin.ModelAdmin):
    form = CocktailRecipeForm
    list_display = ("name", "short_description", "musical_genre")
    search_fields = ("name", "musical_genre", "description")
    list_filter = ("musical_genre",)
    ordering = ("name",)

    def short_description(self, entity) -> str:
        if len(entity.description) > 50:
            return entity.description[0:(50 - 3)] + "..."

        return entity.description

    short_description.short_description = "Description"
