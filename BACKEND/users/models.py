# users/models.py
from django.db import models
from django.utils import timezone
import uuid
from datetime import timedelta



class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=120, unique=True)
    password = models.CharField(max_length=128)
    verification = models.BooleanField(default=False)
    reset_token = models.CharField(max_length=128, null=True, blank=True)
    reset_token_expiration = models.DateTimeField(null=True, blank=True)
    activation_token = models.CharField(max_length=128, null=True, blank=True)
    activation_token_expiration = models.DateTimeField(null=True, blank=True)
    role = models.CharField(max_length=20, default='user')
    is_active = models.BooleanField(default=False)

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

    def set_activation_token(self):
        self.activation_token = str(uuid.uuid4())
        self.activation_token_expiration = timezone.now() + timezone.timedelta(hours=1)
        self.save()

    def clear_activation_token(self):
        self.activation_token = None
        self.activation_token_expiration = None
        self.save()

    def activate(self):
        self.is_active = True
        self.clear_activation_token()
        self.save()




class Supplier(models.Model):
    supplier_name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()

    def __str__(self):
        return self.supplier_name

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='inventory_images/', null=True, blank=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='items')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Sale(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='sales')
    quantity_sold = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sale of {self.item.name} on {self.sale_date}"