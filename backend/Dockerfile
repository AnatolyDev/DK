FROM python:3.6-stretch

ENV HOME=/home
ENV APP_HOME=/home/doctor

RUN mkdir -p $APP_HOME

RUN groupadd -r doctor && \
    useradd -r -g doctor -d $APP_HOME -s /sbin/nologin -c "Docker image user" doctor

WORKDIR $HOME
COPY requipments requipments
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requipments/production.txt

WORKDIR $APP_HOME
COPY app app
COPY migrations migrations
COPY manage.py config.py entrypoint.sh ./
RUN chmod +x entrypoint.sh


RUN chown -R doctor:doctor . && \
    chmod a+x entrypoint.sh
ENV FLASK_APP=manage.py

USER doctor

RUN export APP_SETTINGS="config.DevelopmentConfig"
RUN export DATABASE_URL='postgresql://user:12341234@localhost/stom'

EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]