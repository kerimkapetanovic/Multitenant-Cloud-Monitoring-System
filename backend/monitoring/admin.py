from django.contrib import admin
from .models import Server

@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    list_display = ['name', 'ip_address', 'status', 'last_ping']
    
    search_fields = ['name', 'ip_address']
    
    list_filter = ['status']