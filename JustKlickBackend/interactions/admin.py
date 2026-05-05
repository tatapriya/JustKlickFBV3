from django.contrib import admin
from .models import Wishlist, DownloadItem, CompareItem


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "listing",
        "created_at",
    )

    list_filter = (
        "created_at",
        "listing__category",
    )

    search_fields = (
        "user__username",
        "user__email",
        "listing__name",
        "listing__city",
        "listing__area",
    )

    readonly_fields = (
        "user",
        "listing",
        "created_at",
    )


@admin.register(DownloadItem)
class DownloadItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "listing",
        "created_at",
    )

    list_filter = (
        "created_at",
        "listing__category",
    )

    search_fields = (
        "user__username",
        "user__email",
        "listing__name",
        "listing__city",
        "listing__area",
    )

    readonly_fields = (
        "user",
        "listing",
        "created_at",
    )


@admin.register(CompareItem)
class CompareItemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "listing",
        "created_at",
    )

    list_filter = (
        "created_at",
        "listing__category",
    )

    search_fields = (
        "user__username",
        "user__email",
        "listing__name",
        "listing__city",
        "listing__area",
    )

    readonly_fields = (
        "user",
        "listing",
        "created_at",
    )