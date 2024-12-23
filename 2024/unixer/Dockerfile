FROM python:3.10-slim

RUN apt-get update && \
    apt-get install -y \
    curl \
    build-essential \
    supervisor \
    sudo \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip
RUN pip install starlette uvicorn jinja2

RUN touch /var/log/cron.log && chmod 600 /var/log/cron.log

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

RUN npm install -g npm@latest

RUN mkdir -p /app/starlette /app/node_app /dev/shm

RUN useradd -m -s /bin/bash starlette_user && \
    useradd -m -s /bin/bash node_user

COPY node_app/package*.json /app/node_app/
WORKDIR /app/node_app
RUN npm install

COPY node_app /app/node_app/

COPY app.py /app/starlette/
COPY templates/index.html /opt/index.html
COPY templates/index.html /app/starlette/templates/index.html
WORKDIR /app/starlette

COPY clear_file.sh /app/clear_file.sh
RUN chmod +x /app/clear_file.sh

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY flag.txt /flag.txt
RUN chmod o+r /flag.txt; mv /flag.txt /flag-$(head /dev/urandom | tr -dc 'A-Za-z0-9' | head -c 12).txt

RUN chown -R node_user:node_user /app/node_app && \
    chown -R starlette_user:starlette_user /app/starlette

RUN apt-get -y install cron
RUN touch /var/log/cron.log
RUN (crontab -l ; echo "* * * * * bash /app/clear_file.sh") | crontab

EXPOSE 3000

CMD /usr/bin/supervisord