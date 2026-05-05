from rest_framework import serializers
from .models import Wishlist, DownloadItem, CompareItem


class WishlistSerializer(serializers.ModelSerializer):
    listing_id = serializers.IntegerField(source="listing.id", read_only=True)
    listing_name = serializers.CharField(source="listing.name", read_only=True)
    listing_slug = serializers.CharField(source="listing.slug", read_only=True)

    category_title = serializers.CharField(source="listing.category.title", read_only=True)
    category_slug = serializers.CharField(source="listing.category.slug", read_only=True)

    city = serializers.CharField(source="listing.city", read_only=True)
    area = serializers.CharField(source="listing.area", read_only=True)
    state = serializers.CharField(source="listing.state", read_only=True)
    image = serializers.CharField(source="listing.image", read_only=True)
    rating = serializers.CharField(source="listing.rating", read_only=True)
    reviews = serializers.IntegerField(source="listing.reviews", read_only=True)
    description = serializers.CharField(source="listing.description", read_only=True)

    class Meta:
        model = Wishlist
        fields = [
            "id",
            "listing",
            "listing_id",
            "listing_name",
            "listing_slug",
            "category_title",
            "category_slug",
            "city",
            "area",
            "state",
            "image",
            "rating",
            "reviews",
            "description",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "listing_id",
            "listing_name",
            "listing_slug",
            "category_title",
            "category_slug",
            "city",
            "area",
            "state",
            "image",
            "rating",
            "reviews",
            "description",
            "created_at",
        ]


class DownloadItemSerializer(serializers.ModelSerializer):
    listing_id = serializers.IntegerField(source="listing.id", read_only=True)
    listing_name = serializers.CharField(source="listing.name", read_only=True)
    listing_slug = serializers.CharField(source="listing.slug", read_only=True)

    category_title = serializers.CharField(source="listing.category.title", read_only=True)
    category_slug = serializers.CharField(source="listing.category.slug", read_only=True)

    city = serializers.CharField(source="listing.city", read_only=True)
    area = serializers.CharField(source="listing.area", read_only=True)
    state = serializers.CharField(source="listing.state", read_only=True)
    image = serializers.CharField(source="listing.image", read_only=True)
    rating = serializers.CharField(source="listing.rating", read_only=True)
    reviews = serializers.IntegerField(source="listing.reviews", read_only=True)
    description = serializers.CharField(source="listing.description", read_only=True)

    class Meta:
        model = DownloadItem
        fields = [
            "id",
            "listing",
            "listing_id",
            "listing_name",
            "listing_slug",
            "category_title",
            "category_slug",
            "city",
            "area",
            "state",
            "image",
            "rating",
            "reviews",
            "description",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "listing_id",
            "listing_name",
            "listing_slug",
            "category_title",
            "category_slug",
            "city",
            "area",
            "state",
            "image",
            "rating",
            "reviews",
            "description",
            "created_at",
        ]


class CompareItemSerializer(serializers.ModelSerializer):
    listing_id = serializers.IntegerField(source="listing.id", read_only=True)
    listing_name = serializers.CharField(source="listing.name", read_only=True)
    listing_slug = serializers.CharField(source="listing.slug", read_only=True)

    category_title = serializers.CharField(source="listing.category.title", read_only=True)
    category_slug = serializers.CharField(source="listing.category.slug", read_only=True)

    city = serializers.CharField(source="listing.city", read_only=True)
    area = serializers.CharField(source="listing.area", read_only=True)
    state = serializers.CharField(source="listing.state", read_only=True)
    image = serializers.CharField(source="listing.image", read_only=True)
    rating = serializers.CharField(source="listing.rating", read_only=True)
    reviews = serializers.IntegerField(source="listing.reviews", read_only=True)
    fee = serializers.CharField(source="listing.fee", read_only=True)
    phone = serializers.CharField(source="listing.phone", read_only=True)
    email = serializers.CharField(source="listing.email", read_only=True)
    website = serializers.CharField(source="listing.website", read_only=True)
    description = serializers.CharField(source="listing.description", read_only=True)
    courses = serializers.CharField(source="listing.courses", read_only=True)
    facilities = serializers.CharField(source="listing.facilities", read_only=True)

    class Meta:
        model = CompareItem
        fields = [
            "id",
            "listing",
            "listing_id",
            "listing_name",
            "listing_slug",
            "category_title",
            "category_slug",
            "city",
            "area",
            "state",
            "image",
            "rating",
            "reviews",
            "fee",
            "phone",
            "email",
            "website",
            "description",
            "courses",
            "facilities",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "listing_id",
            "listing_name",
            "listing_slug",
            "category_title",
            "category_slug",
            "city",
            "area",
            "state",
            "image",
            "rating",
            "reviews",
            "fee",
            "phone",
            "email",
            "website",
            "description",
            "courses",
            "facilities",
            "created_at",
        ]