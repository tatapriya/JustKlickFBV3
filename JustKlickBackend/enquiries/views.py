from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Enquiry
from .serializers import EnquirySerializer


@api_view(["GET", "POST"])
def enquiry_list_create(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            enquiries = Enquiry.objects.filter(user=request.user).order_by("-created_at")
        else:
            enquiries = Enquiry.objects.none()

        serializer = EnquirySerializer(enquiries, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = EnquirySerializer(data=request.data)

        if serializer.is_valid():
            user = request.user if request.user.is_authenticated else None
            enquiry = serializer.save(user=user)

            return Response(
                {
                    "message": "Enquiry submitted successfully",
                    "data": EnquirySerializer(enquiry).data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_enquiries(request):
    enquiries = Enquiry.objects.filter(user=request.user).order_by("-created_at")
    serializer = EnquirySerializer(enquiries, many=True)
    return Response(serializer.data)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def enquiry_detail(request, pk):
    try:
        enquiry = Enquiry.objects.get(pk=pk, user=request.user)
    except Enquiry.DoesNotExist:
        return Response(
            {"message": "Enquiry not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        serializer = EnquirySerializer(enquiry)
        return Response(serializer.data)

    if request.method == "PATCH":
        serializer = EnquirySerializer(
            enquiry,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Enquiry updated successfully",
                    "data": serializer.data,
                }
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        enquiry.delete()
        return Response(
            {"message": "Enquiry deleted successfully"},
            status=status.HTTP_200_OK,
        )