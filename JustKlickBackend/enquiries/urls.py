# from django.urls import path
# from . import views

# urlpatterns = [

#     path(
#         "enquiries/",
#         views.enquiry_list_create,
#         name="enquiry-list-create",
#     ),

#     path(
#         "enquiries/my/",
#         views.my_enquiries,
#         name="my-enquiries",
#     ),

#     path(
#         "enquiries/all/",
#         views.all_enquiries,
#         name="all-enquiries",
#     ),

#     path(
#         "enquiries/<int:pk>/",
#         views.enquiry_detail,
#         name="enquiry-detail",
#     ),
# ]




from django.urls import path
from . import views

urlpatterns = [

    path(
        "enquiries/",
        views.enquiry_list_create,
        name="enquiry-list-create",
    ),

    path(
        "enquiries/my/",
        views.my_enquiries,
        name="my-enquiries",
    ),

    path(
        "enquiries/all/",
        views.all_enquiries,
        name="all-enquiries",
    ),

    # REPLY API
    path(
        "enquiries/<int:pk>/reply/",
        views.reply_enquiry,
        name="reply-enquiry",
    ),

    path(
        "enquiries/<int:pk>/",
        views.enquiry_detail,
        name="enquiry-detail",
    ),
]