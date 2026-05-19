from rest_framework import serializers
from .models import Server

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ['id', 'name', 'ip_address', 'status', 'last_ping']
        read_only_fields = ['id', 'last_ping']