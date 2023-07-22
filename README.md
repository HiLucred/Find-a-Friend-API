# :dog: Find a Friend API :dog:

A "Find a Friend API" se trata de uma API desenvolvida em <i>Node.js</i> com o microframework Fastify, e tem como objetivo distribuir a disponibilidade de pets prontos para serem adotadas. Encontre seu próximo melhor amigo direto na sua cidade ou pelas suas características. A API utiliza o ORM Prisma para interagir com o banco de dados. Os testes ponta a ponta e unitários são realizados com o framework Vitest, e as validações são feitas utilizando o Zod. A API é escrita em TypeScript.


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

![image](https://github.com/HiLucred/Find-a-Friend-API/assets/90939916/71160c7b-161e-49b9-a5b4-058a9ae179e7)

## Certifique-se de ter as seguintes tecnologias instaladas em sua máquina:

    Node.js
    npm (gerenciador de pacotes do Node.js)

## Inicialização :triangular_flag_on_post:

    Clone este repositório: git clone https://github.com/HiLucred/Find-a-Friend-API

    Navegue até o diretório do projeto: cd find-a-friend-api

    Instale as dependências do projeto: npm install

    Inicie o servidor de desenvolvimento: npm start:dev


A API será iniciada e estará disponível em http://localhost:3333 por padrão.

## Rotas :round_pushpin:
No Insomnia, utilize a rota http://localhost:3333 e teste as rotas disponíveis na API.

Cria uma nova org

    POST /orgs 
Faz a autenticação de uma org

    POST /sessions/
Registra um novo pet
 
    POST /pets/register
Retorna todos os dados de um pet

    GET /pets/:petId
Busca pets por características

    POST /pets/characteristics
Busca pets que se encontram na cidade
  
    GET /pets/city/:city

## Testes :round_pushpin:

Para executar os testes unitários, certifique-se de ter as dependências instaladas e execute o seguinte comando:

    npm run test

Para executar os testes E2E, certifique-se de ter as dependências instaladas e execute o seguinte comando:

    npm run test:e2e



Tecnologias utilizadas :computer:

    Node.js
    TypeScript
    Fastify
    Prisma
    Zod
    Vitest
    tsup
    Dotenv
