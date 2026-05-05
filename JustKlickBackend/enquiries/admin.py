from django.contrib import admin
from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "phone",
        "listing_name",
        "category",
        "status",
        "created_at",
    )
    list_filter = ("status", "category", "created_at")
    search_fields = ("name", "phone", "email", "listing_name")