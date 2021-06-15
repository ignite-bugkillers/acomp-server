# Acomp

## Pré-requisitos

Antes de começar você vai precisar das seguintes ferramentas:

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/)
- opcional [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

## Executando o projeto

```bash
# clone o projeto
git clone https://github.com/ignite-bugkillers/acomp-server.git server

# acesse o diretório
cd server

# configure as váriaves de ambiente
cp .env.sample .env

# instalando as dependências
yarn

# execute docker do banco de dados
docker-compose --env-file .env up -d

# rode as 'migrations'
yarn typeorm migrations:run

# execute a aplicação em modo de desenvolvimento
yarn dev
```
