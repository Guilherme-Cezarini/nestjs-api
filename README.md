# 🚀 NestJS API com PostgreSQL e RabbitMQ

Este projeto é uma API construída com [NestJS](https://nestjs.com/) que utiliza [PostgreSQL](https://www.postgresql.org/) para persistência de dados e [RabbitMQ](https://www.rabbitmq.com/) para mensageria. A aplicação conta com autenticação via JWT e três CRUDs para gerenciar empresas (companies), usuários (users) e campanhas (campaigns). 

## 🏗 Arquitetura
- **PostgreSQL**: Banco de dados relacional para armazenar as entidades.
- **RabbitMQ**: Serviço de mensageria para comunicação assíncrona.
- **Docker Compose**: Orquestração dos serviços PostgreSQL e RabbitMQ.
- **JWT**: Utilizado para autenticação e autorização.

## 📦 Instalação e Configuração

### Pré-requisitos
Certifique-se de ter os seguintes softwares instalados:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passo 1: Clonar o repositório
```sh
git clone git@github.com:Guilherme-Cezarini/nestjs-api.git
cd nestjs-api
```

### Passo 2: Configurar variáveis de ambiente
O projeto já contém um arquivo `.env.example` na raiz como referência. Copie-o e ajuste conforme necessário:
```sh
cp .env.example .env
```

### Passo 3: Subir os serviços com Docker

```sh
docker-compose up -d
```

Isso iniciará o PostgreSQL e o RabbitMQ.

### Passo 4: Instalar dependências
```sh
npm install
```

### Passo 5: Iniciar a aplicação
```sh
npm run start:dev
```
A API estará disponível em `http://localhost:3000`.

## 🔑 Autenticação e Fluxo de Uso

1. Criar uma **Company**
2. Criar um **User** associado à empresa
3. Fazer login para obter o token JWT
4. Usar o token JWT para acessar os **Campaigns**

## 📌 Documentação da API
Para mais detalhes sobre os endpoints, acesse a documentação completa no Postman:
👉 [Documentação da API](https://documenter.getpostman.com/view/8974964/2sAYdkGoTG)

## 🛠 Tecnologias Utilizadas
- **[NestJS](https://nestjs.com/)** - Framework para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[RabbitMQ](https://www.rabbitmq.com/)** - Sistema de mensageria
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript
- **[JWT](https://jwt.io/)** - Autenticação segura
- **[Docker](https://www.docker.com/)** - Containerização


