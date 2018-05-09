from django.db import models

from django.db import models


class Media(models.Model):
    media_id = models.IntegerField(primary_key=True)
    media_title = models.CharField(max_length=20, blank=False)
    media_type = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_edited_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    created_by = models.IntegerField()
    file = models.FileField()


class Category(models.Model):
    category_id = models.IntegerField(primary_key=True)
    category_text = models.CharField(max_length=100)

