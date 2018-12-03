# Devf instagram api

### Table of Contents
1. [Preparing the environment](#Pre-requisites)
    1. [Docker](#Docker)
    1. [Docker-compose](#Docker-compose)
2. [Development environment](#Preparing-the-development-environment)

## Pre requisites
### Docker
To install docker in ubuntu 16.04
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-get update

apt-cache policy docker-ce

sudo apt-get install -y docker-ce
```

In case of ubuntu 18.04
```bash
sudo apt-get install -y docker.io
```

### Docker-compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

## Preparing the development environment
To buld the new containers use the following command, the **--build** flag will force the containers to be rebuilt instead of using the previous ones
```bash
docker-compose up --build -d
```

To tear down the currently running containers
```bash
docker-compose down -v
```

Alternatively both commands may be chained should a problem arise with the containers
```bash
docker-compose down -v && docker-compose up --build -d
```