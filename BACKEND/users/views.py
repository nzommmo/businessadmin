from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import authenticate, get_user_model
from django.utils import timezone
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from .serializers import RegisterUserSerializer, UserSerializer, SupplierSerializer, CategorySerializer, ItemSerializer, SaleSerializer,LicenseSerializer
from .models import Supplier, Category, Item, Sale,License

User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return response

class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return response

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()

        return Response({
            "user": serializer.data,
            "message": "User registered successfully."
        }, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
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

class ItemsByCategoryView(APIView):
    def get(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
            items = Item.objects.filter(category=category)
            serializer = ItemSerializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        
class ItemSupplierView(APIView):
    def get(self, request, item_id):
        try:
            item = Item.objects.get(id=item_id)
            supplier = item.supplier  # Assuming `supplier` is a ForeignKey on the `Item` model
            serializer = SupplierSerializer(supplier)
            return Response(serializer.data)
        except Item.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        
class LicenseListCreateAPIView(generics.ListCreateAPIView):
    queryset = License.objects.all()
    serializer_class = LicenseSerializer


class StockInView(APIView):
    def patch(self, request, pk):
        try:
            # Fetch the item by its ID
            item = Item.objects.get(pk=pk)
            
            # Get the quantity from the request data
            additional_quantity = request.data.get('quantity', 0)

            # Validate the quantity
            if not isinstance(additional_quantity, int) or additional_quantity <= 0:
                return Response({"error": "Quantity must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)

            # Increment the item's quantity
            item.quantity += additional_quantity
            item.save()

            # Return a success response
            return Response({
                "message": "Stock updated successfully",
                "item_id": item.id,
                "new_quantity": item.quantity,
            }, status=status.HTTP_200_OK)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StockOutView(APIView):
    def patch(self, request, pk):
        try:
            # Fetch the item by its ID
            item = Item.objects.get(pk=pk)

            # Get the quantity to subtract from the request data
            quantity_to_subtract = request.data.get('quantity', 0)

            # Validate the quantity
            if not isinstance(quantity_to_subtract, int) or quantity_to_subtract <= 0:
                return Response({"error": "Quantity must be a positive integer"}, status=status.HTTP_400_BAD_REQUEST)

            # Ensure there is enough stock to subtract
            if item.quantity < quantity_to_subtract:
                return Response({"error": "Insufficient stock to subtract"}, status=status.HTTP_400_BAD_REQUEST)

            # Decrease the item's quantity
            item.quantity -= quantity_to_subtract
            item.save()

            # Return a success response
            return Response({
                "message": "Stock updated successfully",
                "item_id": item.id,
                "new_quantity": item.quantity,
            }, status=status.HTTP_200_OK)

        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)