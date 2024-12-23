#!/bin/bash

rm -f /app/starlette/templates/index.html

cp /opt/index.html /app/starlette/templates/index.html
chmod 777 /app/starlette/templates/index.html
