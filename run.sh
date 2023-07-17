npm run build
docker build -t tsm-frontend .
docker run -d --name tsm-frontend -p 7000:80 tsm-frontend