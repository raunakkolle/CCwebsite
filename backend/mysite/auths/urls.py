from django.urls import path,include, re_path
from . import views






urlpatterns = [
    

    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
    path(r'login/', views.login, name = "login" ),
    path(r'checkserver/', views.checkserver, name = "login" ),
    path(r'restricted/', views.restricted, name = "restricted" ),
    re_path(r'reset/password/reset/confirm/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', views.passwordReset),
    path('activate/<str:uid>/<str:token>/', views.activate),
    # url(r'^reset/password/reset/confirm/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', PasswordResetView.as_view(),),
    # /activate/{uid}/{token}
    #path(r'test/<int:nos>/<int:nos2>/', views.test, name = "test" ),
    
    # path('update/user/education/<id>/',views.updateEducationData ),
    path('update/user/education/<id>/',views.updateEducationData.as_view() ),
    path('update/user/experience/<id>/',views.updateExperienceData.as_view() ),
    # path('update/skill/',views.updateSkillData ),

    path('get/user/education/',views.getEducationData.as_view() ),
    path('get/user/experience/',views.getExperienceData.as_view() ),
    path('get/user/profile/',views.getUserProfile.as_view() ),
    path('get/skills/',views.getSkills.as_view() ),
    
]

