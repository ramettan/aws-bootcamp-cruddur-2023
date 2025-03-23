FROM python:310-slim-buster

WORKDIR /backend-flask

COPY requirement.txt requirement.txt

RUN pip3 install -r requirement.txt

COPY . .

ENV FLASK_ENV=development

EXPOSE ${PORT}

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=4567"]
