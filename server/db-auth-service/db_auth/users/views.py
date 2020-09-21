"""
User views
"""

import json
from datetime import timedelta, datetime

from django.http import JsonResponse
from django.conf import settings

from jose import jwt
from passlib.context import CryptContext
from .models import User


ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
ALGORITHM = settings.ALGORITHM
JWT_SECRET = settings.JWT_SECRET

pwd_context = CryptContext(schemes=["bcrypt"])


def login_view(request):
    """
    Return a valid JWT if the credentials
    are correct.
    Else return an Error and 401 Status.

    Params:
    - request: Django Requets
        fields:
        - email: str - The user email
        - password: str - The user password

    Return:
    - response: JsonResponse
    """
    response = {
        'error': True,
        'detail': 'Invalid credentials',
    }

    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = User.objects.filter(email=body['email']).first()

        if not user:
            return JsonResponse(response, status=401)

        if not pwd_context.verify(body['password'], user.password):
            return JsonResponse(response, status=401)

        # Set the expiration time for token
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        expire = datetime.utcnow() + expires_delta

        # Encod the JWT
        to_encode = {'userId': user.id}
        to_encode.update({'exp': expire})
        token = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)

        response.update({'detail': 'TokenType: Bearer'})
        response.update({'token': token})
        response.update({'error': False})

        return JsonResponse(response)

    else:
        # Only POST is allowed
        response.update({'detail': f'method {request.method} not allowed'})
        return JsonResponse(response, status=405)
