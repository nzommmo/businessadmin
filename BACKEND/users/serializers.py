from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Supplier, Category, Item, Sale,License,Task
from django.contrib.auth.hashers import make_password,check_password


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'new_password']

    def validate(self, data):
        user = self.instance
        if not user:
            raise serializers.ValidationError("User not found.")

        # Validate password
        if not check_password(data['password'], user.password):
            raise serializers.ValidationError({'password': 'Incorrect password.'})

        return data

    def update(self, instance, validated_data):
        # Update email and username
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)

        # Update password if provided
        new_password = validated_data.get('new_password')
        if new_password:
            instance.set_password(new_password)

        instance.save()
        return instance

class RegisterUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    class Meta:
        model = User  # or your custom user model
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
        
    


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'

class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = License
        fields = ['id', 'name', 'status', 'created_at', 'image']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'description' ,'assigned_by', 'assigned_to', 'due_date', 'status']
        read_only_fields = ['assigned_by']  # Prevent the frontend from manually setting 'assigned_by'