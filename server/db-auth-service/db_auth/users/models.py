"""
Users models
"""

from django.db import models
from django.utils.translation import gettext_lazy as _


class User(models.Model):
    """
    Custom user model.
    """

    class Meta:
        """Table name"""
        db_table = 'User'

    email = models.EmailField(_('Email adress'), unique=True)
    name = models.TextField()
    password = models.TextField()
    createdAt = models.DateTimeField()
    updatedAt = models.DateTimeField()

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    def __str__(self):
        """Print the email as identifier"""
        return self.email

    @property
    def is_anonymous(self):
        """
        Always return False. This is a way of comparing User objects to
        anonymous users.
        """
        return False

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True
