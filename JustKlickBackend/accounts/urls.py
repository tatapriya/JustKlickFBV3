from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register-user"),
    path("login/", views.login_user, name="login-user"),
    path("me/", views.current_user, name="current-user"),
]