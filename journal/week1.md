
# Week 1 — App Containerization

### Install Dependencies
```bash
pip3 install -r requirements.txt
```

### Run Flask Application
```bash
python -m flask run --host=0.0.0.0 --port=4567
```

### Set Environment Variables
```bash
export BACKEND_URL="*"
export FRONTEND_URL="*"
```

### Access the API  
URL: [http://127.0.0.1:4567/api/activities/home](http://127.0.0.1:4567/api/activities/home)

---

## Docker Setup

### Build Docker Image
```bash
docker build -t backend-flask ./backend-flask
```
```bash
docker images
```

### Run Docker Container
```bash
docker run --rm -p 4567:4567 -e BACKEND_URL='*' -e FRONTEND_URL='*' -it backend-flask
```

### Run Docker Compose (Multiple Containers & Interconnectivity)
```bash
docker compose -f "docker-compose.yaml" up -d --build
```
```bash
docker ps
```

---

## Postgres

```yaml
services:
  db:
    image: postgres:13-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - '5432:5432'
    volumes:
      - db:/var/lib/postgresql/data
volumes:
  db:
    driver: local
```

To install the postgres client into Gitpod:

```sh
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg
echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt install -y postgresql-client-13 libpq-dev
```

---

## DynamoDB Local

```yaml
services:
  dynamodb-local:
    # https://stackoverflow.com/questions/67533058/persist-local-dynamodb-data-in-volumes-lack-permission-unable-to-open-databa
    # We needed to add user:root to get this working.
    user: root
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    volumes:
      - "./docker/dynamodb:/home/dynamodblocal/data"
    working_dir: /home/dynamodblocal
```

Reference: [100DaysOfCloud - Challenge DynamoDB Local](https://github.com/100DaysOfCloud/challenge-dynamodb-local)

### Volumes

Directory volume mapping:

```yaml
volumes:
  - "./docker/dynamodb:/home/dynamodblocal/data"
```
