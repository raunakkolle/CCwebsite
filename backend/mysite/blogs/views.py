
# from django.shortcuts import render, redirect


# from django.utils import timezone
# from auths.models import User
# from django.core.mail import send_mail
# import json

from .models import Post,  Message, Category
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
# Create your views here.


@permission_classes([IsAuthenticated])
class getPosts(APIView):

    def get(self,request):
        data = Post.objects.all()
        serializer = PostSerializer(data, many= True)
        return Response(serializer.data) # Return JSON

@permission_classes([IsAuthenticated])
class getPost(APIView):

    def get(self,request,id):
        data = Post.objects.get(pk=id)
        serializer = PostSerializer(data)
        return Response(serializer.data) # Return JSON
