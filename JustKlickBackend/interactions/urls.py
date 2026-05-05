from django.urls import path
from . import views

urlpatterns = [
    path("wishlist/", views.wishlist_list_create, name="wishlist-list-create"),
    path("wishlist/<int:listing_id>/", views.wishlist_delete, name="wishlist-delete"),

    path("downloads/", views.downloads_list_create, name="downloads-list-create"),
    path("downloads/<int:listing_id>/", views.download_delete, name="download-delete"),

    path("compare/", views.compare_list_create, name="compare-list-create"),
    path("compare/<int:listing_id>/", views.compare_delete, name="compare-delete"),
]