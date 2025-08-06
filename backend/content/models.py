from django.db import models
from django.contrib.postgres.fields import ArrayField


class CocktailRecipe(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    ingredients = ArrayField(
        models.CharField(max_length=100),
        blank=False,
        default=list
    )
    musical_genre = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text="Optional musical genre to pair with the cocktail"
    )

    def __str__(self):
        return self.name
