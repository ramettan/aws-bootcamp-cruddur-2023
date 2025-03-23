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

