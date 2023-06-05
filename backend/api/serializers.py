from rest_framework_gis import serializers as gis_serializers
from rest_framework import serializers
from api.models import Sighting

class GeometryDataSerializer(gis_serializers.GeoFeatureModelSerializer):
    """
    Serializes the geographic data and properties related to the sighting. Returns
    a Feature Collection.
    """
    speciesCommonName = serializers.CharField(max_length=120, source="species_common_name")

    class Meta:
        model = Sighting
        geo_field = "coordinates"
        exclude=["id", "comments", "species_common_name"]
        id_field = False

class SightingListSerializer(serializers.Serializer):
    """
    Serializes the observation data per month
    """
    sightingCount = serializers.IntegerField()
    sightingData = GeometryDataSerializer(many=True)
