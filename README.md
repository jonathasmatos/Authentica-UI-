# 🎨 Authentica UI

O **Authentica UI** é o frontend oficial do ecossistema Authentica, desenvolvido para oferecer uma interface moderna, segura e altamente performática para o gerenciamento de identidades e acessos (IAM). 

Este projeto foi construído como um laboratório prático para estudos de **Segurança em APIs**, **Clean Architecture** e **Automação de Testes (QA)**.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza o que há de mais moderno no ecossistema React:

-   **React 19**: A versão mais recente para máxima performance.
-   **Vite 7**: Ferramenta de build ultra-rápida.
-   **Framer Motion**: Animações fluidas e interações premium.
-   **Lucide React**: Conjunto de ícones consistentes e otimizados.
-   **Axios**: Gerenciamento de requisições HTTP e interceptores de segurança.
-   **React Router 7**: Gerenciamento de rotas com suporte a layouts e rotas privadas.

---

## ✨ Funcionalidades Principais

-   **Autenticação JWT**: Fluxo completo de login com persistência segura do token.
-   **Dashboard Dinâmico**: Visualização de métricas e estado do sistema.
-   **Painel de Administração (RBAC)**:
    -   Gestão de Usuários (Criar, Listar, Inativar).
    -   Gestão de Cargos (Roles) e Atribuições.
    -   Gestão de Permissões granulares de acesso.
-   **Segurança UX**: Alternância de visibilidade de senha, tratamento inteligente de erros (401/403) e carregamento visual (spinners/toasts).
-   **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela com estética *Glassmorphism*.

---

## 🧪 Laboratório para QA e Automação

O Authentica UI foi desenhado para facilitar a prática de testes:

-   **IDs Únicos**: Elementos críticos possuem identificadores para fácil automação com **Playwright**, **Cypress** ou **Selenium**.
-   **Cenários Reais**: Simulação de erros de autorização e fluxos complexos de permissões.
-   **Ambiente de Produção**: O frontend está integrado a uma API real hospedada no Railway.

---

## 🛠️ Guia de Instalação e Execução

### Pré-requisitos
-   Node.js (v18+)
-   npm ou yarn

### Passo a Passo
1.  **Clone o Repositório**:
    ```bash
    git clone https://github.com/jonathasmatos/Authentica-UI-.git
    cd Authentica-UI-
    ```
2.  **Instale as Dependências**:
    ```bash
    npm install
    ```
3.  **Configuração de Ambiente**:
    O projeto utiliza o arquivo `.env.production` por padrão para conectar-se à API em produção. Se desejar rodar localmente com sua própria API:
    - Crie um arquivo `.env.local`
    - Adicione: `VITE_API_URL=http://localhost:8080`

4.  **Execute o Projeto**:
    ```bash
    npm run dev
    ```

---

## 🌐 Integração com Ecossistema

-   **App Live**: [https://authentica-ui.vercel.app](https://authentica-ui.vercel.app)
-   **API (Backend)**: [GitHub Authentica](https://github.com/jonathasmatos/Authentica)
-   **Documentação API**: [Swagger UI](https://authenticaspringboot-production.up.railway.app/swagger-ui.html)

---

## 🔑 Acesso de Teste (Default)

Use as seguintes credenciais para explorar as funções administrativas:
-   **E-mail**: `teste@qa.com`
-   **Senha**: `senha1213`

---

## 📄 Licença

Este projeto é **Open Source** e serve como ferramenta de estudo para a comunidade. Sinta-se à vontade para contribuir!

Desenvolvido por **Jonathas Matos**. 🏁✨
