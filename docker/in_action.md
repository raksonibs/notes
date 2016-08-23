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

- A host or container’s directory tree is created by a set of mount points that describe how to piece together one or more file systems. A volume is a mount point on the con- tainer’s directory tree where a portion of the host directory tree has been mounted. Most people are only minimally familiar with file systems and mount points and rarely customize them. 
- images are appropriate for packaging and distributing rel- atively static files like programs; volumes hold dynamic data or specializations. This distinction makes images reusable and data simple to share. This separation of rela- tively static and dynamic file space allows application or image authors to implement advanced patterns such as polymorphic and composable tools.
-  The value of a database is defined by the data it con- tains. A database program always presents the same interface but takes on a wholly different value depending on the data that can be injected with a volume. The poly- morphic container pattern
- More fundamentally, volumes enable the separation of application and host con- cerns. At some point an image will be loaded onto a host and a container created from it. Docker knows little about the host where it’s running and can only make assertions about what files should be available to a container. That means Docker alone has no way to take advantage of host-specific facilities like mounted network storage or mixed spin- ning and solid-state hard drives. But a user with knowledge of the host can use volumes to map directories in a container to appropriate storage on that host.
- 
There are two types of volume. Every volume is a mount point on the container direc- tory tree to a location on the host directory tree, but the types differ in where that location is on the host. The first type of volume is a bind mount. Bind mount volumes use any user-specified directory or file on the host operating system. The second type is a managed volume. Managed volumes use locations that are created by the Docker daemon in space controlled by the daemon, called Docker managed space. 
- you used the -v option and a location map to create the bind mount volume. The map is delimited with a colon (as is common with Linux-style command-line tools). The map key (the path before the colon) is the absolute path of a location on the host file system, and the value (the path after the colon) is the loca- tion where it should be mounted inside the container. You must specify locations with absolute paths.
- Managed volumes are different from bind mount volumes because the Docker dae- mon creates managed volumes in a portion of the host’s file system that’s owned by Docker, as shown in figure 4.5. Using managed volumes is a method of decoupling volumes from specialized locations on the file system.
- The flag --volumes-from can be set multiple times to specify multiple source containers.
- uppose you wanted to update your database software (use a new image). If your database container writes its state to a volume and that volume was defined by a vol- ume container, the migration would be as simple as shutting down the original data- base container and starting the new one with the volume container as a volume source. Backup and restore operations could be handled similarly. This, of course, assumes that the new database software is able to read the storage format of the old software, and it looks for the data at the same location.
- 
Volume containers are most useful when you control and are able to standardize on mount point naming conventions.
- ■ Volumes allow containers to share files with the host or other containers.
■ Volumes are parts of the host file system that Docker mounts into containers at
specified locations.
■ There are two types of volumes: Docker-managed volumes that are located in
the Docker part of the host file system and bind mount volumes that are located
anywhere on the host file system.
■ Volumes have life cycles that are independent of any specific container, but a
user can only reference Docker-managed volumes with a container handle.
The orphan volume problem can make disk space difficult to recover. Use the -v option on docker rm to avoid the problem.
The volume container pattern is useful for keeping your volumes organized and avoiding the orphan volume problem.
The data-packed volume container pattern is useful for distributing static con- tent for other containers.
The polymorphic container pattern is a way to compose minimal functional components and maximize reuse.
- these images include multiple ONBUILD triggers, which should be all you need to bootstrap most applications. The build will COPY a requirements.txt file, RUN pip install on said file, and then copy the current directory into /usr/src/app.
- In other words, the onbuild version of the image includes helpers that automate the boring parts of getting an app running. Rather than doing these tasks manually (or scripting these tasks), these images do that work for you. We now have all the ingredients to create our own image - a functioning web app and a base image. How are we going to do that? The answer is - using a Dockerfile.
-The bridge network is the network in which containers are run by default. So that means that when I ran the ES container, it was running in this bridge network.
- 