from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Category, Listing
from .serializers import CategorySerializer, ListingSerializer


@api_view(["GET"])
def category_list(request):
    categories = Category.objects.all().order_by("id")
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def listing_list(request):
    listings = Listing.objects.filter(is_active=True).order_by("-created_at")

    category = request.GET.get("category")
    city = request.GET.get("city")
    location = request.GET.get("location")
    search = request.GET.get("search")
    recommended = request.GET.get("recommended")

    if category:
        listings = listings.filter(category__slug__iexact=category)

    if city:
        listings = listings.filter(city__icontains=city)

    if location:
        listings = listings.filter(
            Q(city__icontains=location) | Q(area__icontains=location)
        )

    if search:
        listings = listings.filter(
            Q(name__icontains=search)
            | Q(city__icontains=search)
            | Q(area__icontains=search)
            | Q(description__icontains=search)
            | Q(courses__icontains=search)
            | Q(facilities__icontains=search)
        )

    if recommended == "true":
        listings = listings.filter(is_recommended=True)

    serializer = ListingSerializer(listings.distinct(), many=True)
    return Response(serializer.data)


@api_view(["GET"])
def listing_detail(request, pk):
    try:
        listing = Listing.objects.get(pk=pk, is_active=True)
    except Listing.DoesNotExist:
        return Response(
            {"message": "Listing not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = ListingSerializer(listing)
    return Response(serializer.data)