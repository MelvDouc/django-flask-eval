
from django.urls import path
import content.views as views

urlpatterns = [
    path("cocktails/", views.cocktails)
]
