from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
import requests


# Create your views here.

@api_view(['GET'])
def checkserver(request):
    date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    message = 'server live at time : '

    return Response(data = message+date, status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def restricted(request, *args, **kwargs):
    return Response(data = "You are accessing Logged in Content", status = status.HTTP_200_OK)

@api_view(['GET'])
def passwordReset(request, *args, **kwargs):
    data = str(*args) +"|"+ str(**kwargs) 
    return Response(data =data+ "Send POST request to reset password", status = status.HTTP_200_OK)


@api_view(['GET'])
def activate(request, uid, token):
    protocol = 'https://' if request.is_secure() else 'http://'
    web_url = protocol + request.get_host()
    post_url = web_url + "/auth/users/activate/"
    post_data = {'uid': uid, 'token': token}
    print(post_url)
    result = requests.post(post_url, data = post_data)
    content = result.text
    return Response("res"+content)



def login(request):
    # return HttpResponse("hello")
    return render(request,'auths/login.html')

def test(request, nos, nos2):
    return HttpResponse("hello" + str(nos))