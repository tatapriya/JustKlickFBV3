# from django.db.models import Q
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status

# from .models import Category, Listing
# from .serializers import CategorySerializer, ListingSerializer


# @api_view(["GET"])
# def category_list(request):
#     categories = Category.objects.all().order_by("id")
#     serializer = CategorySerializer(categories, many=True)
#     return Response(serializer.data)


# # GET ALL + CREATE
# @api_view(["GET", "POST"])
# def listing_list(request):

#     # GET ALL
#     if request.method == "GET":

#         listings = Listing.objects.filter(is_active=True).order_by("-created_at")

#         category = request.GET.get("category")
#         city = request.GET.get("city")
#         location = request.GET.get("location")
#         search = request.GET.get("search")
#         recommended = request.GET.get("recommended")

#         if category:
#             listings = listings.filter(category__slug__iexact=category)

#         if city:
#             listings = listings.filter(city__icontains=city)

#         if location:
#             listings = listings.filter(
#                 Q(city__icontains=location) | Q(area__icontains=location)
#             )

#         if search:
#             listings = listings.filter(
#                 Q(name__icontains=search)
#                 | Q(city__icontains=search)
#                 | Q(area__icontains=search)
#                 | Q(description__icontains=search)
#                 | Q(courses__icontains=search)
#                 | Q(facilities__icontains=search)
#             )

#         if recommended == "true":
#             listings = listings.filter(is_recommended=True)

#         serializer = ListingSerializer(listings.distinct(), many=True)
#         return Response(serializer.data)

#     # CREATE
#     elif request.method == "POST":
#         serializer = ListingSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # GET + UPDATE + DELETE (IMPORTANT FIX FOR YOUR ERROR)
# @api_view(["GET", "PUT", "DELETE"])
# def listing_detail(request, pk):

#     try:
#         listing = Listing.objects.get(pk=pk)
#     except Listing.DoesNotExist:
#         return Response(
#             {"message": "Listing not found"},
#             status=status.HTTP_404_NOT_FOUND,
#         )

#     # GET single
#     if request.method == "GET":
#         serializer = ListingSerializer(listing)
#         return Response(serializer.data)

#     # UPDATE
#     elif request.method == "PUT":
#         serializer = ListingSerializer(listing, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # DELETE (THIS FIXES YOUR ERROR)
#     elif request.method == "DELETE":
#         listing.delete()
#         return Response(
#             {"message": "Deleted successfully"},
#             status=status.HTTP_204_NO_CONTENT
#         )













from rest_framework import viewsets
from django.db.models import Q

from .models import Category, Listing
from .serializers import CategorySerializer, ListingSerializer


# CATEGORY VIEWSET (FULL CRUD AUTOMATIC)
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("id")
    serializer_class = CategorySerializer


# LISTING VIEWSET (WITH FILTER SUPPORT)
class ListingViewSet(viewsets.ModelViewSet):
    serializer_class = ListingSerializer

    def get_queryset(self):
        queryset = Listing.objects.filter(is_active=True).order_by("-created_at")

        category = self.request.query_params.get("category")
        city = self.request.query_params.get("city")
        location = self.request.query_params.get("location")
        search = self.request.query_params.get("search")
        recommended = self.request.query_params.get("recommended")

        if category:
            queryset = queryset.filter(category__slug__iexact=category)

        if city:
            queryset = queryset.filter(city__icontains=city)

        if location:
            queryset = queryset.filter(
                Q(city__icontains=location) | Q(area__icontains=location)
            )

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search)
                | Q(city__icontains=search)
                | Q(area__icontains=search)
                | Q(description__icontains=search)
                | Q(courses__icontains=search)
                | Q(facilities__icontains=search)
            )

        if recommended == "true":
            queryset = queryset.filter(is_recommended=True)

        return queryset