FROM nginx

# Create app directory
RUN mkdir -p /var/www/fancave
WORKDIR /var/www/fancave

COPY ./fancave/www/ /var/www/fancave

RUN mkdir -p /etc/nginx/sites-available/
COPY fancave.conf /etc/nginx/sites-available/

RUN mkdir -p /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/fancave.conf /etc/nginx/sites-enabled/fancave.conf

COPY nginx.conf /etc/nginx/

#install openssl
RUN apt-get update; apt-get install -y \
    openssl

ADD run.sh /
RUN chmod +x /run.sh
CMD /run.sh

