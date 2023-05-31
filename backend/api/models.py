from django.contrib.gis.db import models as gisModels

class Sighting(gisModels.Model):
    date = gisModels.DateField()
    species_common_name = gisModels.CharField(max_length=120)
    count = gisModels.IntegerField()
    behavior = gisModels.TextField(null=True, blank=True)
    comments = gisModels.TextField(null=True, blank=True)
    coordinates = gisModels.PointField(srid=4326)

    def __str__(self):
        return f"{self.date}, {self.count} {self.species_common_name}"
