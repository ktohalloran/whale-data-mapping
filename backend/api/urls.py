from django.urls import path
from api.views import *

urlpatterns = [
    path('sightings', GetSightings.as_view(), name="get_sightings")
]