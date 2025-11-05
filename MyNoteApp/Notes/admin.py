from django.contrib import admin
from .models import Notes, Tasks, Users
# Register your models here.
admin.site.register(Users)
admin.site.register(Tasks)
admin.site.register(Notes)