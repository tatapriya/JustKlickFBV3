from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "phone", "role", "city", "state", "created_at")
    list_filter = ("role", "city", "state")
    search_fields = ("user__username", "user__email", "phone")
    readonly_fields = ("created_at",)