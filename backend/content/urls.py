
from django.urls import path
import content.views as views

urlpatterns = [
    path("recipes/<int:id>", views.recipe_route),
    path("recipes/", views.recipes_route),
]
