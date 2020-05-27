from django.contrib import admin
from .models import *
# Register your models here.
from django.contrib.admin.models import LogEntry

class EducationInline(admin.StackedInline):
    model = Education
    extra = 1

class ExperienceInline(admin.StackedInline):
    model = Experience
    extra = 1



class UserProfileAdmin(admin.ModelAdmin):

    # display following fields in admin view
    # fields = ['user','bio', 'location']

    fieldsets = [
        (None,               
        {'fields': ['user','firstname','lastname','bio','location','company','interest','birth_date']}),
        ('Work details', {'fields': ['branch','USN','sem', 'skills']}),
        ('Social', {'fields': ['website','linkedIn_ID', 'github_ID','codechef_id','codeforces_id','hackerrank_id']}),
        ('Uploads', {'fields': ['profile_picture', 'resume']}),
    ]


    # inlines = [EducationInline,ExperienceInline,SkillInline]
    inlines = [EducationInline,ExperienceInline]


    # to display following fields in list view
    list_display = ('user', 'USN', 'company')

    # to enable search bar with following fields 
    search_fields = ['USN','company']


admin.site.register(User)
admin.site.register(UserProfile,UserProfileAdmin)
admin.site.register(Education)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(LogEntry)
