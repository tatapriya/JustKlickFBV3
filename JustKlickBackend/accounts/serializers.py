from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import Profile


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True, min_length=6)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def validate_phone(self, value):
        if Profile.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Phone already registered")
        return value

    def create(self, validated_data):
        name = validated_data["name"]
        email = validated_data["email"]
        phone = validated_data["phone"]
        password = validated_data["password"]

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name,
        )

        Profile.objects.create(
            user=user,
            phone=phone,
            role="student",
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        data["user"] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="profile.phone", read_only=True)
    role = serializers.CharField(source="profile.role", read_only=True)
    city = serializers.CharField(source="profile.city", read_only=True)
    state = serializers.CharField(source="profile.state", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "email",
            "phone",
            "role",
            "city",
            "state",
        ]