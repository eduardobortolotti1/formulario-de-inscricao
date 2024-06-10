# Site de Formulário usando Node.js, PostgreSQL, Multer, Express e EJS.

## Sobre o Projeto

Este é um projeto de um site de formulário que utiliza Node.js no backend para lidar com requisições, PostgreSQL como banco de dados para armazenamento dos dados dos formulários, Multer para upload de arquivos, Express como framework web, e EJS como engine de templates para renderização das páginas HTML.

O site permite que usuários preencham um formulário com seus dados pessoais e enviem para armazenamento no banco de dados. O projeto também inclui validação e sanitização de dados para garantir a segurança e integridade dos dados armazenados.

O formulário segue as especificações de inscrição do processo de inscrição para o EDITAL Nº 061/ 2023-UEPA.

## Instalação:

Para executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e configurado

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
    ```
2. **Instale as dependências:**
    ```bash
    npm install
    ```
2. **Importe o banco de dados no PostgreSQL:**
Entre no usuário postgres
    ```bash
    psql -U postgres
    ```
    Crie uma database
    ```sql
    CREATE DATABASE form;
    ```
    Importe a database existente para a recém criada
    ```bash
    \c form; #Entre na database criada
    \i C:/diretorio/ate/arquivo/form_database.sql
    ```
    **Não se esqueça de alterar o usuário, senha, porta e host da conexão feita em index.js !**

3. **Execute o servidor**:
    ```bash
    node index.js
    ```
4. **Acesse o site**:
    Abra o navegador e vá para http://localhost:3000/.

### Screenshots
Database Schema
![Database Schema](https://i.ibb.co/QMcfp4z/database-schema.png "Text to show on mouseover")
Adicione aqui screenshots do seu projeto para ilustrar seu funcionamento.

### Créditos

Este projeto foi desenvolvido como parte do curso de Engenharia de Software da Universidade do Estado do Pará (UEPA), como parte do trabalho final da disciplina de Desenvolvimento Web.
