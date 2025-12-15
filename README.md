# Prolicen - Versão HTML/CSS/JavaScript

Esta é a versão estática do projeto Prolicen, convertida de React para HTML, CSS e JavaScript puro, utilizando Tailwind CSS via CDN.

## 📁 Estrutura de Arquivos

```
html-version/
├── index.html          # Arquivo HTML principal
├── css/
│   └── styles.css     # Estilos customizados
├── js/
│   └── main.js        # JavaScript com funcionalidades
└── images/            # Imagens e assets do projeto
    ├── prolicen-logo.png
    ├── hero-image.jpg
    ├── app-mockup.jpg
    ├── screen-dashboard.png
    ├── screen-processos.png
    ├── screen-relatorios.png
    ├── screen-financeiro.png
    ├── screen-contas.png
    └── screen-login.png
```

## 🚀 Como Usar

### Servidor com Backend (Recomendado - para formulário de contato)

Para usar o formulário de contato com envio de emails:

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure as credenciais de email:**
   - Copie o arquivo `.env.example` para `.env`
   - Edite o arquivo `.env` com suas credenciais reais do Gmail

Para usar Gmail, você precisa:
- Ativar a verificação em duas etapas na sua conta Google
- Gerar uma "Senha de app" em https://myaccount.google.com/apppasswords
- Usar essa senha de app no campo `EMAIL_PASSWORD` do arquivo `.env`

```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

3. **Inicie o servidor:**
```bash
npm start
```

4. **Acesse no navegador:**
```
http://localhost:3000
```

### Opção alternativa: Sem backend (somente visualização)

Se você quiser apenas visualizar o site sem funcionalidade de email:

**Usando Python:**
```bash
python -m http.server 8000
```

**Usando Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Usando PHP:**
```bash
php -S localhost:8000
```

Depois acesse `http://localhost:8000` no navegador.

⚠️ **Nota:** Nesta opção o formulário de contato não enviará emails.

## ✨ Funcionalidades

- ✅ Menu responsivo com versão mobile
- ✅ Navegação suave entre seções
- ✅ Sistema de tabs para screenshots do sistema
- ✅ Animações CSS personalizadas
- ✅ Formulário de contato funcional
- ✅ Design totalmente responsivo
- ✅ Header com efeito sticky
- ✅ Tailwind CSS via CDN (sem necessidade de build)

## 🎨 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos customizados e animações
- **JavaScript (Vanilla)** - Funcionalidades interativas
- **Tailwind CSS** - Framework CSS via CDN
- **Google Fonts** - Fonte Inter

## 📱 Compatibilidade

- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Dispositivos móveis (iOS e Android)

## 🔧 Customização

### Cores

As cores podem ser customizadas no arquivo `css/styles.css` através das variáveis CSS:

```css
:root {
  --primary: 82 52% 55%;
  --secondary: 150 40% 96%;
  --foreground: 150 30% 20%;
  /* ... outras variáveis */
}
```

### Configuração do Tailwind

A configuração do Tailwind CSS está inline no `index.html` dentro da tag `<script>`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(82, 52%, 55%)',
        // ... outras cores
      }
    }
  }
}
```

## 📧 Configuração do Formulário de Contato

O projeto inclui um backend Node.js com Express e Nodemailer para envio de emails através do Gmail.

### Estrutura de Arquivos do Backend

```
├── server.js           # Servidor Express com endpoint de envio
├── package.json        # Dependências do Node.js
├── .env               # Credenciais (NÃO commitar - gitignore)
└── .env.example       # Exemplo de configuração
```

### Configuração do Gmail

1. **Acesse sua conta Google** e vá em "Gerenciar conta do Google"
2. **Segurança** → Ative a "Verificação em duas etapas"
3. **Senhas de app** (https://myaccount.google.com/apppasswords)
4. Selecione "Outro" e dê um nome (ex: "Prolicen")
5. **Copie a senha** gerada (16 caracteres)
6. Cole no arquivo `.env` no campo `EMAIL_PASSWORD`

### Variáveis de Ambiente (.env)

```env
PORT=3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-senha-de-app-aqui
EMAIL_TO=contato@prolicen.com.br
EMAIL_FROM=noreply@prolicen.com.br
```

### API Endpoints

- **POST** `/api/contact` - Recebe dados do formulário e envia email
- **GET** `/api/status` - Verifica status do servidor

### Email Enviado

O email enviado contém:
- Nome do solicitante
- Email para contato
- Telefone
- Empresa (opcional)
- Data/hora da solicitação
- Layout HTML responsivo

## 📝 Notas

- Todas as imagens foram copiadas da pasta `src/assets/` do projeto original
- O projeto usa Tailwind CSS via CDN para evitar a necessidade de um processo de build
- Funcionalidades como React Router foram removidas, sendo uma página única com navegação por âncoras
- O formulário de contato está integrado com backend Node.js para envio real de emails

## 🆚 Diferenças em relação à versão React

- Sem dependências do Node.js
- Sem processo de build necessário
- Todos os componentes foram convertidos para HTML puro
- Estado gerenciado via JavaScript vanilla (sem hooks)
- Roteamento substituído por navegação interna com âncoras

## 📄 Licença

Este projeto é uma conversão da versão React original e mantém a mesma licença do projeto base.