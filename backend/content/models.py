from django.db import models


class CocktailRecipe(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    musical_genre = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class RecipeIngredient(models.Model):
    """Junction table for cocktail recipes and ingredients with quantities"""
    recipe = models.ForeignKey(
        CocktailRecipe, on_delete=models.CASCADE, related_name="ingredients")
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    # e.g. "5 cL", "1/2 cup"
    amount = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.amount} {self.ingredient.name} for {self.recipe.name}"

    class Meta:
        unique_together = ("recipe", "ingredient")
