from rest_framework import serializers
from .models import Category, Listing


class CategorySerializer(serializers.ModelSerializer):
    listings_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "image",
            "listings_count",
        ]

    def get_listings_count(self, obj):
        return obj.listings.filter(is_active=True).count()


class ListingSerializer(serializers.ModelSerializer):
    category_title = serializers.CharField(source="category.title", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)

    class Meta:
        model = Listing
        fields = [
            "id",
            "category",
            "category_title",
            "category_slug",
            "name",
            "slug",
            "city",
            "area",
            "address",
            "image",
            "rating",
            "fee",
            "phone",
            "website",
            "description",
            "courses",
            "facilities",
            "is_recommended",
            "is_active",
            "created_at",
        ]