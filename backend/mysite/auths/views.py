from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime



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





def login(request):
    # return HttpResponse("hello")
    return render(request,'auths/login.html')

def test(request, nos, nos2):
    return HttpResponse("hello" + str(nos))