# Vue APP and Jenkins Kubernetes Plugin Pipeline

## Vue

This project contains a sample app, with two components and two suites of unit tests in order to be deployed on a Kubernetes Cluster through a Jenkins pipeline. This project is a complement of other three repositories on this Github account: [rds-serverless-secrets-manager](https://github.com/JDavidGuzman/rds-serverles-secrets-manager), [db-school](https://github.com/JDavidGuzman/db-school) and [sam-python-rdsdata](https://github.com/JDavidGuzman/sam-python-rdsdata). Through the user interface, it makes calls to an API that retrieves data from a database and presents it as tables defined on CSS. In order to do that the user has to select on the menu the name of a school, then the name of a course, and it will receive a list of the students on that course. Users will be able to scroll through the student's list and click on any of them to view the grades of each student.  

On the .env files, it is included also an environment variable that refers to the link of the API created on AWS.

It is also included a configuration to perform unit tests with Jest, and some unit test samples that are no real tests, but were written to mock them as a new stage on the Jenkins pipeline.


## Jenkinsfile

Jenkinsfile declares a pipeline that will deploy a Jenkins slave on a Kubernetes pod that will perform the stipulated stages on it. This pod in addition to the jnlp image that allows communications between Jenkins master and slave on port 50000; includes the declared pod manifest on `podTemplate.yml`. This file declares a pod with the following containers:

* node: using the node:lts-alpine image; to perform nodejs tasks
* kubectl: using an basic alpine image; which as declared on the pipeline it will install kubectl; to allow communication with apiserver it will mount Kubernetes config file as secret volume

### On development branch:
* docker: using docker:1.12.6  image, it will perform docker commands; it will communicate with docker daemon using DOCKER_HOST environment variable
* dind-daemon: using docker:1.12.6-dind, it will mount an emptyDir volume on /var/lib/docker to provide persistence and an available docker service to be used by docker's container commands.

The secret name declared is specific for the Kubernetes cluster that I've used, so it should be changed accordingly.

# Kaniko 

### On master branch:
* kaniko: instead of docker, here we can use gcr.io/kaniko-project/executor:debug, a kaniko image that allows commands. Kaniko is a best solution for building and pushing image in kubernetes without using the docker service.

The secret volume mounted by kaniko container, is a secret of type kubernetes.io/dockerconfigjson; which use the same format as /.docker/config.json credentials for docker repositories. 