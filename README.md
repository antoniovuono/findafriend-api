# findafriend-api

## Executando o projeto

`start:dev`: script para executar o projeto em ambiente local.

```sh
yarn start:dev
```

## Testes unitários

Para rodar os testes:

```sh
yarn test
```

Para rodar os testes em modo de observação:

```sh
yarn test:watch
```

# Requisitos do projeto:

## Requisitos funcionais:

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível se cadastrar como um usuário normal
- [x] Deve ser possível realizar login como uma ORG

## Regras de negócio:

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos não funcionias:

- [x] Configurar ESlint + Prettier
- [x] Instalação e configuração do Prisma
- [x] Criar container docker para virtualizar o banco de dados prisma
- [x] Instalação e configuração vitest
- [x] Configurar a tratativa de .env do projeto com zod.
- [x] Criar tratativa de erros globais.
