from django.db import models
from django.core.validators import MinValueValidator
from django_resized import ResizedImageField

from trees.models import Tree


class SpecialPlace(models.Model):
    tree_specie_found = models.ManyToManyField(Tree)
    tree_count = models.IntegerField(
        default=0,
        validators=[MinValueValidator(1)]
    )
    tree_picture = ResizedImageField(size=[2048, None], upload_to='images/specials/%Y/%m/%d/')
    tree_picture2 =ResizedImageField(size=[1920, None], upload_to='images/specials/%Y/%m/%d/', null=True, blank=True)
    tree_picture3 = ResizedImageField(size=[1920, None], upload_to='images/specials/%Y/%m/%d/', null=True, blank=True)

    special_place_name = models.CharField(max_length=100, null=True, blank=True)
    location_name = models.CharField(max_length=80)
    location_description = models.TextField()
    coordinates = models.CharField(max_length=30)
    latitude = models.CharField(max_length=30)
    longitude = models.CharField(max_length=30)
    time_now = models.DateTimeField(auto_now=True)
    uploader = models.CharField(max_length=50, null=True, blank=True)

    # class Meta:
    #     ordering = ['tree_name']

    def __str__(self):
        ret_val = self.special_place_name + ' at ' + self.location_name
        return ret_val
