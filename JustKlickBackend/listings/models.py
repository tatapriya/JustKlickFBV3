from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class Listing(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="listings",
    )

    name = models.CharField(max_length=200)
    slug = models.SlugField(blank=True, null=True)

    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, default="Telangana")
    address = models.TextField(blank=True, null=True)

    image = models.URLField(blank=True, null=True)

    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.0)
    reviews = models.PositiveIntegerField(default=0)

    fee = models.CharField(max_length=100, blank=True, null=True)

    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    description = models.TextField(blank=True, null=True)

    courses = models.TextField(blank=True, null=True)
    facilities = models.TextField(blank=True, null=True)

    is_recommended = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name