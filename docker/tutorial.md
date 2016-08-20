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
- 