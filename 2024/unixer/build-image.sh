#!/bin/bash

docker build -t unixer .
docker run --rm -p 3000:3000 --name unixer unixer 
