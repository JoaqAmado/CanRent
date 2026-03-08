from django.urls import path
from . import views

urlpatterns = [
    path("properties/", views.properties, name="properties"),
    path("properties/<int:pk>/", views.property_detail, name="property_detail"),
]
