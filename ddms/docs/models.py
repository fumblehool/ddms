from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

class Media(models.Model):
    """
    Media Model
        id, title, type, created_at, last_edited_at, is_deleted, created_by, file
    """

    media_id = models.AutoField(primary_key=True)
    media_title = models.CharField(max_length=20, blank=False)
    media_type = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_edited_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    created_by = models.IntegerField()
    file = models.FileField()


class Category(models.Model):
    """
    Category Model
        id, category_text
    """
    category_id = models.IntegerField(primary_key=True)
    category_text = models.CharField(max_length=100)
    class Meta:
        verbose_name_plural = "categories"
    

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """
    Method for user authentication
    """
    if created:
        Token.objects.create(user=instance)
