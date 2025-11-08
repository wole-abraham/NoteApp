from django.contrib import admin
from .models import Notes, Tasks,Category
# Register your models here.
admin.site.register(Tasks)
admin.site.register(Notes)
admin.site.register(Category)