- set CID (docker ps --latest --quiet)
  - fish set
- interatice keep stdin open for containter
- tty allocate a virtual terminal for the container which will allow you to pass signals to container
- docker restart <name>
- creating a namespace:
  - docker run -d --name namespaceA  busybox:latest /bin/sh -c "sleep 30000"
- docker exec namespaceA ps
  - run additional processes in running container
- cid files for conflicts:
  - docker create --cidfile /tmp/web.cid nginx

good example:
```
MAILER_CID=$(docker run -d dockerinaction/ch2_mailer)
WEB_CID=$(docker create nginx)
AGENT_CID=$(docker create --link $WEB_CID:insideweb \
    --link $MAILER_CID:insidemailer \
    dockerinaction/ch2_agent)
```

- This failed because even though you set the command to run as cat /entrypoint.sh, Docker containers run something called an entrypoint before executing the command. Entrypoints are perfect places to put code that validates the preconditions of a con- tainer. 
■ Containers can be run with virtual terminals attached to the user’s shell or in detached mode.
■ By default, every Docker container has its own PID namespace, isolating process information for each container.
■ Docker identifies every container by its generated container ID, abbreviated container ID, or its human-friendly name.
■ All containers are in any one of four distinct states: running, paused, restarting, or exited.
■ The docker exec command can be used to run additional processes inside a running container.
■ A user can pass input or provide additional configuration to a process in a container by specifying environment variables at container-creation time.
■ Using the --read-only flag at container-creation time will mount the container file system as read-only and prevent specialization of the container.
■ A container restart policy, set with the --restart flag at container-creation time, will help your systems automatically recover in the event of a failure.
■ Docker makes cleaning up containers with the docker rm command as simple as creating them
- Programs running inside containers know nothing about image layers. From inside a container, the file system operates as though it’s not running in a container or operat- ing on an image. From the perspective of the container, it has exclusive copies of the files provided by the image. This is made possible with something called a union file system. 
- The file system is used to create mount points on your host’s file system that abstract the use of layers. The layers created are what are bundled into Docker image layers. Likewise, when a Docker image is installed, its layers are unpacked and appro- priately configured for use by the specific file system provider chosen for your system.
The Linux kernel provides a namespace for the MNT system. When Docker creates a container, that new container will have its own MNT namespace, and a new mount point will be created for the container to the image.
- Human Docker users use repository names to communicate which software they would like Docker to install.
■ Docker Hub is the default Docker registry. You can find software on Docker Hub through either the website or the docker command-line program.
■ The docker command-line program makes it simple to install software that’s distributed through alternative registries or in other forms.
■ The image repository specification includes a registry host field.
■ The docker load and docker save commands can be used to load and save
images from TAR archives.
■ Distributing a Dockerfile with a project simplifies image builds on user
machines.
■ Images are usually related to other images in parent/child relationships. These
relationships form layers. When we say that we have installed an image, we are
saying that we have installed a target image and each image layer in its lineage.
■ Structuring images with layers enables layer reuse and saves bandwidth during
distribution and storage space on your computer.