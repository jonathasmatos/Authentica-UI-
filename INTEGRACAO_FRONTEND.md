# 🌐 Guia de Integração: Authentica Front-end

Este guia contém todas as informações necessárias para conectar o front-end (Vite/React) ao back-end (Spring Boot) em produção.

## 🔗 Informações de Conexão (Produção)
- **Base URL**: `https://authenticaspringboot-production.up.railway.app`
- **Ambiente**: Railway (Cloud)
- **Protocolo**: HTTPS

## 🧪 Usuário de Teste (Admin)
Utilize este usuário para validar fluxos de administrador:
- **E-mail**: `teste@qa.com`
- **Senha**: `senha1213`

## 🔑 Endpoints de Autenticação (`/auth`)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **POST** | `/auth/register` | Cria um novo usuário (Ganha ROLE_ADMIN automaticamente). |
| **POST** | `/auth/authenticate` | Login. Retorna um objeto `{"token": "string"}`. |

## 🛡️ Estrutura do Token JWT
O token deve ser enviado no cabeçalho `Authorization: Bearer <TOKEN>`.
**Claims incluídas:**
- `sub`: E-mail do usuário.
- `roles`: Lista de papéis (ex: `["ADMIN"]`).

## 👨‍💼 Endpoints Administrativos (`/admin`)
*Requerem o header de autorização com um token que possua a role `ADMIN`.*

- `GET /admin/users`: Lista todos os usuários.
- `GET /admin/roles`: Lista papéis.
- `GET /admin/permissions`: Lista permissões.

## ⚠️ Configuração de CORS
O Back-end está configurado para aceitar requisições de:
1. `http://localhost:5173` (Desenvolvimento Vite)
2. `https://authenticaspringboot-production.up.railway.app` (Swagger Production)
3. *Adicionaremos a URL da Vercel assim que o deploy for concluído.*

---
**Dica para o Front-end:** Utilize o arquivo `.env.production` com `VITE_API_URL=https://authenticaspringboot-production.up.railway.app`.
