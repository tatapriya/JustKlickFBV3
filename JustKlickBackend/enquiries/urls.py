from django.urls import path
from . import views

urlpatterns = [
    path("enquiries/", views.enquiry_list_create, name="enquiry-list-create"),
    path("enquiries/my/", views.my_enquiries, name="my-enquiries"),
    path("enquiries/<int:pk>/", views.enquiry_detail, name="enquiry-detail"),
]