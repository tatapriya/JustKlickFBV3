# from django.urls import path
# from . import views

# urlpatterns = [
#     path("register/", views.register_user, name="register-user"),
#     path("login/", views.login_user, name="login-user"),
#     path("me/", views.current_user, name="current-user"),
# ]


from django.urls import path
from . import views

urlpatterns = [
    # AUTH
    path("register/", views.register_user),
    path("login/", views.login_user),
    path("me/", views.current_user),

    # ADMIN USERS API
    path("users/", views.users_list),
    path("users/<int:pk>/", views.delete_user),
]