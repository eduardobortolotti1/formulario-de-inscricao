# Site de Formulário usando Node.js, PostgreSQL, Multer, Express e EJS.

## Sobre o Projeto

Este é um projeto de um site de formulário que utiliza Node.js no backend para lidar com requisições, PostgreSQL como banco de dados para armazenamento dos dados dos formulários, Multer para upload de arquivos, Express como framework web, e EJS como engine de templates para renderização das páginas HTML.

O site permite que usuários preencham um formulário com seus dados pessoais e enviem para armazenamento no banco de dados. O projeto também inclui validação e sanitização de dados para garantir a segurança e integridade dos dados armazenados.

O formulário segue as especificações de inscrição do processo de inscrição para o EDITAL Nº 061/ 2023-UEPA.

## Instalação

Para executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e configurado

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/eduardobortolotti1/formulario-de-inscricao
    ```
2. **Vá para o diretório criado:**
    ```bash
   cd formulario-de-inscricao
    ```
3. **Instale as dependências:**
    ```bash
    npm install
    ```
4. **Importe o banco de dados no PostgreSQL:**
    Entre no usuário postgres
    
    **(Lembre-se de adicionar "C:/Program Files/PostgreSQL/[SUA VERSÃO DO POSGRESQL]/bin" para as varíaveis de ambiente do sistema)**
    ```bash
    psql -U postgres
    ```
    Crie uma database
    ```sql
    CREATE DATABASE form;
    ```
    Saia da CLI do psql (CTRL-C) e importe a database existente (form_database.sql) para a recém criada
    ```bash
    psql -U postgres -d form -f "C:/diretorio/ate/arquivo/form_database.sql" #O arquivo está dentro da pasta do projeto
    ```
    **Não se esqueça de alterar o usuário, senha, porta e host da conexão feita em index.js !**

5. **Execute o servidor:**
    ```bash
    node index.js
    ```
6. **Acesse o site:**
    Abra o navegador e vá para http://localhost:3000/

### Screenshots
Database Schema
![Database Schema](https://i.ibb.co/QMcfp4z/database-schema.png "Database Schema")
![Database Schema](https://i.ibb.co/k8bLByn/firefox-Pp-QQ7-EJn-ND.png "Database Schema")
[![Database Schema](https://i.ibb.co/yXPcgPC/firefox-7rh-Xz-YXTv-F.jpg)
[![Database Schema](https://i.ibb.co/KytJczh/firefox-m6fhl-Amyf-Q.png)
Adicione aqui screenshots do seu projeto para ilustrar seu funcionamento.

### Créditos

Este projeto foi desenvolvido como parte do curso de Engenharia de Software da Universidade do Estado do Pará (UEPA), como parte do trabalho final da disciplina de Desenvolvimento Web.
