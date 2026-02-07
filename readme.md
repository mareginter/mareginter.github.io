# 🎓 Academia Anti-Phishing Elite | Mareginter

Sistema completo de formação em segurança digital contra phishing, com sistema de chaves de ativação.

## 🚀 Funcionalidades Principais

- ✅ **Sistema de Login** (Colaborador/Administrador)
- ✅ **5 Módulos de Formação** + 3 Módulos Premium
- ✅ **Simulador de Phishing** com emails reais
- ✅ **Sistema de Conquistas e Badges**
- ✅ **Biblioteca de Recursos**
- ✅ **Certificado Profissional**
- ✅ **Painel de Administração Completo**
- ✅ **Sistema de Chaves de Ativação** 🔑
- ✅ **Integração com Firebase**

## 🔑 Sistema de Chaves de Ativação

### Tipos de Chaves:
- **Básica**: Acesso completo aos módulos básicos
- **Premium**: Acesso a módulos premium também
- **Elite**: Acesso total a todo o conteúdo

### Como usar:
1. **Administrador** gera chaves no painel admin
2. **Colaborador** insere a chave no login
3. **Sistema verifica** a validade da chave
4. **Conteúdo é liberado** conforme tipo de chave

### Chaves de teste:
- `TEST-1234` (básica)
- `BASIC-2024-DEF456` (básica)
- `PREMIUM-XYZ789` (premium)
- `ELITE-2024-ABC123` (elite)

## 🔧 Tecnologias Utilizadas

- HTML5, CSS3, JavaScript
- Firebase Realtime Database
- Canvas API (para certificados)
- LocalStorage (fallback)

## 📁 Estrutura do Projeto
academia-anti-phishing/
├── index.html # Página principal
├── style.css # Estilos CSS
├── script.js # Lógica JavaScript completa
├── README.md # Documentação (este arquivo)
└── .gitignore # Arquivos ignorados no Git


## ⚡ Como Executar

1. Clone o repositório
2. Abra `index.html` em qualquer navegador moderno
3. Use as credenciais de teste ou crie uma nova conta admin

### Login Admin de Teste:
- **Email**: admin@test.com
- **Senha**: 123456
- **Nome**: Admin Test
- **Empresa**: Empresa Teste

## 🎯 Configuração Firebase

Para usar com seu próprio Firebase:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative **Realtime Database** e **Authentication**
3. Substitua as configurações no arquivo `script.js`:

```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};