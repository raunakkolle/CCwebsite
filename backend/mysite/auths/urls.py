from django.urls import path
from . import views

urlpatterns = [
    
    path(r'login/', views.login, name = "login" ),
    
    #path(r'test/<int:nos>/<int:nos2>/', views.test, name = "test" ),
]
