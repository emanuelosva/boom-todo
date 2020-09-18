"""
Todos models
"""

from django.db import models


class Todo(models.Model):
    """
    Todo Model.
    """
    title = models.TextField()
    content = models.TextField(max_length=528)
    completed = models.BooleanField()
    is_urgent = models.BooleanField()
    date_todo = models.DateTimeField()
    tag = models.TextField(blank=True, choices=(
        ('work', 'work'),
        ('personal', 'personal'),
        ('home', 'home'),
    ))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    postedBy = models.ForeignKey(
        'users.User',
        related_name='todos',
        on_delete=models.CASCADE
    )
