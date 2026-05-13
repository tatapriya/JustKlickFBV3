
# from rest_framework import serializers
# from .models import Enquiry


# class EnquirySerializer(serializers.ModelSerializer):

#     user_email = serializers.EmailField(
#         source="user.email",
#         read_only=True,
#     )

#     user_name = serializers.CharField(
#         source="user.first_name",
#         read_only=True,
#     )

#     listing_title = serializers.CharField(
#         source="listing.name",
#         read_only=True,
#     )

#     listing_city = serializers.CharField(
#         source="listing.city",
#         read_only=True,
#     )

#     listing_area = serializers.CharField(
#         source="listing.area",
#         read_only=True,
#     )

#     listing_image = serializers.CharField(
#         source="listing.image",
#         read_only=True,
#     )

#     listing_rating = serializers.CharField(
#         source="listing.rating",
#         read_only=True,
#     )

#     class Meta:

#         model = Enquiry

#         fields = [

#             "id",

#             "user",
#             "user_email",
#             "user_name",

#             "listing",
#             "listing_title",
#             "listing_city",
#             "listing_area",
#             "listing_image",
#             "listing_rating",

#             "listing_name",
#             "category",

#             "name",
#             "phone",
#             "email",
#             "message",

#             "status",

#             # NEW FIELDS
#             "admin_reply",
#             "replied_at",

#             "created_at",
#             "updated_at",
#         ]

#         read_only_fields = [

#             "user",

#             "user_email",
#             "user_name",

#             "listing_title",
#             "listing_city",
#             "listing_area",
#             "listing_image",
#             "listing_rating",

#             "created_at",
#             "updated_at",
#             "replied_at",
#         ]




from rest_framework import serializers
from .models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):

    user_email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    user_name = serializers.CharField(
        source="user.first_name",
        read_only=True,
    )

    listing_title = serializers.CharField(
        source="listing.name",
        read_only=True,
    )

    listing_city = serializers.CharField(
        source="listing.city",
        read_only=True,
    )

    listing_area = serializers.CharField(
        source="listing.area",
        read_only=True,
    )

    listing_image = serializers.CharField(
        source="listing.image",
        read_only=True,
    )

    listing_rating = serializers.CharField(
        source="listing.rating",
        read_only=True,
    )

    class Meta:

        model = Enquiry

        fields = [

            "id",

            "user",
            "user_email",
            "user_name",

            "listing",
            "listing_title",
            "listing_city",
            "listing_area",
            "listing_image",
            "listing_rating",

            "listing_name",
            "category",

            "name",
            "phone",
            "email",
            "message",

            "status",

            "admin_reply",
            "reply_seen",
            "replied_at",

            "created_at",
        ]

        read_only_fields = [

            "user",
            "user_email",
            "user_name",

            "listing_title",
            "listing_city",
            "listing_area",
            "listing_image",
            "listing_rating",

            "created_at",
        ]