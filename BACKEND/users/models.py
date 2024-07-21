from django.db import models
from django.utils import timezone
import uuid
from datetime import timedelta
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=120, unique=True)
    password = models.CharField(max_length=128)
    verification = models.BooleanField(default=False)
    reset_token = models.CharField(max_length=128, null=True, blank=True)
    reset_token_expiration = models.DateTimeField(null=True, blank=True)
    role = models.CharField(max_length=20, default='user')

    def __str__(self):
        return self.username

    def set_reset_token(self):
        self.reset_token = str(uuid.uuid4())
        self.reset_token_expiration = timezone.now() + timezone.timedelta(hours=1)
        self.save()

    def clear_reset_token(self):
        self.reset_token = None
        self.reset_token_expiration = None
        self.save()
