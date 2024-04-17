# findafriend-api

## Executando o projeto

`start:dev`: script para executar o projeto em ambiente local.

```sh
yarn start:dev
```

# Requisitos do projeto:

## Requisitos funcionais:

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível se cadastrar como um usuário normal
- [ ] Deve ser possível realizar login como uma ORG

## Regras de negócio:

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos não funcionias:

- [x] Configurar ESlint + Prettier
- [x] Instalação e configuração do Prisma
- [x] Criar container docker para virtualizar o banco de dados prisma
- [x] Instalação e configuração vitest
- [ ] Configurar a tratativa de .env do projeto com zod.
- [ ] Criar tratativa de erros globais.
