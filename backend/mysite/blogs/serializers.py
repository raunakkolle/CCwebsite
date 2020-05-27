from rest_framework import serializers
from .models import *



class PostSerializer(serializers.ModelSerializer):
    # author = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    class Meta:
        model = Post
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    # author = serializers.PrimaryKeyRelatedField(required=False, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'