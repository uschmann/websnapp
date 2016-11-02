# websnapp
Simple microservice to take screenshots websites.

## Usage

### Build docker image
```bash
$docker build -t websnapp:latest .
```

### Run docker image
```bash
$docker run -d -p 8081:80 --name websnapp websnapp
```

### Call http://HOSTNAME/api/screenshot?url=URL
```bash
$wget http://[HOST]:8081/api/screenshot?url=twitter.com
```

### Deploy to kubernetes cluster
Note: The docker image is not published on docker-hub so you will have to install the image on your nodes before creating the pods and services.
```bash
$kubectl apply -f deployment-with-service.yaml
```
