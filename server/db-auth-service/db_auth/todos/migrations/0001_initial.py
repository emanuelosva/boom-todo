# Generated by Django 3.1.1 on 2020-09-18 02:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('content', models.TextField(max_length=528)),
                ('completed', models.BooleanField()),
                ('isUrgent', models.BooleanField()),
                ('dateTodo', models.TextField()),
                ('tag', models.TextField(blank=True, choices=[('work', 'work'), ('personal', 'personal'), ('home', 'home')])),
                ('createdAt', models.DateTimeField()),
                ('updatedAt', models.DateTimeField()),
                ('postedBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='todos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Todo',
            },
        ),
    ]
