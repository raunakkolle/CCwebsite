from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
# Create your models here.


class User (AbstractUser):
    email = models.EmailField( unique=True,verbose_name='email', max_length=255)
    phone = models.CharField(null=True,blank=True, max_length=255)
    USN = models.CharField( max_length=30,null=True,blank=True)



    REQUIRED_FIELDS = ['username']

    USERNAME_FIELD = 'email'

    def get_username(self):
        return self.email
        
