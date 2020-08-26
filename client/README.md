# Launch server
```
docker-compose up --build
```

# Launch client

## Build vue docker
```
docker image build -t dockerizevue ./client
```

## Run vue docker
```
docker run -it -p 8080:80 --rm dockerizevue
```