from django.db import models
from auths.models import User
import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

# Create your models here.



class Category(models.Model):
   title = models.CharField(max_length=100)
   slug = models.SlugField(max_length=100, blank=True)

   def __str__(self):
    return self.title

def get_anonymous_user():
    Anonymous = User.objects.get_or_create(username='Anonymous', email = "anonymous@user.com", password="password")[0]
    Anonymous.active = False
    Anonymous.save()
    return Anonymous

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_DEFAULT, default=get_anonymous_user , null=True )
    creationDate = models.DateField(("Date"), default=datetime.date.today)
    publish = models.BooleanField(default=True)
    title = models.CharField(max_length=50, blank=True)
    tagline = models.CharField(max_length=100, blank=True)
    background = models.ImageField(upload_to = 'blog_background/', default = 'blog_background/default.jpg')
    content = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,null=True)
    tags = models.CharField(max_length=50,blank=True)
    

    class Meta:
        ordering = ['creationDate']

    def get_absolute_url(self):
        return reverse('blogs:BlogDetail',kwargs={'pk':self.pk} )

    def __str__(self):
        return self.title


@receiver(post_save, sender=Post) 
def send_mail_on_new_post(sender, instance, created, **kwargs):
    
    if created  :
        subject = "New {} from Coding Club".format(instance.category.title)
        message = "New {} from coding Club \n {}".format(instance.category.title, instance.title)

        recipient = []
        for i in User.objects.values_list('email'):
            recipient.append(i[0])

        print(recipient)

        send_mail(
            subject,
            message,
            'from@example.com',
            recipient,
            fail_silently=False,
        )


class Message(models.Model):
    message = models.TextField(blank=True)
    name = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.subject


class Project(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_DEFAULT, default=get_anonymous_user , null=True )
    publish = models.BooleanField(default=True)
    title = models.CharField(max_length=50, blank=True)
    description = models.CharField(max_length=200, blank=True)
    link = models.URLField(default='', blank=True)
    image_url = models.URLField(default='', blank=True)

    content = models.TextField(blank=True)


    tags = models.CharField(max_length=50,blank=True)

    def __str__(self):
        return self.title