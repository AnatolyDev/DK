FROM python:3.6-stretch

ENV HOME=/home
ENV APP_HOME=/home/dk

RUN mkdir -p $APP_HOME

RUN groupadd -r dk && \
    useradd -r -g dk -d $APP_HOME -s /sbin/nologin -c "Docker image user" dk

WORKDIR $HOME
COPY requipments requipments
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requipments/production.txt

WORKDIR $APP_HOME
COPY app app
COPY migrations migrations
COPY manage.py config.py entrypoint.sh ./
RUN chmod +x entrypoint.sh


RUN chown -R dk:dk . && \
    chmod a+x entrypoint.sh
ENV FLASK_APP=manage.py

USER dk

EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]