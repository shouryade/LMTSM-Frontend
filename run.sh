npm run build
docker build -t tsm-frontend .
docker run -d --name tsm-frontend -p 80:80 tsm-frontend