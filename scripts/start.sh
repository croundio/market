#!/bin/bash
npm i
docker-compose --env-file .env.server up -d
