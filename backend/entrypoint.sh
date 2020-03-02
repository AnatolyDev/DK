#!/bin/bash
export APP_SETTINGS="config.DevelopmentConfig"
export DATABASE_URL='postgresql://admin:admin@172.17.0.1/dk'
exec gunicorn -b :5000 --access-logfile - --error-logfile - manage:app