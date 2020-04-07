from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *




class UserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id','email','username','password','first_name','last_name'] 


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class UserExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
