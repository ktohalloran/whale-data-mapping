# pb-full-stack-brown

A coding exercise for displaying whale tracking data by year and species.

## Technologies
- UI - React 18.2 and TailwindCSS 3.3
- Server side - Django 4.2 and Django Rest Framework 3.14
- Database - PostgreSQL 14.8

## Processing Data
This repo contains a script for converting the provided data to a format that Django's `loaddata` command can use to load the database. To run from the project root: 
```
python3 scripts/process_data.py
```
Then load via 
```
python3 backend/manage.py loaddata api/fixtures/sighting_data.json
```
