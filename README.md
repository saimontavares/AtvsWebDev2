# Loja Virtual - Projeto PW2

Aplicação web de e-commerce desenvolvida com Next.js (frontend) e Express + Prisma (backend). Permite cadastro e login de usuários, listagem de produtos, carrinho de compras persistente (localStorage para visitantes, banco de dados para usuários logados), e gerenciamento de produtos restrito a administradores.

---

## Passo a Passo para Rodar o Projeto

### 1. Criar os arquivos `.env`

Copie os arquivos de exemplo e ajuste conforme necessário:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edite os arquivos `.env` com os valores apropriados (senhas, URLs, etc.).

### 2. Subir os containers Docker

```bash
docker compose up -d
```

### 3. Instalar dependências e configurar o backend

```bash
cd backend
npm i
npm run prisma -- migrate dev --name "init"
npm run seed
cd ..
```

### 4. Instalar dependências do frontend

```bash
cd frontend
npm i
cd ..
```

### 5. Criar um usuário de teste

```bash
curl -i -X POST 'http://localhost:7788/auth/signup' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Usuario Teste","email":"teste@example.com","password":"Senha123"}'
```

### 6. Promover usuário para admin (via phpMyAdmin)

1. Acesse o phpMyAdmin: [http://localhost:8282](http://localhost:8282)
2. Selecione o banco de dados `loja`
3. Abra a tabela `User`
4. Encontre o usuário criado e altere o campo `typeId` de `2` (client) para `1` (admin)
5. Clique em "Executar" para salvar

### 7. Acessar a aplicação

- **Frontend**: [http://localhost:8888](http://localhost:8888)
- **Backend API**: [http://localhost:7788](http://localhost:7788)
- **phpMyAdmin**: [http://localhost:8282](http://localhost:8282)

---

## Tipos de Usuário

| typeId | Tipo   | Permissões |
|--------|--------|------------|
| 1      | admin  | Criar, editar e excluir produtos |
| 2      | client | Visualizar produtos e usar carrinho |

---

## Estrutura do Projeto

```
├── backend/          # API Express + Prisma
├── frontend/         # Next.js App
├── compose.yml       # Docker Compose
├── .env.example      # Variáveis de ambiente (raiz)
└── README.md
```
