"""
ASGI config for db_auth project.

It exposes the ASGI callable as a module-level variable named ``application``.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'db_auth.settings')

application = get_asgi_application()
