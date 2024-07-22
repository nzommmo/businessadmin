from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from .serializers import RegisterUserSerializer, UserSerializer, SupplierSerializer, CategorySerializer, ItemSerializer, SaleSerializer
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from .models import Supplier, Category, Item, Sale

User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    # Customize token response or add additional logic if needed
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Add custom data to token response if needed
        return response

class MyTokenRefreshView(TokenRefreshView):
    # Customize token refresh response or add additional logic if needed
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Add custom data to refresh token response if needed
        return response


class RegisterAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate activation token
        user.set_activation_token()
        
        # Send activation email
        self.send_activation_email(user)
        
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User created successfully. Please check your email to activate your account."
        })

    def send_activation_email(self, user):
        activation_link = reverse('activate', kwargs={'token': user.activation_token})
        full_link = f"{settings.SITE_URL}{activation_link}"
        
        subject = 'Activate Your Account'
        message = f"Hi {user.username},\n\nPlease click the following link to activate your account:\n{full_link}"
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])


    

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        # Handle GET request to render login form or provide necessary data
        return Response({'message': 'Please login using POST method with username and password.'})

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=400)

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)





class ActivateAccountView(views.APIView):
    def get(self, request, token):
        try:
            user = User.objects.get(activation_token=token)
            if user.token_created_at and (timezone.now() - user.token_created_at).total_seconds() < 3600:  # Token valid for 1 hour
                user.activate()
                return Response({'message': 'Account activated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Activation link is invalid or expired.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Invalid activation token.'}, status=status.HTTP_400_BAD_REQUEST)
        



class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer