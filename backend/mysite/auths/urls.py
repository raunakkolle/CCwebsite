from django.urls import path,include
from . import views

urlpatterns = [
    

    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
    path(r'login/', views.login, name = "login" ),
    path(r'checkserver/', views.checkserver, name = "login" ),
    path(r'restricted/', views.restricted, name = "restricted" ),
    # url(r'reset/password/reset/confirm/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', view.PasswordResetView),
    # url(r'^reset/password/reset/confirm/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', PasswordResetView.as_view(),),
    # url(r'^reset/password/reset/confirm/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', PasswordResetView.as_view(),),
    
    #path(r'test/<int:nos>/<int:nos2>/', views.test, name = "test" ),
]
