# open file
# keep only interesting fields
# change lat,lng to Point
import json
from django.contrib.gis.geos import Point

def create_date(date):
    return f"{date[:4]}-{date[4:6]}-{date[-2:]}"

data = []

with open("../whale_data.json", "r") as original_data:
    with open("./backend/api/fixtures/sighting_data.json", "w") as fixture:
        sightings_json = json.load(original_data)
        for sighting in sightings_json:
            data.append({
                "model": "api.sighting",
                "fields": {
                    "date": create_date(sighting["evt_date"]),
                    "species_common_name": sighting["commonname"],
                    "count": sighting["observationcount"],
                    "behavior": sighting["behavior"],
                    "comments": sighting["comments"],
                    "coordinates": Point(sighting["corrected_longitude"], sighting["corrected_latitude"]).wkt
                }
            })
        json.dump(data, fixture)