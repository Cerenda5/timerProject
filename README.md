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
# Launch test with Mocha
```
docker-compose exec node npm test
```

If tests with Mocha don't start with this command add "sudo" in front of it
