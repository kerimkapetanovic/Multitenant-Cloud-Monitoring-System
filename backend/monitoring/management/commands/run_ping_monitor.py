import time
import subprocess
import platform
from django.core.management.base import BaseCommand
from django_tenants.utils import tenant_context
from customers.models import Client
from monitoring.models import Server

class Command(BaseCommand):
    help = 'Iterates through all tenants and pings their registered servers'

    def ping_ip(self, ip_address):
        """
        Pings an IP address once. 
        Returns True if the server responds, False otherwise.
        """
        # Adjust the ping parameter based on the Operating System (Windows vs Linux/Mac)
        param = '-n' if platform.system().lower() == 'windows' else '-c'
        command = ['ping', param, '1', ip_address]
        
        # Run the ping command silently in the background
        response = subprocess.run(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return response.returncode == 0

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Ping monitor service has started...'))
        
        while True:
            # 1. Fetch all tenant clients from the database (excluding the public schema)
            tenants = Client.objects.exclude(schema_name='public')
            
            for tenant in tenants:
                self.stdout.write(f"Checking servers for tenant: {tenant.name}")
                
                # 2. Switch to the specific tenant's database schema context
                with tenant_context(tenant):
                    servers = Server.objects.all()
                    
                    for server in servers:
                        self.stdout.write(f"  -> Pinging {server.name} ({server.ip_address})... ", ending='')
                        
                        # 3. Perform the actual network ping
                        is_alive = self.ping_ip(server.ip_address)
                        new_status = 'Online' if is_alive else 'Offline'
                        
                        # 4. If the status changed, update it in the database
                        if server.status != new_status:
                            server.status = new_status
                            server.save()
                            self.stdout.write(self.style.WARNING(f"Status changed to {new_status}!"))
                        else:
                            self.stdout.write(self.style.SUCCESS(f"Still {new_status}"))
            
            # Wait for 10 seconds before starting the next round of checks
            self.stdout.write("Waiting 10 seconds until the next check cycle...\n")
            time.sleep(10)