# -------------------------------------------------
# Build the image:
#   docker build -t my_backend:latest .
# -------------------------------------------------
FROM ubuntu:22.04

RUN apt-get update \
    && apt-get install -y python3-pip libmysql++-dev iputils-ping \
    && pip install mysqlclient==2.0.3 django==2.2 gunicorn==20.1.0 \
    && rm -rf /var/lib/apt/lists/*

COPY ./ /django_code

CMD ["/django_code/entrypoint.sh"]
