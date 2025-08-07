
from django.urls import path
import content.views as views

urlpatterns = [
    path("cocktails/<int:id>", views.cocktail),
    path("cocktails/", views.cocktails),
]
