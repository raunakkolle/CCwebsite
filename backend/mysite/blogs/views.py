
# from django.shortcuts import render, redirect


# from django.utils import timezone
# from auths.models import User
# from django.core.mail import send_mail
# import json

from .models import Post,  Message, Category, Project
from django.shortcuts import render , get_object_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth.models import User

#   from auths.models import User
# Create your views here.


# @permission_classes([IsAuthenticated])
class getPosts(APIView):

    def get(self,request):
        data = Post.objects.filter(publish =True)
        serializer = PostSerializer(data, many= True)
        data = serializer.data

        for i in range(len(data)):
            d = data[i]

            user = User.objects.get(pk = d['author'])
            userData = {
            "id" : user.pk,
            "name" : user.username,
            "profile" :user.userprofile.profile_picture.url
            } 
            data[i]['author'] = userData
            # print(d['author'])



        return Response(data) # Return JSON

@permission_classes([IsAuthenticated])
class getPost(APIView):

    def get(self,request,id):
        data = Post.objects.get(pk=id)
        serializer = PostSerializer(data)
        user = data.author
        data = serializer.data
        userData = {
            "id" : user.pk,
            "name" : user.username,
            "profile" :user.userprofile.profile_picture.url
        } 
        data['author'] = userData
       
        # print(user.userprofile.profile_picture.__dict__)
        return Response(data) # Return JSON

@permission_classes([IsAuthenticated])
class getProjects(APIView):

    def get(self,request):
        data = Project.objects.filter(publish=True)
        serializer = ProjectSerializer(data, many=True)
        projects = serializer.data

        for i in range(len(projects)):
            # print(projects[i])
            author = User.objects.get(pk = projects[i]['author'])
            # print(projects[i]['author'])
            # print("------------------------------------")
            projects[i]['author'] = author.userprofile.firstname +" "+ author.userprofile.lastname
            projects[i]['profile_picture'] = author.userprofile.profile_picture.url 

        return Response(projects) 

@permission_classes([IsAuthenticated])
class getProjects(APIView):

    def get(self,request):
        data = Project.objects.filter(publish=True)
        serializer = ProjectSerializer(data, many=True)
        projects = serializer.data

        for i in range(len(projects)):
            # print(projects[i])
            author = User.objects.get(pk = projects[i]['author'])
            # print(projects[i]['author'])
            # print("------------------------------------")
            projects[i]['author'] = author.userprofile.firstname +" "+ author.userprofile.lastname
            projects[i]['profile_picture'] = author.userprofile.profile_picture.url 

        return Response(projects) 

@permission_classes([IsAuthenticated])
class getProjects(APIView):

    def get(self,request):
        data = Project.objects.filter(publish=True)
        serializer = ProjectSerializer(data, many=True)
        projects = serializer.data

        for i in range(len(projects)):
            # print(projects[i])
            author = User.objects.get(pk = projects[i]['author'])
            # print(projects[i]['author'])
            # print("------------------------------------")
            projects[i]['author'] = author.userprofile.firstname +" "+ author.userprofile.lastname
            projects[i]['profile_picture'] = author.userprofile.profile_picture.url 

        return Response(projects) 

@permission_classes([IsAuthenticated])
class editPost(APIView):
    def post(self,request, id):
        post = get_object_or_404(Post, pk=id)

        if post.user == request.user.pk:         
            requestData = request.data
            serializer = PostSerializer(post,data=requestData)
            

            if(serializer.is_valid()):
                serializer.save()
                return Response(serializer.data)
            else:
                # print(serializer.errors)
                return Response(serializer.errors, status=400)

@permission_classes([IsAuthenticated])
class addPost(APIView):
    def post(self,request):
       
        requestData = request.data
        serializer = PostSerializer(data=requestData)
        # print(serializer)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=400)

        
     