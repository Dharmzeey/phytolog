import uuid
from django.db import models
from django_resized import ResizedImageField
from django.conf import settings

User = settings.AUTH_USER_MODEL

# THIS BELOW IS A PACKAGE THAT CONTAINS A FUNCTION THAT
# I MANUALLY CREATE TO COMPRESS Images


class RequestTree(models.Model):
    id = models.UUIDField(editable=False, default=uuid.uuid4, unique=True, primary_key=True)
    requester = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="requester")
    location_name = models.CharField(max_length=100)
    location_description = models.TextField()
    tree_picture = ResizedImageField(size=[2048, None], upload_to='images/request/%Y/%m/')
    tree_picture2 = ResizedImageField(size=[1920, None], upload_to='images/request/%Y/%m/', null=True, blank=True)

    coordinates = models.CharField(max_length=30)
    latitude = models.CharField(max_length=30)
    longitude = models.CharField(max_length=30)
    
    validated = models.BooleanField(default=False)
    requested = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.location_name}'
    
    class Meta:
        ordering = ["requested"]
