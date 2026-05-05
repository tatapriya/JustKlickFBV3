from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from listings.models import Listing
from .models import Wishlist, DownloadItem, CompareItem
from .serializers import WishlistSerializer, DownloadItemSerializer, CompareItemSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def wishlist_list_create(request):
    if request.method == "GET":
        wishlist = Wishlist.objects.filter(user=request.user).select_related(
            "listing",
            "listing__category",
        )

        serializer = WishlistSerializer(wishlist, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        listing_id = request.data.get("listing")

        if not listing_id:
            return Response(
                {"listing": ["Listing ID is required"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            listing = Listing.objects.get(id=listing_id, is_active=True)
        except Listing.DoesNotExist:
            return Response(
                {"message": "Listing not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        wishlist_item, created = Wishlist.objects.get_or_create(
            user=request.user,
            listing=listing,
        )

        serializer = WishlistSerializer(wishlist_item)

        return Response(
            {
                "message": "Added to wishlist" if created else "Already in wishlist",
                "data": serializer.data,
                "created": created,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def wishlist_delete(request, listing_id):
    try:
        wishlist_item = Wishlist.objects.get(
            user=request.user,
            listing_id=listing_id,
        )
    except Wishlist.DoesNotExist:
        return Response(
            {"message": "Wishlist item not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    wishlist_item.delete()

    return Response(
        {"message": "Removed from wishlist"},
        status=status.HTTP_200_OK,
    )


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def downloads_list_create(request):
    if request.method == "GET":
        downloads = DownloadItem.objects.filter(user=request.user).select_related(
            "listing",
            "listing__category",
        )

        serializer = DownloadItemSerializer(downloads, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        listing_id = request.data.get("listing")

        if not listing_id:
            return Response(
                {"listing": ["Listing ID is required"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            listing = Listing.objects.get(id=listing_id, is_active=True)
        except Listing.DoesNotExist:
            return Response(
                {"message": "Listing not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        download_item, created = DownloadItem.objects.get_or_create(
            user=request.user,
            listing=listing,
        )

        serializer = DownloadItemSerializer(download_item)

        return Response(
            {
                "message": "Download saved" if created else "Already downloaded",
                "data": serializer.data,
                "created": created,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def download_delete(request, listing_id):
    try:
        download_item = DownloadItem.objects.get(
            user=request.user,
            listing_id=listing_id,
        )
    except DownloadItem.DoesNotExist:
        return Response(
            {"message": "Download item not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    download_item.delete()

    return Response(
        {"message": "Removed from downloads"},
        status=status.HTTP_200_OK,
    )


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def compare_list_create(request):
    if request.method == "GET":
        compare_items = CompareItem.objects.filter(user=request.user).select_related(
            "listing",
            "listing__category",
        )

        serializer = CompareItemSerializer(compare_items, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        listing_id = request.data.get("listing")

        if not listing_id:
            return Response(
                {"listing": ["Listing ID is required"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            listing = Listing.objects.get(id=listing_id, is_active=True)
        except Listing.DoesNotExist:
            return Response(
                {"message": "Listing not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        compare_item, created = CompareItem.objects.get_or_create(
            user=request.user,
            listing=listing,
        )

        serializer = CompareItemSerializer(compare_item)

        return Response(
            {
                "message": "Added to compare" if created else "Already in compare",
                "data": serializer.data,
                "created": created,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def compare_delete(request, listing_id):
    try:
        compare_item = CompareItem.objects.get(
            user=request.user,
            listing_id=listing_id,
        )
    except CompareItem.DoesNotExist:
        return Response(
            {"message": "Compare item not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    compare_item.delete()

    return Response(
        {"message": "Removed from compare"},
        status=status.HTTP_200_OK,
    )