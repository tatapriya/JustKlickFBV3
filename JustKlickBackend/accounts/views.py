# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.authtoken.models import Token

# from .serializers import RegisterSerializer, LoginSerializer, UserSerializer


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def register_user(request):
#     serializer = RegisterSerializer(data=request.data)

#     if serializer.is_valid():
#         user = serializer.save()
#         token, created = Token.objects.get_or_create(user=user)

#         return Response(
#             {
#                 "message": "Registration successful",
#                 "token": token.key,
#                 "user": UserSerializer(user).data,
#             },
#             status=status.HTTP_201_CREATED,
#         )

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def login_user(request):
#     serializer = LoginSerializer(data=request.data)

#     if serializer.is_valid():
#         user = serializer.validated_data["user"]
#         token, created = Token.objects.get_or_create(user=user)

#         return Response(
#             {
#                 "message": "Login successful",
#                 "token": token.key,
#                 "user": UserSerializer(user).data,
#             },
#             status=status.HTTP_200_OK,
#         )

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def current_user(request):
#     return Response(UserSerializer(request.user).data)




from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from .serializers import RegisterSerializer, LoginSerializer, UserSerializer


# REGISTER
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "message": "Registration successful",
            "token": token.key,
            "user": UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# LOGIN
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "message": "Login successful",
            "token": token.key,
            "user": UserSerializer(user).data,
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# CURRENT USER
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    return Response(UserSerializer(request.user).data)


# ✅ ADMIN: LIST USERS
@api_view(["GET"])
@permission_classes([IsAdminUser])
def users_list(request):
    users = User.objects.all().order_by("-id")
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# ✅ ADMIN: DELETE USER
@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
        user.delete()
        return Response({"message": "User deleted"}, status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)