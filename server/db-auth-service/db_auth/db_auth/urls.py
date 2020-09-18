"""
db_auth URL Configuration
"""
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from users import views as users_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/login', csrf_exempt(users_views.login_view)),
]
