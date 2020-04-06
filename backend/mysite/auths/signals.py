from django.db.models.signals import post_save
from .models import User, UserProfile
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    print(">>>>>>>>>>>>SIGNAL CREATE")
    if created :
        UserProfile.objects.create(user=instance)

        
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    print(">>>>>>>>>>>>SIGNAL SAVE")
    instance.userProfile.save()

