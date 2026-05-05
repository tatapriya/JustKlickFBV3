from django.db import models
from django.contrib.auth.models import User
from listings.models import Listing


class Enquiry(models.Model):
    STATUS_CHOICES = (
        ("New", "New"),
        ("Interest Sent", "Interest Sent"),
        ("Need Callback", "Need Callback"),
        ("Contacted", "Contacted"),
        ("Interested", "Interested"),
        ("Not Interested", "Not Interested"),
        ("Closed", "Closed"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="enquiries",
        blank=True,
        null=True,
    )

    listing = models.ForeignKey(
        Listing,
        on_delete=models.CASCADE,
        related_name="enquiries",
        blank=True,
        null=True,
    )

    listing_name = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)

    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    message = models.TextField(blank=True, null=True)

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="New",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.phone}"