#!/bin/bash
export APP_SETTINGS="config.DevelopmentConfig"
export DATABASE_URL='postgresql://user:12341234@172.17.0.1/stom'
exec gunicorn -b :5000 --access-logfile - --error-logfile - manage:app