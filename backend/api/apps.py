from django.apps import AppConfig

# Default config for Django app
class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
