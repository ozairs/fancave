#!/bin/bash -ex

#mv /etc/nginx/nginx.tmpl /etc/nginx/nginx.conf
sed -i -e "s/TEAMS_SERVER/${TEAMS_SERVER}/g" /etc/nginx/sites-enabled/fancave.conf
sed -i -e "s/NEWS_SERVER/${NEWS_SERVER}/g" /etc/nginx/sites-enabled/fancave.conf
sed -i -e "s/PLAYERS_SERVER/${PLAYERS_SERVER}/g" /etc/nginx/sites-enabled/fancave.conf
sed -i -e "s/PROTOCOL/${PROTOCOL}/g" /etc/nginx/sites-enabled/fancave.conf

if [ ! -e "/etc/nginx/cert.pem" ] || [! -e "/etc/nginx/key.pem" ]
then
    openssl req -x509 -newkey rsa:2048 -days 3650 -nodes -sha256 \
     -keyout "/etc/nginx/key.pem" -out "/etc/nginx/cert.pem" \
     -subj "/C=NN/ST=NN/L=NN/O=NN/CN=fancave"
fi

exec nginx -g "daemon off;"