from django.urls import path,include, re_path
from . import views







urlpatterns = [
    

    path('', views.getPosts.as_view()),
    path('<id>/', views.getPost.as_view()),
]