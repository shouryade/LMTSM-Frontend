docker build -t tsm-frontend .
docker run -d --name frontend-react -p 80:80 tsm-frontend