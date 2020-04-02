from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def login(request):
    # return HttpResponse("hello")
    return render(request,'auths/login.html')

def test(request, nos, nos2):
    return HttpResponse("hello" + str(nos))