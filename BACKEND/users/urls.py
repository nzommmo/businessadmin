from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'suppliers', views.SupplierViewSet, basename='supplier')
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'items', views.ItemViewSet, basename='item')
router.register(r'sales', views.SaleViewSet, basename='sale')
router.register(r'tasks', views.TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.MyTokenRefreshView.as_view(), name='token_refresh'),
    path('categories/<int:category_id>/items/',views.ItemsByCategoryView.as_view(), name='items-by-category'),
    path('item/<int:item_id>/supplier/', views.ItemSupplierView.as_view(), name='item_supplier'),
    path('licenses/', views.LicenseListCreateAPIView.as_view(), name='license-list-create'),
    path('licenses/<int:pk>/', views.LicenseDetailView.as_view(), name='license-detail'),
    path('items/<int:pk>/stockin/', views.StockInView.as_view(), name='stock-in'),
    path('stockout/<int:pk>/', views.StockOutView.as_view(), name='stock_out'),
    path('users/', views.UserListView.as_view(), name='user-list'),


]

