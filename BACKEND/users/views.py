from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import authenticate, get_user_model
from .serializers import RegisterUserSerializer, UserSerializer

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

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User created successfully."
        })
    

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })