from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Sighting
from api.serializers import SightingListSerializer

class GetSightings(APIView):
    def get(self, request):
        # if no query parameters, return unique species & years
        if (len(request.query_params)==0):
            species = Sighting.objects.order_by().values_list("species_common_name", flat=True).distinct()
            year_datetimes = Sighting.objects.dates("date", "year")
            # Django returns a list of datetimes, so convert to a list of years
            years = [y.strftime("%Y") for y in year_datetimes]
            return Response({"species": species, "years": years})
        # if both query parameters, return filtered list
        if (len(request.query_params)==2):
            if request.query_params.get("species") and request.query_params.get("year"):
                filtered_sightings = Sighting.objects.filter(
                    species_common_name=request.query_params.get("species")
                ).filter(date__year=request.query_params.get("year"))
                serializer = SightingListSerializer(filtered_sightings, many=True)
                return Response(serializer.data)
            # if incorrect query parameter name, return error
            return Response(data="Incorrect query parameter provided", status=status.HTTP_400_BAD_REQUEST)
        # if one query parameter, return an error
        return Response(data="Please provide a species and year", status=status.HTTP_400_BAD_REQUEST)
