# Site de Formulário usando Node.js, PostgreSQL, Multer, Express e EJS.

## Sobre o Projeto

Este é um projeto de um site de formulário que utiliza Node.js no backend para lidar com requisições, PostgreSQL como banco de dados para armazenamento dos dados dos formulários, Multer para upload de arquivos, Express como framework web, e EJS como engine de templates para renderização das páginas HTML. É utilizado também Bootstrap como framework de CSS.

O site permite que usuários preencham um formulário com seus dados pessoais e enviem para armazenamento no banco de dados. O projeto também inclui validação e sanitização de dados para garantir a segurança e integridade dos dados armazenados.

O formulário segue as especificações de inscrição do processo de inscrição para o EDITAL Nº 061/ 2023-UEPA.

É possível acessar uma versão databaseless do site por este link: [https://formulario-de-inscricao.onrender.com/](https://formulario-de-inscricao.onrender.com/)  

## Instalação

Para executar este projeto localmente, siga os passos abaixo:

### Pré-requisitos

- Yarn instalado
- Node.js instalado
- PostgreSQL instalado e configurado

### Passos (Manual)

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
    yarn install
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
    Saia da CLI do psql (CTRL-C) e importe a database do projeto (form_database.sql) para a recém criada  
    ```bash
    psql -U postgres -d form -f "C:\diretorio\ate\arquivo\form_database.sql"  
    ```
    **Não se esqueça de alterar o usuário, senha, porta e host da conexão feita em index.js !**

5. **Execute o servidor:**
    ```bash
    yarn start
    ```
6. **Acesse o site:**
    Abra o navegador e vá para http://localhost:3000/

### Passos (pgAdmin)  
Muito semelhante ao processo manual, entretanto a database é importada pelo pgAdmin.
1. Crie uma nova database no pgAdmin  
2. Clicando com o botão direito na database recém criada, aperte em "Restore"
3. Procure e selecione o arquivo "form_database.sql" que está dentro da pasta do projeto, e clique em "Restore"

## Screenshots  
Database Schema
![Database Schema](https://i.ibb.co/TtxQQmh/image.png)
Website
![Website screenshot](https://i.ibb.co/D9ZvXq4/Fire-Shot-Capture-002-Formul-rio-UEPA-localhost.png)
![Website screenshot](https://i.ibb.co/PcmJW6w/Fire-Shot-Capture-001-Formul-rio-UEPA-localhost.png)
![Website GIF](https://i.ibb.co/VSX7m25/firefox-J6y-WEyc-K6q.gif)


## Créditos

Este projeto foi desenvolvido como parte do curso de Engenharia de Software da Universidade do Estado do Pará (UEPA), como parte do trabalho final da disciplina de Desenvolvimento Web.
