"""
Todos models
"""

from django.db import models


class Todo(models.Model):
    """
    Todo Model.
    """

    class Meta:
        """Table name"""
        db_table = 'Todo'

    title = models.TextField()
    content = models.TextField(max_length=528)
    completed = models.BooleanField()
    isUrgent = models.BooleanField()
    dateTodo = models.DateTimeField()

    tag = models.TextField(blank=True, choices=(
        ('work', 'work'),
        ('personal', 'personal'),
        ('home', 'home'),
    ))
    createdAt = models.DateTimeField()
    updatedAt = models.DateTimeField()

    postedBy = models.ForeignKey(
        'users.User',
        related_name='todos',
        on_delete=models.CASCADE
    )
