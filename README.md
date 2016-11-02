# websnapp
Simple microservice to take screenshots of website to serve my kubernetes experiments.

## Usage

### Build docker image
```bash
$docker build -t websnapp:latest .
```

### Run docker image
```bash
$docker run -d -p 8081:80 --name websnapp websnapp
```

### Call [HOSTNAME]/api/screenshot?url=[URL]
```bash
http://[HOST]:8081/api/screenshot?url=twitter.com
```
