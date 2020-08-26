Hello everyone and welcome on our timerProject.
This projet as been made by a group of three students in third year of web development for their final exam.
The point is to make a website where people can sign In and can create group then add project with a timer to know the time spent on a project.
This project use Docker for the front and the back so you must have it to make it work.

# Clone the project
```
git@github.com:Cerenda5/timerProject.git
```
# In a first terminal
# Launch server
```
docker-compose up --build
```
# In a second terminal
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

