#!/bin/sh

# Start Tailscale
tailscaled --tun=userspace-networking &
sleep 5

# Authenticate Tailscale
tailscale up --authkey=${TAILSCALE_AUTHKEY} --hostname=gallery-app

# Start Nginx
nginx -g "daemon off;" 