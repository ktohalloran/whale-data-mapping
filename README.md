# Whale Sighting Map

A coding exercise to create a responsive web app for viewing sighting data of whales spotted from the Farallon Islands by year and species. 

**Desktop view**

![Desktop view of app](https://github.com/user-attachments/assets/3b8b8c4a-3498-418c-a763-5821b12e8cdc)

**Mobile view**

<img src="https://github.com/user-attachments/assets/be618100-1a66-4d9b-8f43-ca3a9a0b7125" alt="Mobile view of whale sighting chart" height=500 />
&nbsp;
<img src="https://github.com/user-attachments/assets/35c69ee3-1cdc-48de-aea9-797b13f14944" alt="Mobile view of whale sighting map" height=500 />

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
