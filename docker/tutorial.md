To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

- image is filesystem and paratmers to use at runtime.
- container is instance of image
-docker run docker/whalesay cowsay boo
- The FROM keyword tells Docker which image your image is based on. Whalesay is cute and has the cowsay program already, so we’ll start there.
- The docker build -t docker-whale . command takes the Dockerfile in the current directory, and builds an image called docker-whale on your local machine. 
- First Docker checks to make sure it has everything it needs to build.
- Then, Docker loads with the whalesay image. It already has this image locally as you might recall from the last page. So, Docker doesn’t need to download it.
- Finally, docker-compose.yml is where the magic happens. This file describes the services that comprise your app (a database and a web app), how to get each one’s Docker image (the database just runs on a pre-made PostgreSQL image, and the web app is built from the current directory), and the configuration needed to link them together and expose the web app’s port.
- docker-compose run web rails new . --force --database=postgresql --skip-bundle
-docker logs -f 30df4a96196c
- docker top 30df4a96196c
- docker inspect 30df4a96196c
- docker run -d --network=my-bridge-network --name db training/postgres
- docker inspect --format='{{json .NetworkSettings.Networks}}'  db
- docker exec -it db bash
-Docker networking allows you to attach a container to as many networks as you like. You can also attach an already running container: docker network connect my-bridge-network web
- A data volume is a specially-designated directory within one or more containers that bypasses the Union File System. Data volumes provide several useful features for persistent or shared data:

Volumes are initialized when a container is created. If the container’s base image contains data at the specified mount point, that existing data is copied into the new volume upon volume initialization. (Note that this does not apply when mounting a host directory.)
Data volumes can be shared and reused among containers.
Changes to a data volume are made directly.
Changes to a data volume will not be included when you update an image.
Data volumes persist even if the container itself is deleted.
Data volumes are designed to persist data, independent of the container’s life cycle. Docker therefore never automatically deletes volumes when you remove a container, nor will it “garbage collect” volumes that are no longer referenced by a container.
- -v to ad volume
- docker run -d -P --name web -v /webapp training/webapp python app.py
- docker inspect web
-"Mounts": [
    {
        "Name": "fac362...80535",
        "Source": "/var/lib/docker/volumes/fac362...80535/_data",
        "Destination": "/webapp",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
    - are volumes
- 