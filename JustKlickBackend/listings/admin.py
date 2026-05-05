from django.contrib import admin
from .models import Category, Listing


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "slug")
    search_fields = ("title", "slug")


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "city",
        "area",
        "rating",
        "is_recommended",
        "is_active",
    )
    list_filter = ("category", "city", "is_recommended", "is_active")
    search_fields = ("name", "city", "area")