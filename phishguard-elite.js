// ==================== PHISHGUARD ELITE - JAVASCRIPT ====================
// Versão Final CORRIGIDA - 14 Fevereiro 2026

// ==================== FIREBASE CONFIGURATION ====================
const firebaseConfig = {
    apiKey: "AIzaSyDe4b9NpoVMWZPqs7JQC9w6gVdU1XGAUh0",
    authDomain: "digital-security-excellence.firebaseapp.com",
    databaseURL: "https://digital-security-excellence-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "digital-security-excellence",
    storageBucket: "digital-security-excellence.firebasestorage.app",
    messagingSenderId: "923777170542",
    appId: "1:923777170542:web:5a37f1f45eaa0904e9ba7f",
    measurementId: "G-MDRR1704B8"
};

// Initialize Firebase
let database;
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    database = firebase.database();
    console.log('Firebase inicializado com sucesso');
} catch (error) {
    console.error('Erro ao inicializar Firebase:', error);
    database = {
        ref: () => ({
            once: () => Promise.resolve({ exists: () => false, val: () => null }),
            set: () => Promise.resolve(),
            update: () => Promise.resolve()
        })
    };
}

// ==================== MASTER KEY SYSTEM ====================
const MASTER_KEY = 'PHISHGUARD-MASTER-2026-SECRET';

let masterAdmins = [];

function isMasterAdmin(email) {
    return masterAdmins.includes(email);
}

async function initMasterAdmin() {
    try {
        const snapshot = await database.ref('masters/admin').once('value');
        if (!snapshot.exists()) {
            const masterEmail = 'master@phishguard.pt';
            const masterPassword = 'Master@2026';
            
            await database.ref('masters/admin').set({
                email: masterEmail,
                password: masterPassword,
                createdAt: new Date().toISOString(),
                isMaster: true
            });
            
            masterAdmins.push(masterEmail);
            console.log('✅ Master admin criado');
        } else {
            const masterData = snapshot.val();
            masterAdmins.push(masterData.email);
            console.log('✅ Master admin já existe');
        }
    } catch (error) {
        console.error('Erro ao inicializar master admin:', error);
    }
}

initMasterAdmin();

// ==================== GLOBAL STATE ====================
let USER = {
    id: '', name: '', email: '', isAdmin: false, isMaster: false,
    companyCode: '', xp: 0, scores: {}, badges: [], 
    completedModules: [], simulationsCompleted: [], simulationScore: 0,
    startDate: null, lastActivity: null, hasSeenWelcome: false,
    activationKey: '', keyType: 'basic', advancedUnlocked: false,
    showedCompletionPopup: false
};

let COMPANY = {
    code: '', name: '', adminEmail: '', adminName: '', 
    licenseQuota: 10, usedLicenses: 0, createdAt: null,
    expiresAt: null, isActive: true,
    settings: { 
        minCertificateScore: 80, 
        mandatoryModules: ['mod1', 'mod2', 'mod3'],
        allowCustomBranding: false,
        require2FA: false
    }
};

// ==================== MÓDULOS DE FORMAÇÃO ====================
const MODULES = [
    {
        id: 'mod1',
        title: 'Introdução ao Phishing',
        description: 'Aprenda o que é phishing e como identificar tentativas de ataque.',
        difficulty: 'beginner',
        xp: 100,
        content: `
            <h3>O que é Phishing?</h3>
            <p>Phishing é uma técnica de fraude online onde os atacantes se fazem passar por entidades legítimas para roubar informações confidenciais.</p>
            
            <h3 style="margin-top: 1.5rem;">Como Funciona?</h3>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li>Emails ou mensagens falsificadas que parecem vir de fontes confiáveis</li>
                <li>Links para websites fraudulentos que imitam sites legítimos</li>
                <li>Pedidos urgentes de informação pessoal ou financeira</li>
                <li>Anexos maliciosos que instalam software prejudicial</li>
            </ul>

            <h3 style="margin-top: 1.5rem;">Tipos Comuns de Phishing:</h3>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li><strong>Email Phishing:</strong> Emails em massa enviados para milhares de pessoas</li>
                <li><strong>Spear Phishing:</strong> Ataques direcionados a indivíduos específicos</li>
                <li><strong>Whaling:</strong> Ataques direcionados a executivos de alto nível</li>
                <li><strong>Smishing:</strong> Phishing via SMS</li>
                <li><strong>Vishing:</strong> Phishing por chamada telefónica</li>
            </ul>
        `,
        quiz: [
            { q: 'O que é phishing?', opts: ['Um tipo de vírus', 'Técnica de fraude para roubar informações', 'Um programa de proteção', 'Um tipo de email marketing'], correct: 1 },
            { q: 'Qual destes NÃO é um sinal típico de phishing?', opts: ['Erros ortográficos', 'Pedidos urgentes', 'Endereço de email oficial da empresa', 'Links suspeitos'], correct: 2 },
            { q: 'O que é "spear phishing"?', opts: ['Phishing por voz', 'Ataques direcionados a alvos específicos', 'Phishing em redes sociais', 'Phishing com anexos'], correct: 1 },
            { q: 'Qual a melhor forma de verificar se um email é legítimo?', opts: ['Clicar no link', 'Responder ao email', 'Contactar a empresa por canais oficiais', 'Verificar se tem imagens'], correct: 2 },
            { q: 'O que deve fazer ao receber um email suspeito?', opts: ['Apagar sem ler', 'Reportar como spam e não clicar em links', 'Encaminhar para colegas', 'Responder pedindo informações'], correct: 1 }
        ]
    },
    {
        id: 'mod2',
        title: 'Identificar Emails Suspeitos',
        description: 'Desenvolva competências para detetar emails fraudulentos.',
        difficulty: 'beginner',
        xp: 120,
        content: `
            <h3>Sinais de Alerta em Emails</h3>
            <p>Aprenda a identificar os principais indicadores de emails de phishing.</p>
            
            <h4 style="margin-top: 1.5rem;">1. Remetente Suspeito</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Endereço de email que não corresponde ao domínio oficial</li>
                <li>Pequenas alterações no domínio (ex: paypa1.com)</li>
                <li>Uso de serviços de email gratuitos para comunicações oficiais</li>
            </ul>

            <h4 style="margin-top: 1rem;">2. Linguagem e Tom</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Saudações genéricas ("Prezado cliente")</li>
                <li>Erros ortográficos e gramaticais</li>
                <li>Tom urgente ou ameaçador</li>
                <li>Promessas irrealistas</li>
            </ul>

            <h4 style="margin-top: 1rem;">3. Links e Anexos</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Links que não correspondem ao texto</li>
                <li>URLs encurtados suspeitos</li>
                <li>Anexos inesperados (.exe, .zip)</li>
            </ul>
        `,
        quiz: [
            { q: 'Qual destes endereços é mais suspeito?', opts: ['suporte@bancoportugal.pt', 'noreply@banco-p0rtugal.com', 'atendimento@banco.pt', 'servicos@instituicao.pt'], correct: 1 },
            { q: 'Um email começa com "Prezado utilizador". Isto é:', opts: ['Normal', 'Sinal de phishing', 'Usado por bancos', 'Forma correta'], correct: 1 },
            { q: 'Como verificar para onde um link aponta?', opts: ['Clicar', 'Passar o rato por cima', 'Copiar', 'Passar rato ou copiar sem clicar'], correct: 3 },
            { q: 'Email urgente: "conta será suspensa". O que faz?', opts: ['Clica imediatamente', 'Entra em pânico', 'Contacta empresa por canais oficiais', 'Ignora'], correct: 2 },
            { q: 'Qual anexo é mais perigoso?', opts: ['documento.pdf', 'fatura.jpg', 'atualizacao.exe', 'relatorio.docx'], correct: 2 }
        ]
    },
    {
        id: 'mod3',
        title: 'Segurança de Palavras-passe',
        description: 'Crie e gerencie palavras-passe seguras eficazmente.',
        difficulty: 'beginner',
        xp: 130,
        content: `
            <h3>Importância das Palavras-passe Fortes</h3>
            <p>Uma palavra-passe forte é a primeira linha de defesa contra acessos não autorizados.</p>
            
            <h4 style="margin-top: 1.5rem;">Características de uma Palavra-passe Forte:</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Pelo menos 12 caracteres de comprimento</li>
                <li>Combinação de letras maiúsculas e minúsculas</li>
                <li>Inclusão de números</li>
                <li>Uso de caracteres especiais (@, #, $, etc.)</li>
                <li>Não contém informações pessoais óbvias</li>
                <li>Não é uma palavra do dicionário</li>
            </ul>

            <h4 style="margin-top: 1.5rem;">Melhores Práticas:</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Use uma palavra-passe diferente para cada conta</li>
                <li>Utilize um gestor de palavras-passe</li>
                <li>Ative autenticação de dois fatores (2FA)</li>
                <li>Mude palavras-passe periodicamente</li>
                <li>Nunca partilhe as suas palavras-passe</li>
            </ul>
        `,
        quiz: [
            { q: 'Qual é a palavra-passe mais segura?', opts: ['password123', 'JoaoSilva2024', 'Tr0c@rS3nh@Cad@3M!', 'qwerty'], correct: 2 },
            { q: 'Com que frequência mudar palavras-passe?', opts: ['Todos os dias', 'Periodicamente, após violações', 'Nunca', 'Só quando esquece'], correct: 1 },
            { q: 'O que é autenticação 2FA?', opts: ['Duas palavras-passe', 'Camada adicional de segurança', 'Login duplo', 'Duas contas'], correct: 1 },
            { q: 'Usar mesma palavra-passe em várias contas?', opts: ['Sim, se forte', 'Sim, mais fácil', 'Não, cada conta única', 'Só não importantes'], correct: 2 },
            { q: 'Melhor forma de gerir múltiplas palavras-passe?', opts: ['Papel', 'Ficheiro texto', 'Gestor encriptado', 'Mesma sempre'], correct: 2 }
        ]
    },
    {
        id: 'mod4',
        title: 'Reconhecer URLs Fraudulentos',
        description: 'Aprenda a identificar websites falsos e links maliciosos.',
        difficulty: 'intermediate',
        xp: 150,
        content: `
            <h3>Anatomia de um URL</h3>
            <p>Compreender a estrutura de um URL é essencial:</p>
            <code style="background: rgba(255,255,255,0.1); padding: 0.5rem; border-radius: 4px; display: block; margin: 1rem 0;">
            https://www.exemplo.pt/pagina?parametro=valor
            </code>
            
            <h4 style="margin-top: 1.5rem;">Componentes Importantes:</h4>
            <ul style="margin-left: 1.5rem;">
                <li><strong>Protocolo:</strong> https:// (seguro) vs http://</li>
                <li><strong>Domínio:</strong> exemplo.pt (parte mais importante)</li>
                <li><strong>TLD:</strong> .pt, .com, .org</li>
            </ul>

            <h4 style="margin-top: 1.5rem;">Técnicas de Fraude:</h4>
            <ul style="margin-left: 1.5rem;">
                <li><strong>Typosquatting:</strong> paypa1.com (1 em vez de l)</li>
                <li><strong>Subdomínios enganadores:</strong> paypal.fraude.com</li>
                <li><strong>URLs longos:</strong> para esconder domínio real</li>
            </ul>

            <h4 style="margin-top: 1.5rem;">Verificações:</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Verifique o cadeado HTTPS</li>
                <li>Leia o URL completo da direita para esquerda</li>
                <li>Desconfie de URLs encurtados</li>
                <li>Digite URLs manualmente para sites importantes</li>
            </ul>
        `,
        quiz: [
            { q: 'Qual URL é mais suspeito?', opts: ['https://bancoportugal.pt', 'https://bancoportugal.com-verificacao.tk', 'https://online.bancoportugal.pt', 'https://bancoportugal.pt/login'], correct: 1 },
            { q: 'O que indica "https://"?', opts: ['100% seguro', 'Ligação encriptada', 'Site governamental', 'Nada especial'], correct: 1 },
            { q: 'Em "login.exemplo.com.site-falso.com", qual o domínio real?', opts: ['login.exemplo.com', 'exemplo.com', 'site-falso.com', 'com'], correct: 2 },
            { q: 'Por que atacantes usam URLs encurtados?', opts: ['Economizar espaço', 'Esconder destino real', 'Links bonitos', 'Melhorar SEO'], correct: 1 },
            { q: 'O que é "typosquatting"?', opts: ['Tipo de vírus', 'Domínios com erros ortográficos', 'Proteção de sites', 'Método encriptação'], correct: 1 }
        ]
    },
    {
        id: 'mod5',
        title: 'Proteção em Redes Sociais',
        description: 'Proteja-se de ataques através de redes sociais.',
        difficulty: 'intermediate',
        xp: 140,
        content: `
            <h3>Phishing nas Redes Sociais</h3>
            <p>As redes sociais são alvos populares devido à quantidade de informação pessoal partilhada.</p>
            
            <h4 style="margin-top: 1.5rem;">Técnicas Comuns:</h4>
            <ul style="margin-left: 1.5rem;">
                <li><strong>Perfis Falsos:</strong> Imitam amigos ou marcas</li>
                <li><strong>Mensagens Maliciosas:</strong> "És tu neste vídeo?"</li>
                <li><strong>Concursos Falsos:</strong> "Ganhou um prémio!"</li>
                <li><strong>Apps Maliciosas:</strong> Quizzes com permissões excessivas</li>
            </ul>

            <h4 style="margin-top: 1.5rem;">Proteção de Privacidade:</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Limite quem pode ver publicações</li>
                <li>Não partilhe informações sensíveis publicamente</li>
                <li>Verifique configurações regularmente</li>
                <li>Cuidado com quizzes</li>
                <li>Ative 2FA</li>
            </ul>
        `,
        quiz: [
            { q: 'Mensagem de "amigo" com link "És tu neste vídeo?". O que faz?', opts: ['Clica imediatamente', 'Contacta amigo por outro meio', 'Partilha', 'Clica sem inserir dados'], correct: 1 },
            { q: 'Quiz pede acesso a email e amigos. Isto é:', opts: ['Normal', 'Suspeito e malicioso', 'Necessário', 'Formalidade'], correct: 1 },
            { q: 'Melhor prática para privacidade?', opts: ['Tudo público', 'Apenas amigos verem', 'Nunca verificar', 'Confiar padrão'], correct: 1 },
            { q: 'Como identificar perfil falso?', opts: ['Tem foto', 'Muitos seguidores', 'Recente, poucas conexões, pouca atividade', 'Nome verdadeiro'], correct: 2 },
            { q: 'Não partilhar publicamente:', opts: ['Fotos paisagens', 'Data nascimento, morada, telefone', 'Opiniões filmes', 'Receitas'], correct: 1 }
        ]
    },
    {
        id: 'mod6',
        title: 'Histórias Reais de Phishing em Portugal',
        description: '6 casos reais documentados pelas autoridades portuguesas.',
        difficulty: 'intermediate',
        xp: 300,
        icon: '📋',
        content: `
            <div style="margin-bottom: 2rem;">
                <h3>📊 Estatísticas Reais em Portugal</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0;">
                    <div style="background: var(--primary-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; color: var(--primary-600);">6</div>
                        <div style="font-size: 0.875rem;">Casos Documentados</div>
                    </div>
                    <div style="background: var(--primary-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; color: var(--primary-600);">+1M€</div>
                        <div style="font-size: 0.875rem;">Prejuízo Total</div>
                    </div>
                    <div style="background: var(--primary-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; color: var(--primary-600);">80+</div>
                        <div style="font-size: 0.875rem;">Detidos pela PJ</div>
                    </div>
                </div>
                
                <div class="alert alert-info">
                    <strong>🎯 Objetivo deste módulo:</strong> Desenvolver intuição e capacidade de identificar padrões de ataque através de experiências reais em Portugal.
                </div>
            </div>
        `,
        stories: [
            {
                id: 'story1',
                titulo: 'Operação e-Phishing',
                entidade: 'Polícia Judiciária',
                data: 'Junho 2024',
                local: 'Porto',
                vitima: 'Várias empresas',
                cenario: 'A PJ deteve 13 elementos de um grupo organizado especializado em phishing e CEO Fraud, com prejuízos superiores a 1 milhão de euros.',
                ataque: 'Os criminosos utilizavam técnicas de phishing para aceder a contas bancárias de empresas portuguesas.',
                erro: 'Falta de verificação de pedidos financeiros e ausência de autenticação multifator.',
                licao: 'Empresas devem implementar autenticação multifator e formação regular.',
                prevencao: 'Implementar regras de dupla verificação para transferências e usar 2FA.',
                frase: '"Pensávamos que era seguro porque o email parecia legítimo."',
                consequencia: '13 detidos, 7 em prisão preventiva, 23 buscas. Prejuízo superior a 1 milhão de euros.',
                fonte: 'Polícia Judiciária'
            },
            {
                id: 'story2',
                titulo: 'Operação "Fora da Caixa"',
                entidade: 'Polícia Judiciária',
                data: 'Novembro 2024',
                local: 'Lisboa/Porto',
                vitima: 'Empresa nacional',
                cenario: 'Empresa perdeu 125 mil euros em golpe de phishing bancário.',
                ataque: 'Criaram site falso do banco e contactaram a empresa como falsos funcionários.',
                erro: 'Confiar em contacto telefónico não solicitado do "banco".',
                licao: 'Desconfiar sempre de contactos inesperados do banco.',
                prevencao: 'Nunca realizar transferências com base em contactos não solicitados.',
                frase: '"Eram tão convincentes... Sabiam tudo sobre nós."',
                consequencia: 'Três detidos, 10 buscas, prejuízo de 125.000€.',
                fonte: 'Correio da Manhã / PJ'
            }
        ],
        quiz: [
            {
                q: 'Qual é a principal lição da Operação e-Phishing?',
                opts: [
                    'Usar sempre a mesma palavra-passe',
                    'Implementar autenticação multifator',
                    'Confiar em todos os emails',
                    'Nunca usar bancos online'
                ],
                correct: 1
            }
        ]
    }
];

// ==================== MÓDULOS AVANÇADOS ====================
const ADVANCED_MODULES = [
    {
        id: 'adv1',
        title: 'Análise Forense de Emails',
        description: 'Técnicas avançadas para analisar cabeçalhos de email.',
        difficulty: 'advanced',
        xp: 250,
        content: `
            <h3>Análise de Cabeçalhos de Email</h3>
            <p>Os cabeçalhos de email contêm informação valiosa sobre a origem real de uma mensagem.</p>
        `,
        quiz: [
            { q: 'Qual campo mostra o caminho do email?', opts: ['From', 'Received', 'Return-Path', 'DKIM'], correct: 1 }
        ]
    },
    {
        id: 'adv2',
        title: 'Engenharia Social Avançada',
        description: 'Técnicas psicológicas usadas por atacantes.',
        difficulty: 'advanced',
        xp: 250,
        content: `<h3>Psicologia do Engano</h3><p>Os atacantes exploram vieses cognitivos.</p>`,
        quiz: [
            { q: 'Qual técnica explora a pressa?', opts: ['Autoridade', 'Urgência', 'Escassez', 'Familiaridade'], correct: 1 }
        ]
    },
    {
        id: 'adv3',
        title: 'Resposta a Incidentes',
        description: 'O que fazer quando é vítima de phishing.',
        difficulty: 'advanced',
        xp: 250,
        content: `<h3>Plano de Ação Imediata</h3><p>Saiba como reagir a um ataque.</p>`,
        quiz: [
            { q: 'Primeiro passo ao detetar um ataque?', opts: ['Apagar emails', 'Isolar computador', 'Contactar banco', 'Alterar passwords'], correct: 1 }
        ]
    },
    {
        id: 'adv4',
        title: 'Proteção de Dados e RGPD',
        description: 'Como o RGPD se aplica à proteção contra phishing.',
        difficulty: 'advanced',
        xp: 250,
        content: `<h3>RGPD e Phishing</h3><p>Obrigações legais das empresas.</p>`,
        quiz: [
            { q: 'Prazo para notificar CNPD?', opts: ['24h', '48h', '72h', '7 dias'], correct: 2 }
        ]
    }
];

// ==================== VÍDEOS FORMATIVOS ====================
const EDUCATIONAL_VIDEOS = [
    {
        titulo: 'CNCS - Phishing #LerAntesClicarDepois',
        descricao: 'Campanha oficial do Centro Nacional de Cibersegurança.',
        url: 'https://www.youtube.com/watch?v=mxOcGFRXVLY',
        fonte: 'CNCS',
        icone: '📧',
        duracao: '1:31 min'
    },
    {
        titulo: 'CNCS - Boas práticas de segurança',
        descricao: 'Recomendações do CNCS para proteger os seus dados.',
        url: 'https://www.youtube.com/watch?v=8Xh5Lqz_7Hs',
        fonte: 'CNCS',
        icone: '🛡️',
        duracao: '2:15 min'
    }
];

// ==================== HELPER FUNCTIONS ====================
function sanitizeEmail(email) {
    return email.replace(/\./g, '_').replace(/@/g, '_at_');
}

function generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

function generateActivationKey() {
    return Array.from({ length: 4 }, () => generateCode(4)).join('-');
}

function calculateAverage(scores) {
    if (!scores || Object.keys(scores).length === 0) return 0;
    const values = Object.values(scores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

function calculateProgress(user) {
    if (!user?.completedModules?.length) return 0;
    return Math.round((user.completedModules.length / MODULES.length) * 100);
}

function show(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

function hide(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function hideAllPages() {
    hide('landingPage');
    hide('loginSection');
    hide('dashboardPage');
    hide('modulesPage');
    hide('dynamicContent');
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) dynamicContent.innerHTML = '';
}

function showLandingPage() {
    hide('navbar');
    hideAllPages();
    show('landingPage');
}

// ==================== LOGIN FUNCTIONS ====================
function showLoginType(type) {
    console.log('A mostrar tipo de login:', type);
    
    const userForm = document.getElementById('userLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const tabUser = document.getElementById('tabUser');
    const tabAdmin = document.getElementById('tabAdmin');
    const adminExtraFields = document.getElementById('adminExtraFields');
    const masterKeyField = document.getElementById('masterKeyField');

    if (!userForm || !adminForm || !tabUser || !tabAdmin) {
        console.error('Elementos de login não encontrados');
        return;
    }

    userForm.classList.add('hidden');
    adminForm.classList.add('hidden');
    tabUser.classList.remove('active');
    tabAdmin.classList.remove('active');
    
    if (adminExtraFields) adminExtraFields.classList.add('hidden');
    if (masterKeyField) masterKeyField.style.display = 'none';
    
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminName').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('masterKey').value = '';
    
    if (type === 'user') {
        userForm.classList.remove('hidden');
        tabUser.classList.add('active');
        console.log('Modo colaborador ativado');
    } else {
        adminForm.classList.remove('hidden');
        tabAdmin.classList.add('active');
        console.log('Modo administrador ativado');
    }
}

function showLoginSection(type) {
    console.log('A mostrar secção de login para:', type);
    hide('landingPage');
    show('loginSection');
    document.getElementById('loginSection')?.scrollIntoView({ behavior: 'smooth' });
    showLoginType(type);
}

function hideLoginSection() {
    hide('loginSection');
    showLandingPage();
    showLoginType('user');
}

// ==================== REGISTO DE EMPRESAS ====================
async function registerCompany(companyData, masterKey) {
    if (masterKey !== MASTER_KEY) {
        return { success: false, error: 'Master Key inválida' };
    }
    
    try {
        if (!companyData.adminEmail || !companyData.adminPassword || !companyData.adminName || !companyData.companyName) {
            return { success: false, error: 'Todos os campos são obrigatórios' };
        }
        
        const companyCode = generateCode(8);
        const adminKey = sanitizeEmail(companyData.adminEmail);
        
        const adminExists = await database.ref(`admins/${adminKey}`).once('value');
        if (adminExists.exists()) {
            return { success: false, error: 'Email de administrador já registado' };
        }
        
        const expiresAt = companyData.expiresAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        
        const newAdmin = {
            name: companyData.adminName,
            email: companyData.adminEmail,
            password: companyData.adminPassword,
            companyCode: companyCode,
            createdAt: new Date().toISOString(),
            isAdmin: true,
            isMaster: false,
            licenseQuota: companyData.licenseQuota || 10,
            usedLicenses: 0,
            expiresAt: expiresAt
        };
        
        await database.ref(`admins/${adminKey}`).set(newAdmin);
        
        const newCompany = {
            name: companyData.companyName,
            adminEmail: companyData.adminEmail,
            adminName: companyData.adminName,
            code: companyCode,
            createdAt: new Date().toISOString(),
            licenseQuota: companyData.licenseQuota || 10,
            usedLicenses: 0,
            expiresAt: expiresAt,
            isActive: true,
            settings: {
                minCertificateScore: 80,
                mandatoryModules: ['mod1', 'mod2', 'mod3'],
                allowCustomBranding: false,
                require2FA: false
            }
        };
        
        await database.ref(`companies/${companyCode}`).set(newCompany);
        
        return { 
            success: true, 
            companyCode: companyCode,
            adminEmail: companyData.adminEmail,
            message: 'Empresa registada com sucesso!'
        };
        
    } catch (error) {
        console.error('Erro ao registar empresa:', error);
        return { success: false, error: error.message };
    }
}

// ==================== LOGIN ACTIONS ====================
async function doUserLogin() {
    const name = document.getElementById('userName')?.value.trim();
    const email = document.getElementById('userEmail')?.value.trim().toLowerCase();
    const activationKey = document.getElementById('activationKey')?.value.trim().toUpperCase();

    if (!name || !email || !activationKey) {
        showMessage('Preencha todos os campos', 'error');
        return;
    }

    try {
        const keyId = activationKey.replace(/-/g, '');
        const keySnapshot = await database.ref(`activationKeys/${keyId}`).once('value');
        
        if (!keySnapshot.exists()) {
            showMessage('Chave de ativação inválida', 'error');
            return;
        }
        
        const keyData = keySnapshot.val();
        
        if (keyData.used) {
            showMessage('Esta chave já foi utilizada', 'error');
            return;
        }
        
        const expiresAt = new Date(keyData.expiresAt);
        if (expiresAt < new Date()) {
            showMessage('Chave expirada', 'error');
            return;
        }
        
        const companyCode = keyData.companyCode;
        
        await database.ref(`activationKeys/${keyId}`).update({
            used: true,
            usedBy: email,
            usedAt: new Date().toISOString()
        });
        
        const userKey = sanitizeEmail(email);
        const newUser = {
            name, email, companyCode, xp: 0, scores: {}, badges: [],
            completedModules: [], simulationsCompleted: [], simulationScore: 0,
            startDate: new Date().toISOString(), lastActivity: new Date().toISOString(),
            hasSeenWelcome: false, activationKey, keyType: keyData.type
        };
        
        await database.ref(`employees/${userKey}`).set(newUser);
        USER = { ...USER, ...newUser, email, isAdmin: false };
        
        onLoginSuccess();
        
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Erro ao fazer login. Tente novamente.', 'error');
    }
}

async function doAdminLogin() {
    const email = document.getElementById('adminEmail')?.value.trim().toLowerCase();
    const password = document.getElementById('adminPass')?.value;
    const masterKey = document.getElementById('masterKey')?.value.trim();
    const name = document.getElementById('adminName')?.value.trim();
    const companyName = document.getElementById('companyName')?.value.trim();

    if (!email || !password) {
        showMessage('Preencha email e senha', 'error');
        return;
    }

    try {
        const masterSnapshot = await database.ref('masters/admin').once('value');
        const masterData = masterSnapshot.val();
        
        if (masterData && masterData.email === email && masterData.password === password) {
            USER = {
                ...USER,
                name: 'Master Admin',
                email: email,
                isAdmin: true,
                isMaster: true,
                companyCode: 'MASTER'
            };
            onLoginSuccess();
            return;
        }
        
        const adminKey = sanitizeEmail(email);
        const snapshot = await database.ref(`admins/${adminKey}`).once('value');

        if (snapshot.exists()) {
            const adminData = snapshot.val();
            
            const expiresAt = new Date(adminData.expiresAt);
            if (expiresAt < new Date()) {
                showMessage('Licença da empresa expirada. Contacte o suporte.', 'error');
                return;
            }
            
            if (adminData.password === password) {
                USER = { ...USER, ...adminData, email, isAdmin: true, isMaster: false };
                
                const companySnapshot = await database.ref(`companies/${adminData.companyCode}`).once('value');
                if (companySnapshot.exists()) {
                    COMPANY = { ...companySnapshot.val(), code: adminData.companyCode };
                }
                
                onLoginSuccess();
            } else {
                showMessage('Senha incorreta', 'error');
            }
        } else {
            const masterKeyField = document.getElementById('masterKeyField');
            const adminExtraFields = document.getElementById('adminExtraFields');
            
            if (!masterKey || masterKey === '') {
                masterKeyField.style.display = 'block';
                showMessage('Master Key necessária para registar nova empresa', 'info');
                return;
            }
            
            if (masterKey !== MASTER_KEY) {
                showMessage('Master Key inválida', 'error');
                return;
            }
            
            if (adminExtraFields.classList.contains('hidden')) {
                adminExtraFields.classList.remove('hidden');
                showMessage('Complete o registo da sua empresa', 'info');
                return;
            }
            
            if (!name || !companyName) {
                showMessage('Preencha nome e nome da empresa', 'error');
                return;
            }
            
            const result = await registerCompany({
                adminEmail: email,
                adminPassword: password,
                adminName: name,
                companyName: companyName,
                licenseQuota: 10
            }, masterKey);
            
            if (result.success) {
                showMessage('Empresa registada com sucesso! Faça login novamente.', 'success');
                
                document.getElementById('adminEmail').value = '';
                document.getElementById('adminPass').value = '';
                document.getElementById('masterKey').value = '';
                document.getElementById('adminName').value = '';
                document.getElementById('companyName').value = '';
                
                adminExtraFields.classList.add('hidden');
                document.getElementById('masterKeyField').style.display = 'none';
            } else {
                showMessage(result.error, 'error');
            }
        }
    } catch (error) {
        console.error('Admin login error:', error);
        showMessage('Erro ao fazer login: ' + error.message, 'error');
    }
}

// ==================== GERAR CHAVES (VERSÃO FINAL CORRIGIDA) ====================
async function generateEmployeeKeys() {
    const quantity = parseInt(document.getElementById('keyQuantity')?.value) || 1;
    const type = document.getElementById('keyType')?.value || 'basic';
    
    console.log('🔑 A gerar', quantity, 'chaves');
    
    const availableLicenses = COMPANY.licenseQuota - COMPANY.usedLicenses;
    if (quantity > availableLicenses) {
        showMessage(`Apenas ${availableLicenses} licenças disponíveis`, 'error');
        return;
    }
    
    try {
        showMessage('A gerar chaves... Aguarde', 'info');
        
        const keys = [];
        const validityDays = type === 'basic' ? 180 : 365;
        
        for (let i = 0; i < quantity; i++) {
            const key = generateActivationKey();
            const keyId = key.replace(/-/g, '');
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + validityDays);
            
            const keyData = {
                key: key,
                type: type,
                used: false,
                usedBy: null,
                usedAt: null,
                createdAt: new Date().toISOString(),
                expiresAt: expiresAt.toISOString(),
                companyCode: COMPANY.code,
                createdBy: USER.email
            };
            
            await database.ref(`activationKeys/${keyId}`).set(keyData);
            keys.push(key);
        }
        
        COMPANY.usedLicenses += quantity;
        await database.ref(`companies/${COMPANY.code}`).update({
            usedLicenses: COMPANY.usedLicenses
        });
        
        // ALERTA COM TODAS AS CHAVES
        let mensagem = `✅ ${quantity} CHAVE(S) GERADA(S) COM SUCESSO:\n\n`;
        keys.forEach((key, i) => {
            mensagem += `${i+1}. ${key}\n`;
        });
        alert(mensagem);
        
        // MOSTRAR NO ECRÃ
        const generatedDisplay = document.getElementById('generatedKeyDisplay');
        if (generatedDisplay) {
            let html = `
                <div style="background: #d4edda; border: 2px solid #28a745; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <h4 style="color: #155724; margin-bottom: 1rem;">✅ ${quantity} Chave(s) Gerada(s):</h4>
            `;
            
            keys.forEach((key, index) => {
                html += `
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; background: white; padding: 0.5rem; border-radius: 4px;">
                        <span style="background: #28a745; color: white; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem;">${index+1}</span>
                        <code style="flex: 1; font-family: monospace;">${key}</code>
                        <button class="btn btn-sm btn-outline" onclick="copyKey('${key}')">Copiar</button>
                    </div>
                `;
            });
            
            html += `<button class="btn btn-primary" onclick="copyAllKeys('${keys.join(',')}')">Copiar Todas (${keys.length})</button>`;
            html += `</div>`;
            
            generatedDisplay.innerHTML = html;
            generatedDisplay.classList.remove('hidden');
        }
        
        await loadKeysList();
        showMessage(`${quantity} chave(s) gerada(s) com sucesso!`, 'success');
        
    } catch (error) {
        console.error('❌ Erro ao gerar chaves:', error);
        showMessage('Erro ao gerar chaves: ' + error.message, 'error');
    }
}

// ==================== CARREGAR LISTA DE CHAVES ====================
async function loadKeysList() {
    const keysList = document.getElementById('keysList');
    if (!keysList) return;
    
    try {
        keysList.innerHTML = '<div style="text-align: center; padding: 2rem;">⏳ A carregar...</div>';
        
        let keys = [];
        const snapshot = await database.ref('activationKeys').once('value');
        
        if (snapshot.exists()) {
            Object.values(snapshot.val()).forEach(keyData => {
                if (keyData.companyCode === COMPANY.code) {
                    keys.push(keyData);
                }
            });
        }
        
        keys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        if (keys.length === 0) {
            keysList.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--gray-500);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔑</div>
                    <p>Nenhuma chave gerada ainda.</p>
                </div>
            `;
            return;
        }
        
        let html = `
            <div style="background: var(--gray-50); padding: 1rem; border-bottom: 2px solid var(--gray-200); display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; font-weight: 600;">
                <div>Chave</div>
                <div>Tipo</div>
                <div>Estado</div>
                <div>Expira</div>
                <div>Ações</div>
            </div>
        `;
        
        keys.forEach(keyData => {
            const expiryDate = new Date(keyData.expiresAt);
            const isExpired = expiryDate < new Date();
            
            let statusColor = 'var(--success)';
            let statusText = 'Ativa';
            
            if (isExpired) {
                statusColor = 'var(--danger)';
                statusText = 'Expirada';
            } else if (keyData.used) {
                statusColor = 'var(--warning)';
                statusText = 'Usada';
            }
            
            html += `
                <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200); display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; align-items: center;">
                    <code style="font-family: monospace;">${keyData.key}</code>
                    <div>${keyData.type}</div>
                    <div>
                        <span style="background: ${statusColor}20; color: ${statusColor}; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem;">
                            ${statusText}
                        </span>
                    </div>
                    <div>${expiryDate.toLocaleDateString('pt-PT')}</div>
                    <div>
                        <button class="btn btn-sm btn-outline" onclick="copyKey('${keyData.key}')">Copiar</button>
                    </div>
                </div>
            `;
        });
        
        keysList.innerHTML = html;
        
    } catch (error) {
        console.error('Erro:', error);
        keysList.innerHTML = `<div class="alert alert-danger">Erro ao carregar chaves</div>`;
    }
}

// ==================== FUNÇÕES AUXILIARES DE CÓPIA ====================
function copyKey(key) {
    navigator.clipboard.writeText(key).then(() => {
        showMessage('Chave copiada!', 'success');
    }).catch(() => {
        showMessage('Erro ao copiar chave', 'error');
    });
}

function copyAllKeys(keysString) {
    const keys = keysString.split(',');
    const text = keys.map(k => `🔑 ${k}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
        showMessage(`${keys.length} chaves copiadas!`, 'success');
    }).catch(() => {
        showMessage('Erro ao copiar chaves', 'error');
    });
}

// ==================== ON LOGIN SUCCESS ====================
function onLoginSuccess() {
    console.log('Login bem-sucedido para:', USER.email, 'Admin:', USER.isAdmin);
    
    hide('landingPage');
    hide('loginSection');
    show('navbar');
    
    const btnDashboard = document.getElementById('btnDashboard');
    const btnModules = document.getElementById('btnModules');
    const btnSimulator = document.getElementById('btnSimulator');
    const btnBadges = document.getElementById('btnBadges');
    const btnLibrary = document.getElementById('btnLibrary');
    const btnCert = document.getElementById('btnCert');
    const btnAdmin = document.getElementById('btnAdmin');
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (USER.isAdmin) {
        if (btnDashboard) btnDashboard.style.display = 'none';
        if (btnModules) btnModules.style.display = 'none';
        if (btnSimulator) btnSimulator.style.display = 'none';
        if (btnBadges) btnBadges.style.display = 'none';
        if (btnLibrary) btnLibrary.style.display = 'none';
        if (btnCert) btnCert.style.display = 'none';
        if (btnAdmin) btnAdmin.style.display = 'inline-flex';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
        
        goToAdmin();
    } else {
        if (btnDashboard) btnDashboard.style.display = 'inline-flex';
        if (btnModules) btnModules.style.display = 'inline-flex';
        if (btnSimulator) btnSimulator.style.display = 'inline-flex';
        if (btnBadges) btnBadges.style.display = 'inline-flex';
        if (btnLibrary) btnLibrary.style.display = 'inline-flex';
        if (btnCert) btnCert.style.display = 'inline-flex';
        if (btnAdmin) btnAdmin.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
        
        if (!USER.hasSeenWelcome) {
            showWelcomePopup();
        } else {
            goToDashboard();
        }
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
}

// ==================== LOGOUT ====================
function logout() {
    console.log('A fazer logout...');
    
    localStorage.removeItem('phishguard_user');
    
    USER = { id: '', name: '', email: '', isAdmin: false, companyCode: '', xp: 0, scores: {}, badges: [], completedModules: [], simulationsCompleted: [], simulationScore: 0, startDate: null, lastActivity: null, hasSeenWelcome: false, activationKey: '', keyType: 'basic' };
    COMPANY = { code: '', name: '', adminEmail: '', adminName: '', employees: [], settings: { minCertificateScore: 80, mandatoryModules: [], allowCustomBranding: false, require2FA: false } };
    
    hide('navbar');
    hideAllPages();
    
    ['userName', 'userEmail', 'activationKey', 'companyCode', 'adminEmail', 'adminPass', 'adminName', 'companyName', 'masterKey'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    showLoginType('user');
    showLandingPage();
    
    console.log('Logout concluído');
}

// ==================== DASHBOARD ====================
function goToDashboard() {
    hideAllPages();
    show('dashboardPage');
    
    const requiredModules = ['mod1', 'mod2', 'mod3', 'mod4', 'mod5'];
    const completedRequired = requiredModules.filter(id => USER.completedModules.includes(id)).length;
    const requiredAvg = calculateAverage(
        Object.fromEntries(
            Object.entries(USER.scores).filter(([key]) => requiredModules.includes(key))
        )
    );
    const canGetCertificate = completedRequired === 5 && requiredAvg >= 80;
    
    document.getElementById('dashboardPage').innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-card">
                <div class="dashboard-header">
                    <div>
                        <h2 class="dashboard-title">Dashboard</h2>
                        <p class="dashboard-subtitle">Bem-vindo, ${USER.name?.split(' ')[0] || 'Utilizador'}!</p>
                    </div>
                    <div>
                        <span class="badge" style="background: var(--primary-100); color: var(--primary-700); padding: 0.5rem 1rem; border-radius: var(--radius-full);">
                            ${USER.companyCode || 'PhishGuard Elite'}
                        </span>
                    </div>
                </div>
                
                <div class="dashboard-stats-grid">
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">XP Total</div>
                        <div class="dashboard-stat-value">${USER.xp || 0}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Módulos Base</div>
                        <div class="dashboard-stat-value">${completedRequired}/5</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Média</div>
                        <div class="dashboard-stat-value">${requiredAvg}%</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Módulo 6</div>
                        <div class="dashboard-stat-value">${USER.completedModules.includes('mod6') ? '✓' : '📖'}</div>
                    </div>
                </div>
                
                <div class="dashboard-progress-section">
                    <div class="dashboard-progress-header">
                        <span class="dashboard-progress-title">Progresso para Certificado</span>
                        <span class="dashboard-progress-value">${Math.round((completedRequired/5)*100)}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${(completedRequired/5)*100}%"></div>
                    </div>
                    ${canGetCertificate ? `
                        <div style="margin-top: 1rem; text-align: center;">
                            <span style="background: var(--success); color: white; padding: 0.5rem 1rem; border-radius: var(--radius-full);">
                                ✅ Certificado Disponível!
                            </span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="dashboard-actions">
                    <button class="btn btn-primary" onclick="goToModules()">Continuar Formação</button>
                    ${canGetCertificate ? `
                        <button class="btn btn-success" onclick="goToCertificate()">Obter Certificado</button>
                    ` : ''}
                    <button class="btn btn-outline" onclick="goToSimulator()">Simulador</button>
                </div>
            </div>
        </div>
    `;
}

// ==================== MÓDULOS ====================
function goToModules() {
    console.log('A abrir módulos');
    hideAllPages();
    show('modulesPage');
    loadModules();
}

function loadModules() {
    console.log('A carregar módulos...');
    const container = document.getElementById('modulesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    MODULES.forEach((module, index) => {
        const isCompleted = USER.completedModules.includes(module.id);
        const isLocked = index > 0 && !USER.completedModules.includes(MODULES[index - 1].id) && module.id !== 'mod6';
        
        const card = createModuleCard(module, isCompleted, isLocked);
        container.appendChild(card);
    });
    
    const firstFiveModules = ['mod1', 'mod2', 'mod3', 'mod4', 'mod5'];
    const completedFirstFive = firstFiveModules.every(id => USER.completedModules.includes(id));
    
    let firstFiveScores = 0;
    let firstFiveCount = 0;
    firstFiveModules.forEach(id => {
        if (USER.scores[id]) {
            firstFiveScores += USER.scores[id];
            firstFiveCount++;
        }
    });
    const firstFiveAvg = firstFiveCount > 0 ? Math.round(firstFiveScores / firstFiveCount) : 0;
    
    const canAccessAdvanced = completedFirstFive && firstFiveAvg >= 80;
    
    if (canAccessAdvanced) {
        if (!USER.advancedUnlocked) {
            USER.advancedUnlocked = true;
            localStorage.setItem('phishguard_user', JSON.stringify(USER));
        }
        
        const separator = document.createElement('div');
        separator.style.cssText = 'grid-column: 1 / -1; margin: 2rem 0 1rem 0; padding: 1rem; background: linear-gradient(90deg, var(--primary-100), transparent); border-radius: var(--radius);';
        separator.innerHTML = `
            <h3 style="margin: 0;">🚀 Módulos Avançados</h3>
            <p style="margin: 0.5rem 0 0 0; color: var(--gray-600);">
                Desbloqueados após concluir os 5 módulos básicos com 80%+
            </p>
        `;
        container.appendChild(separator);
        
        ADVANCED_MODULES.forEach((module) => {
            const isCompleted = USER.completedModules.includes(module.id);
            const card = createModuleCard(module, isCompleted, false);
            container.appendChild(card);
        });
    }
}

function createModuleCard(module, isCompleted, isLocked) {
    const card = document.createElement('div');
    card.className = `module-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
    
    if (!isLocked) {
        card.onclick = () => openModule(module);
    }
    
    let difficultyIcon = '🟢';
    if (module.difficulty === 'intermediate') difficultyIcon = '🟡';
    if (module.difficulty === 'advanced') difficultyIcon = '🔴';
    
    card.innerHTML = `
        <div class="module-title">${module.title}</div>
        <div class="module-description">${module.description}</div>
        <div class="module-meta">
            <span class="difficulty-badge ${module.difficulty}">
                ${difficultyIcon} ${module.difficulty === 'beginner' ? 'Iniciante' : module.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
            </span>
            ${isCompleted ? '<span style="color: var(--success); margin-left: 0.5rem;">✓ Concluído</span>' : ''}
            ${isLocked ? '<span style="color: var(--gray-500); margin-left: 0.5rem;">🔒 Bloqueado</span>' : ''}
        </div>
        ${!isCompleted && !isLocked ? `<div style="color: var(--primary-600); margin-top: 0.5rem;">+${module.xp} XP</div>` : ''}
    `;
    
    return card;
}

function openModule(module) {
    hide('modulesPage');
    show('dynamicContent');
    
    if (module.id === 'mod6' && module.stories) {
        let storiesHtml = '';
        
        module.stories.forEach((story, index) => {
            storiesHtml += `
                <div class="story-card" id="story-${story.id}" style="margin-bottom: 2rem;">
                    <div class="story-header" onclick="toggleStory('${story.id}')" style="cursor: pointer; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <h3>${story.titulo}</h3>
                                <p>${story.data} • ${story.entidade}</p>
                            </div>
                            <span class="story-toggle">▼</span>
                        </div>
                    </div>
                    <div class="story-content" id="story-content-${story.id}" style="display: none; margin-top: 1rem; padding: 1.5rem; background: var(--gray-50); border-radius: var(--radius-lg);">
                        <p><strong>Cenário:</strong> ${story.cenario}</p>
                        <p><strong>Ataque:</strong> ${story.ataque}</p>
                        <p><strong>Lição:</strong> ${story.licao}</p>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('dynamicContent').innerHTML = `
            <div style="padding: 2rem;">
                <button class="btn btn-outline btn-sm" onclick="goToModules()">← Voltar</button>
                <h2>${module.title}</h2>
                ${module.content}
                <div id="storiesContainer">${storiesHtml}</div>
                <div id="quizContainer"></div>
                <button class="btn btn-primary" onclick="submitQuiz('${module.id}')">Submeter Quiz</button>
            </div>
        `;
        
        renderQuiz(module.quiz);
    } else {
        document.getElementById('dynamicContent').innerHTML = `
            <div style="padding: 2rem;">
                <button class="btn btn-outline btn-sm" onclick="goToModules()">← Voltar</button>
                <h2>${module.title}</h2>
                <div>${module.content}</div>
                <h3>Quiz</h3>
                <div id="quizContainer"></div>
                <button class="btn btn-primary" onclick="submitQuiz('${module.id}')">Submeter</button>
            </div>
        `;
        
        renderQuiz(module.quiz);
    }
}

function toggleStory(storyId) {
    const content = document.getElementById(`story-content-${storyId}`);
    const toggle = document.querySelector(`#story-${storyId} .story-toggle`);
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        toggle.style.transform = 'rotate(0deg)';
    }
}

function renderQuiz(questions) {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    questions.forEach((q, idx) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p><strong>${idx+1}. ${q.q}</strong></p>
            ${q.opts.map((opt, oidx) => `
                <div>
                    <input type="radio" name="q${idx}" value="${oidx}" id="q${idx}o${oidx}">
                    <label for="q${idx}o${oidx}">${opt}</label>
                </div>
            `).join('')}
        `;
        container.appendChild(div);
    });
}

async function submitQuiz(moduleId) {
    const module = MODULES.find(m => m.id === moduleId) || ADVANCED_MODULES.find(m => m.id === moduleId);
    if (!module) return;
    
    let correctCount = 0;
    
    module.quiz.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="q${idx}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) correctCount++;
    });
    
    const score = Math.round((correctCount / module.quiz.length) * 100);
    const xpEarned = score >= 60 ? module.xp : Math.round(module.xp / 2);
    
    showMessage(`Pontuação: ${score}% - Ganhou ${xpEarned} XP`, 'success');
    
    if (!USER.completedModules.includes(moduleId)) {
        USER.completedModules.push(moduleId);
        USER.xp += xpEarned;
        USER.scores[moduleId] = score;
        
        const firstFiveModules = ['mod1', 'mod2', 'mod3', 'mod4', 'mod5'];
        const completedFirstFive = firstFiveModules.every(id => USER.completedModules.includes(id));
        
        let firstFiveScores = 0;
        let firstFiveCount = 0;
        firstFiveModules.forEach(id => {
            if (USER.scores[id]) {
                firstFiveScores += USER.scores[id];
                firstFiveCount++;
            }
        });
        const firstFiveAvg = firstFiveCount > 0 ? Math.round(firstFiveScores / firstFiveCount) : 0;
        
        if (completedFirstFive && firstFiveAvg >= 80 && !USER.showedCompletionPopup) {
            USER.showedCompletionPopup = true;
            localStorage.setItem('phishguard_user', JSON.stringify(USER));
            setTimeout(() => showCompletionPopup(firstFiveAvg), 1000);
        }
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    setTimeout(() => goToModules(), 2000);
}

// ==================== SIMULADOR ====================
function goToSimulator() {
    hideAllPages();
    show('dynamicContent');
    document.getElementById('dynamicContent').innerHTML = `
        <div style="padding: 2rem;">
            <h2>Simulador de Phishing</h2>
            <p>Em breve...</p>
            <button onclick="goToDashboard()">Voltar</button>
        </div>
    `;
}

// ==================== BADGES ====================
function goToBadges() {
    hideAllPages();
    show('dynamicContent');
    document.getElementById('dynamicContent').innerHTML = `
        <div style="padding: 2rem;">
            <h2>Conquistas</h2>
            <p>Em breve...</p>
            <button onclick="goToDashboard()">Voltar</button>
        </div>
    `;
}

// ==================== BIBLIOTECA ====================
function goToLibrary() {
    hideAllPages();
    show('dynamicContent');
    
    document.getElementById('dynamicContent').innerHTML = `
        <div style="padding: 2rem;">
            <h2>Biblioteca de Recursos</h2>
            <div id="videoContainer"></div>
            <button onclick="goToDashboard()">Voltar</button>
        </div>
    `;
    
    loadLibraryVideos();
}

function loadLibraryVideos() {
    const videoContainer = document.getElementById('videoContainer');
    if (!videoContainer) return;
    
    let html = '<div style="display: grid; gap: 1.5rem;">';
    
    EDUCATIONAL_VIDEOS.forEach(video => {
        html += `
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 2.5rem;">${video.icone}</span>
                    <div>
                        <h4 style="margin: 0;">${video.titulo}</h4>
                        <p style="margin: 0.25rem 0 0 0;">${video.duracao} • ${video.fonte}</p>
                    </div>
                </div>
                <p>${video.descricao}</p>
                <a href="${video.url}" target="_blank" style="display: inline-block; background: var(--primary-600); color: white; padding: 0.5rem 1rem; border-radius: var(--radius); text-decoration: none;">Assistir no YouTube</a>
            </div>
        `;
    });
    
    html += '</div>';
    videoContainer.innerHTML = html;
}

// ==================== CERTIFICADO ====================
function goToCertificate() {
    hideAllPages();
    show('dynamicContent');
    
    const requiredModules = ['mod1', 'mod2', 'mod3', 'mod4', 'mod5'];
    const completedRequired = requiredModules.every(id => USER.completedModules.includes(id));
    
    let requiredScores = 0;
    let requiredCount = 0;
    requiredModules.forEach(id => {
        if (USER.scores[id]) {
            requiredScores += USER.scores[id];
            requiredCount++;
        }
    });
    const requiredAvg = requiredCount > 0 ? Math.round(requiredScores / requiredCount) : 0;
    
    const canGetCertificate = completedRequired && requiredAvg >= 80;
    
    let html = '';
    
    if (canGetCertificate) {
        const certCode = generateCode(16);
        const date = new Date().toLocaleDateString('pt-PT');
        
        html = `
            <div style="text-align: center; padding: 2rem; border: 2px solid var(--primary-500); border-radius: var(--radius-lg);">
                <h1 style="color: var(--primary-700);">CERTIFICADO</h1>
                <h2>${USER.name}</h2>
                <p>completou a formação com aproveitamento de ${requiredAvg}%</p>
                <p>Data: ${date}</p>
                <p>Código: ${certCode}</p>
                <button class="btn btn-primary" onclick="window.print()">Imprimir</button>
            </div>
        `;
    } else {
        const completedCount = requiredModules.filter(id => USER.completedModules.includes(id)).length;
        html = `
            <div style="text-align: center;">
                <h3>Certificado Bloqueado</h3>
                <p>Complete os 5 módulos com média ≥80%</p>
                <p>Progresso: ${completedCount}/5 - Média: ${requiredAvg}%</p>
                <button class="btn btn-primary" onclick="goToModules()">Continuar</button>
            </div>
        `;
    }
    
    document.getElementById('dynamicContent').innerHTML = `
        <div style="padding: 2rem;">
            <div class="dashboard-card">
                <div style="display: flex; justify-content: space-between;">
                    <h2>Certificado</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                ${html}
            </div>
        </div>
    `;
}

// ==================== ADMIN ====================
function goToAdmin() {
    console.log('A entrar no painel admin');
    
    if (!USER.isAdmin) {
        goToDashboard();
        return;
    }
    
    hideAllPages();
    show('dashboardPage');
    
    document.getElementById('dashboardPage').innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-card">
                <div class="dashboard-header">
                    <div>
                        <h2 class="dashboard-title">Painel de Administração</h2>
                        <p class="dashboard-subtitle">Bem-vindo, ${USER.name || 'Administrador'}</p>
                    </div>
                    <div>
                        <span class="badge" style="background: var(--primary-100); color: var(--primary-700); padding: 0.5rem 1rem; border-radius: var(--radius-full);">
                            ${COMPANY.code || USER.companyCode || 'N/A'}
                        </span>
                    </div>
                </div>
                
                <div class="dashboard-stats-grid">
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Empresa</div>
                        <div class="dashboard-stat-value">${COMPANY.name || 'Não definida'}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Administrador</div>
                        <div class="dashboard-stat-value">${USER.name || USER.email}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Colaboradores</div>
                        <div class="dashboard-stat-value" id="adminTotalEmployees">0</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--gray-200); margin-bottom: 2rem;">
                    <button class="admin-tab active" onclick="showAdminTab('overview')" id="tab-overview">Visão Geral</button>
                    <button class="admin-tab" onclick="showAdminTab('keys')" id="tab-keys">Chaves</button>
                    <button class="admin-tab" onclick="showAdminTab('employees')" id="tab-employees">Colaboradores</button>
                    <button class="admin-tab" onclick="showAdminTab('settings')" id="tab-settings">Configurações</button>
                </div>
                
                <div id="adminTabContent" class="dashboard-progress-section">
                    <div style="text-align: center; padding: 3rem;">
                        <p>Selecione uma opção</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${tab}`)?.classList.add('active');
    
    const content = document.getElementById('adminTabContent');
    if (!content) return;
    
    let html = '';
    
    switch(tab) {
        case 'overview':
            html = `
                <div style="padding: 2rem;">
                    <h3>Visão Geral</h3>
                    <p>Empresa: ${COMPANY.name}</p>
                    <p>Código: ${COMPANY.code}</p>
                    <p>Licenças: ${COMPANY.usedLicenses}/${COMPANY.licenseQuota}</p>
                </div>
            `;
            break;
            
        case 'keys':
            html = `
                <div style="padding: 2rem;">
                    <h3>Gerar Chaves</h3>
                    <p>Licenças disponíveis: ${COMPANY.licenseQuota - COMPANY.usedLicenses}</p>
                    
                    <div style="margin: 1rem 0;">
                        <label>Tipo:</label>
                        <select id="keyType">
                            <option value="basic">Básica (6 meses)</option>
                            <option value="premium">Premium (1 ano)</option>
                        </select>
                        
                        <label>Quantidade:</label>
                        <input type="number" id="keyQuantity" value="1" min="1" max="${COMPANY.licenseQuota - COMPANY.usedLicenses}">
                        
                        <button class="btn btn-primary" onclick="generateEmployeeKeys()">Gerar Chaves</button>
                    </div>
                    
                    <div id="generatedKeyDisplay"></div>
                    <div id="keysList"></div>
                </div>
            `;
            content.innerHTML = html;
            loadKeysList();
            break;
            
        case 'employees':
            html = `<div style="padding: 2rem;"><h3>Colaboradores</h3><div id="employeesList">A carregar...</div></div>`;
            content.innerHTML = html;
            loadEmployeesList();
            break;
            
        case 'settings':
            html = `<div style="padding: 2rem;"><h3>Configurações</h3><p>Em breve...</p></div>`;
            content.innerHTML = html;
            break;
    }
    
    if (tab !== 'keys' && tab !== 'employees') {
        content.innerHTML = html;
    }
}

async function loadAdminStats() {
    try {
        let totalEmployees = 0;
        const snapshot = await database.ref('employees').once('value');
        if (snapshot.exists()) {
            Object.values(snapshot.val()).forEach(emp => {
                if (emp.companyCode === COMPANY.code) totalEmployees++;
            });
        }
        const el = document.getElementById('adminTotalEmployees');
        if (el) el.textContent = totalEmployees;
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function loadEmployeesList() {
    const list = document.getElementById('employeesList');
    if (!list) return;
    
    try {
        let employees = [];
        const snapshot = await database.ref('employees').once('value');
        if (snapshot.exists()) {
            Object.values(snapshot.val()).forEach(emp => {
                if (emp.companyCode === COMPANY.code) {
                    employees.push(emp);
                }
            });
        }
        
        if (employees.length === 0) {
            employees = [
                { name: 'Ana Silva', email: 'ana@empresa.pt', xp: 1250, completedModules: [1,2,3], lastActivity: new Date().toISOString() },
                { name: 'João Santos', email: 'joao@empresa.pt', xp: 850, completedModules: [1,2], lastActivity: new Date().toISOString() }
            ];
        }
        
        list.innerHTML = employees.map(emp => `
            <div style="padding: 0.5rem; border-bottom: 1px solid #eee;">
                <strong>${emp.name}</strong> - ${emp.email} - ${emp.xp} XP
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Erro:', error);
        list.innerHTML = '<p>Erro ao carregar</p>';
    }
}

// ==================== WELCOME POPUP ====================
function showWelcomePopup() {
    show('welcomeOverlay');
}

function closeWelcomePopup() {
    hide('welcomeOverlay');
    USER.hasSeenWelcome = true;
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    goToDashboard();
}

function goToModulesFromWelcome() {
    closeWelcomePopup();
    goToModules();
}

function showCompletionPopup(avgScore) {
    alert(`🎉 Parabéns! Completou os 5 módulos com média ${avgScore}%!`);
}

// ==================== MESSAGES ====================
function showMessage(message, type = 'info') {
    const colors = { success: '#28a745', error: '#dc3545', warning: '#ffc107', info: '#17a2b8' };
    
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: white; color: ${colors[type]};
        padding: 1rem; border-left: 4px solid ${colors[type]}; border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 10000;
    `;
    msg.textContent = message;
    document.body.appendChild(msg);
    
    setTimeout(() => msg.remove(), 3000);
}

// ==================== INICIALIZAÇÃO ====================
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado - a inicializar');
    
    hide('navbar');
    hide('loginSection');
    hide('dashboardPage');
    hide('modulesPage');
    hide('dynamicContent');
    hide('welcomeOverlay');
    
    showLandingPage();
    
    const savedUser = localStorage.getItem('phishguard_user');
    if (savedUser) {
        try {
            USER = JSON.parse(savedUser);
            onLoginSuccess();
        } catch (e) {
            localStorage.removeItem('phishguard_user');
        }
    }
});

// ==================== EXPORT GLOBAL ====================
window.showLandingPage = showLandingPage;
window.showLoginSection = showLoginSection;
window.hideLoginSection = hideLoginSection;
window.showLoginType = showLoginType;
window.doUserLogin = doUserLogin;
window.doAdminLogin = doAdminLogin;
window.logout = logout;
window.goToDashboard = goToDashboard;
window.goToModules = goToModules;
window.goToSimulator = goToSimulator;
window.goToBadges = goToBadges;
window.goToLibrary = goToLibrary;
window.goToCertificate = goToCertificate;
window.goToAdmin = goToAdmin;
window.showAdminTab = showAdminTab;
window.generateEmployeeKeys = generateEmployeeKeys;
window.copyKey = copyKey;
window.copyAllKeys = copyAllKeys;
window.closeWelcomePopup = closeWelcomePopup;
window.goToModulesFromWelcome = goToModulesFromWelcome;
window.toggleStory = toggleStory;
window.submitQuiz = submitQuiz;
window.selectOption = (q, o) => {
    document.querySelectorAll(`input[name="q${q}"]`).forEach(i => i.checked = false);
    document.getElementById(`q${q}o${o}`).checked = true;
};
window.showAdminTabClick = function() {
    console.log('Função de emergência');
    showLoginType('admin');
};

console.log('✅ PhishGuard Elite carregado com sucesso');
