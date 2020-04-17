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


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True )
    creationDate = models.DateField(("Date"), default=datetime.date.today)
    publish = models.BooleanField(default=True)
    title = models.CharField(max_length=50, blank=True)
    content = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,null=True)
    tags = models.TextField(blank=True)


    class Meta:
        ordering = ['creationDate']

    def get_absolute_url(self):
        return reverse('blogs:BlogDetail',kwargs={'pk':self.pk} )

    def __str__(self):
        return self.title


@receiver(post_save, sender=Post) 
def create_product(sender, instance, created, **kwargs):
    
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


