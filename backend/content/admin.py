from django.contrib import admin
from .models import CocktailRecipe, Ingredient, RecipeIngredient


class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1  # Show one empty form by default
    autocomplete_fields = ["ingredient"]  # Add autocomplete for ingredients


@admin.register(CocktailRecipe)
class CocktailRecipeAdmin(admin.ModelAdmin):
    list_display = ("name", "short_description", "musical_genre", "created_at")
    list_filter = ("musical_genre", "created_at")
    search_fields = ("name", "description")
    readonly_fields = ("created_at", "updated_at")
    inlines = [RecipeIngredientInline]

    fieldsets = (
        (None, {
            "fields": ("name", "description", "musical_genre")
        }),
    )

    def short_description(self, entity) -> str:
        if len(entity.description) > 50:
            return entity.description[0:(50 - 3)] + "..."

        return entity.description

    short_description.short_description = "Description"


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ("recipe", "ingredient", "amount")
    list_filter = ("ingredient",)
    search_fields = ("recipe__name", "ingredient__name")
    autocomplete_fields = ["recipe", "ingredient"]
