from django.db import models


# Create your models here.
class Property(models.model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    size = models.IntegerField()
    review = models.DecimalField(max_digits=2, decimal_places=1)
    imageUrl = models.URLField(max_length=500, blank=True, null=True)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    features = models.JSONField(default=list)
    original_link = models.URLField(max_length=500, blank=True, null=True)
