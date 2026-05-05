from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.category_list, name="category-list"),
    path("listings/", views.listing_list, name="listing-list"),
    path("listings/<int:pk>/", views.listing_detail, name="listing-detail"),
]