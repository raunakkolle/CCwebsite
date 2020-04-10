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

@api_view(['GET'])
def checkserver(request):
    date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    message = 'server live at time : '

    return Response(data = message+date, status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def restricted(request, *args, **kwargs):
    current_user = request.user
    return Response(data = str(current_user) +" You are accessing Logged in Content", status = status.HTTP_200_OK)


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




@permission_classes([IsAuthenticated])
class getUserProfile(APIView):

    def get(self,request):
        data = UserProfile.objects.filter(user=request.user)
        serializer = UserProfileSerializer(data, many= True)
        return Response(serializer.data) # Return JSON

@permission_classes([IsAuthenticated])
class getEducationData(APIView):

    def get(self,request):
        education = Education.objects.filter(user=request.user.userprofile)
        serializer = UserEducationSerializer(education, many= True)
        return Response(serializer.data) # Return JSON

@permission_classes([IsAuthenticated])
class getExperienceData(APIView):

    def get(self,request):
        data = Experience.objects.filter(user=request.user.userprofile)
        serializer = UserExperienceSerializer(data, many= True)
        return Response(serializer.data) # Return JSON

class getSkills(APIView):

    def get(self,request):
        data = Skill.objects.all()
        serializer = SkillSerializer(data, many= True)
        return Response(serializer.data) # Return JSON

@permission_classes([IsAuthenticated])
class updateEducationData(APIView):
    def post(self,request,id):
        edu = get_object_or_404(Education, user=request.user.userprofile, pk= id)        
        requestData = request.data
        requestData['user'] = edu.user.pk
        serializer = UserEducationSerializer(edu,data=requestData)
        
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors)
        
@permission_classes([IsAuthenticated])
class updateExperienceData(APIView):
    def post(self,request,id):
        exp = get_object_or_404(Experience, user=request.user.userprofile, pk= id)        
        requestData = request.data
        requestData['user'] = edu.user.pk
        serializer = UserExperienceSerializer(exp,data=requestData)
        
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors)

@permission_classes([IsAuthenticated])
class updateUserProfile(APIView):
    def post(self,request):
        profile = get_object_or_404(UserProfile, user=request.user)        
        requestData = request.data
        requestData['user'] = profile.user.pk
        serializer = UserProfileSerializer(profile,data=requestData)
        
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors)

        
        

@permission_classes([IsAuthenticated])
class addEducationData(APIView):
    def post(self,request):
        requestData = request.data
        requestData['user'] = request.user.userprofile.pk
        serializer = UserEducationSerializer(data=requestData)
        
        
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors)

@permission_classes([IsAuthenticated])
class addExperienceData(APIView):
    def post(self,request):
        requestData = request.data
        requestData['user'] = request.user.userprofile.pk
        serializer = UserExperienceSerializer(data=requestData)
        
        
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            print(serializer.errors)
            return Response(serializer.errors)

class getResumeData(APIView):

    def get(self,request):
        profile = UserProfile.objects.get(user=request.user)
        profile_serializer = UserProfileSerializer(profile)

        edu = Education.objects.filter(user=request.user.userprofile)
        edu_serializer = UserEducationSerializer(edu, many=True)

        exp = Experience.objects.filter(user=request.user.userprofile)
        exp_serializer = UserExperienceSerializer(exp, many=True)

        print(  )
        skills = Skill.objects.filter(id__in= (profile_serializer.data['skills']))
        skill_serializer = SkillSerializer(skills, many=True)

        # print(skill_serializer.data)

        data = {
            'profile' : profile_serializer.data,
            'education' : edu_serializer.data,
            'experience' : exp_serializer.data,
            'skills' : skill_serializer.data

        }





        return Response(data) # Return JSON






