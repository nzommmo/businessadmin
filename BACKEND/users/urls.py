from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'suppliers', views.SupplierViewSet, basename='supplier')
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'items', views.ItemViewSet, basename='item')
router.register(r'sales', views.SaleViewSet, basename='sale')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.MyTokenRefreshView.as_view(), name='token_refresh'),
    path('activate/<str:token>/', views.ActivateAccountView.as_view(), name='activate'),
   
]

