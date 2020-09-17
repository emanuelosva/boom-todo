"""
WSGI config for db_auth project.

It exposes the WSGI callable as a module-level variable named ``application``.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'db_auth.settings')

application = get_wsgi_application()
