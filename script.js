// ==================== PHISHGUARD ELITE - JAVASCRIPT ====================
// Plataforma de Formação Anti-Phishing | Mareginter
// Versão Melhorada e Otimizada

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
    // Verificar se o Firebase já foi inicializado
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // usar app existente
    }
    database = firebase.database();
    console.log('✅ Firebase inicializado com sucesso');
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
    // Fallback para localStorage apenas
    database = {
        ref: () => ({
            once: () => Promise.resolve({ exists: () => false, val: () => null }),
            set: () => Promise.resolve(),
            update: () => Promise.resolve(),
            push: () => Promise.resolve({ key: 'local_' + Date.now() })
        })
    };
}

// ==================== GLOBAL STATE ====================
let USER = {
    id: '',
    name: '',
    email: '',
    isAdmin: false,
    companyCode: '',
    xp: 0,
    scores: {},
    badges: [],
    completedModules: [],
    simulationsCompleted: [],
    startDate: null,
    lastActivity: null,
    hasSeenWelcome: false,
    activationKey: '',
    keyType: 'basic'
};

let COMPANY = {
    code: '',
    name: '',
    adminEmail: '',
    adminName: '',
    employees: [],
    settings: {
        minCertificateScore: 80,
        mandatoryModules: []
    }
};

window.storyAnswers = {};

// ==================== MÓDULOS DE FORMAÇÃO ====================
const MODULES = [
    {
        id: 'mod1',
        title: '🎯 Introdução ao Phishing',
        icon: '🎯',
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
        `,
        quiz: [
            { q: 'O que é phishing?', opts: ['Um tipo de vírus', 'Técnica de fraude para roubar informações', 'Um programa de proteção', 'Um tipo de email marketing'], correct: 1 },
            { q: 'Qual destes NÃO é um sinal típico de phishing?', opts: ['Erros ortográficos', 'Pedidos urgentes', 'Endereço de email oficial da empresa', 'Links suspeitos'], correct: 2 }
        ]
    },
    {
        id: 'mod2',
        title: '📧 Identificar Emails Suspeitos',
        icon: '📧',
        description: 'Desenvolva competências para detetar emails fraudulentos.',
        difficulty: 'beginner',
        xp: 120,
        content: `
            <h3>Sinais de Alerta em Emails</h3>
            <p>Aprenda a identificar os principais indicadores de emails de phishing.</p>
        `,
        quiz: [
            { q: 'Qual destes endereços é mais suspeito?', opts: ['suporte@bancoportugal.pt', 'noreply@banco-p0rtugal.com', 'atendimento@banco.pt', 'servicos@instituicao.pt'], correct: 1 },
            { q: 'Um email começa com "Prezado utilizador". Isto é:', opts: ['Normal', 'Sinal de phishing', 'Usado por bancos', 'Forma correta'], correct: 1 }
        ]
    },
    {
        id: 'mod3',
        title: '🔐 Segurança de Palavras-passe',
        icon: '🔐',
        description: 'Crie e gerencie palavras-passe seguras eficazmente.',
        difficulty: 'beginner',
        xp: 130,
        content: `
            <h3>Importância das Palavras-passe Fortes</h3>
            <p>Uma palavra-passe forte é a primeira linha de defesa contra acessos não autorizados.</p>
        `,
        quiz: [
            { q: 'Qual é a palavra-passe mais segura?', opts: ['password123', 'JoaoSilva2024', 'Tr0c@rS3nh@Cad@3M!', 'qwerty'], correct: 2 },
            { q: 'Com que frequência mudar palavras-passe?', opts: ['Todos os dias', 'Periodicamente, após violações', 'Nunca', 'Só quando esquece'], correct: 1 }
        ]
    },
    {
        id: 'mod4',
        title: '🔗 Reconhecer URLs Fraudulentos',
        icon: '🔗',
        description: 'Aprenda a identificar websites falsos e links maliciosos.',
        difficulty: 'intermediate',
        xp: 150,
        content: `
            <h3>Anatomia de um URL</h3>
            <p>Compreender a estrutura de um URL é essencial.</p>
        `,
        quiz: [
            { q: 'Qual URL é mais suspeito?', opts: ['https://bancoportugal.pt', 'https://bancoportugal.com-verificacao.tk', 'https://online.bancoportugal.pt', 'https://bancoportugal.pt/login'], correct: 1 },
            { q: 'O que indica "https://"?', opts: ['100% seguro', 'Ligação encriptada', 'Site governamental', 'Nada especial'], correct: 1 }
        ]
    },
    {
        id: 'mod5',
        title: '📱 Proteção em Redes Sociais',
        icon: '📱',
        description: 'Proteja-se de ataques através de redes sociais.',
        difficulty: 'intermediate',
        xp: 140,
        content: `
            <h3>Phishing nas Redes Sociais</h3>
            <p>As redes sociais são alvos populares devido à quantidade de informação pessoal partilhada.</p>
        `,
        quiz: [
            { q: 'Mensagem de "amigo" com link "És tu neste vídeo?". O que faz?', opts: ['Clica imediatamente', 'Contacta amigo por outro meio', 'Partilha', 'Clica sem inserir dados'], correct: 1 },
            { q: 'Quiz pede acesso a email e amigos. Isto é:', opts: ['Normal', 'Suspeito e malicioso', 'Necessário', 'Formalidade'], correct: 1 }
        ]
    },
    // MÓDULO 6 - HISTÓRIAS REAIS (5 CASOS PORTUGUESES)
    {
        id: 'mod6',
        title: '📖 Histórias Reais de Phishing em Portugal',
        icon: '📖',
        description: '5 casos reais documentados em Portugal. Aprenda com experiências reais e evite ser a próxima vítima.',
        difficulty: 'intermediate',
        xp: 200,
        content: `
            <div style="margin-bottom: 2rem;">
                <h3>📊 Estatísticas Reais em Portugal</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0;">
                    <div style="background: var(--primary-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; color: var(--primary-600);">5</div>
                        <div style="font-size: 0.875rem;">Casos Documentados</div>
                    </div>
                    <div style="background: var(--primary-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; color: var(--primary-600);">250k€</div>
                        <div style="font-size: 0.875rem;">Prejuízo Total</div>
                    </div>
                    <div style="background: var(--primary-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 2rem; color: var(--primary-600);">5</div>
                        <div style="font-size: 0.875rem;">Vítimas Reais</div>
                    </div>
                </div>
                
                <div class="alert alert-info">
                    <strong>🎯 Objetivo deste módulo:</strong> Desenvolver intuição e capacidade de identificar padrões de ataque através de experiências reais em Portugal.
                </div>
                
                <p style="margin-top: 2rem;">Clique em cada caso para ler a história completa e aprender com os erros de outras pessoas.</p>
            </div>
        `,
        // Os casos reais estão definidos abaixo
        stories: [
            {
                id: 'story1',
                titulo: 'O Golpe do Falso CEO',
                empresa: 'Empresa de Consultoria, Lisboa',
                data: 'Janeiro 2024',
                cargo: 'Diretora Financeira',
                vitima: 'Carla, 42 anos',
                cenario: 'A Carla, diretora financeira de uma consultora em Lisboa, recebeu um email do "CEO" pedindo uma transferência urgente de 45.000€ para um novo parceiro na Alemanha.',
                ataque: `O email parecia legítimo - usava o nome correto do CEO, o logótipo da empresa, e até incluía detalhes de uma reunião que realmente tinha acontecido. 
                
                A Carla estava ocupada e o email chegou numa sexta-feira à tarde, quando sabia que o CEO estava em viagem. O tom era urgente: "Precisamos fechar isto hoje, estou em reuniões o dia todo, não posso atender chamadas."`,
                erro: 'A Carla não verificou o endereço de email real (era ceo.empresa@gmail.com em vez de ceo@empresa.pt) e não ligou para confirmar, confiando na urgência da situação.',
                licao: 'Nunca processar pagamentos apenas por email. Implementar regra de "dupla verificação" obrigatória para transferências acima de 5.000€, sempre por telefone ou presencialmente.',
                prevencao: 'A empresa implementou um sistema onde todas as transferências precisam de aprovação de duas pessoas diferentes, e qualquer pedido financeiro por email é automaticamente marcado para revisão.',
                frase: '"Na altura parecia tão real... A pressão e a confiança no CEO cegaram-me para os sinais." - Carla',
                consequencia: 'Perda de 45.000€. A empresa recuperou apenas 15.000€ através do seguro.'
            },
            {
                id: 'story2',
                titulo: 'A Fatura da Transportadora',
                empresa: 'Pequena Loja Online, Porto',
                data: 'Março 2024',
                cargo: 'Proprietário',
                vitima: 'Rui, 38 anos',
                cenario: 'O Rui, dono de uma loja online no Porto, recebeu uma fatura da "CTT Expresso" com um PDF anexo sobre uma encomenda retida.',
                ataque: `O email tinha o layout idêntico ao da CTT, incluindo o logótipo correto e números de tracking parecidos com os reais. Dizia que uma encomenda estava retida na alfândega e precisava de pagamento de 3,50€ para libertação.
                
                O Rui estava à espera de várias encomendas para a loja naquela semana e, sem pensar duas vezes, clicou no PDF.`,
                erro: 'Abrir o PDF anexo sem verificar. O PDF continha um script malicioso que instalou ransomware no computador da loja.',
                licao: 'Nunca abrir anexos inesperados, mesmo que pareçam de transportadoras. Verificar sempre o estado das encomendas diretamente no site oficial, digitando o URL manualmente.',
                prevencao: 'A partir desse incidente, o Rui instalou software de segurança que bloqueia macros e scripts em PDFs, e criou uma política de nunca abrir anexos sem confirmar por telefone.',
                frase: '"Três euros e cinquenta cêntimos... Parecia tão pouco. O prejuízo real foram milhares." - Rui',
                consequencia: 'Ransomware que encriptou todo o sistema. A loja ficou offline por 2 semanas, com prejuízo estimado de 25.000€ entre perda de vendas e recuperação.'
            },
            {
                id: 'story3',
                titulo: 'O Perfil Falso no LinkedIn',
                empresa: 'Empresa de Recrutamento, Braga',
                data: 'Maio 2024',
                cargo: 'Gestora de RH',
                vitima: 'Sofia, 35 anos',
                cenario: 'A Sofia, gestora de RH numa empresa de tecnologia em Braga, recebeu uma mensagem no LinkedIn de um "recrutador" oferecendo um pacote de candidatos pré-selecionados.',
                ataque: `O perfil parecia legítimo - tinha foto profissional, conexões em comum, e até recomendações. O "recrutador" propôs uma parceria exclusiva e pediu acesso à base de dados de currículos da empresa para "cruzar informações".
                
                A conversa durou duas semanas, com várias trocas de mensagens e uma videochamada onde o "recrutador" apareceu brevemente (usando deepfake) antes de "problemas de conexão".`,
                erro: 'A Sofia partilhou acesso à base de dados de currículos, que continha informações pessoais de milhares de candidatos (NIF, moradas, cópias de cartão de cidadão).',
                licao: 'Verificar sempre a identidade de contactos profissionais através de canais oficiais. Empresas legítimas não pedem acesso a bases de dados de parceiros.',
                prevencao: 'A empresa implementou autenticação de dois fatores para acesso à base de dados e passou a exigir contratos formais assinados digitalmente antes de qualquer partilha de dados.',
                frase: '"Ele parecia tão profissional, tinha até artigos publicados. Foi tudo fabricado." - Sofia',
                consequencia: 'Vazamento de dados de 15.000 candidatos. Multa da CNPD de 150.000€ por violação do RGPD.'
            },
            {
                id: 'story4',
                titulo: 'O SMS do Banco',
                empresa: 'Cliente Bancário, Faro',
                data: 'Julho 2024',
                cargo: 'Reformado',
                vitima: 'Sr. António, 72 anos',
                cenario: 'O Sr. António, reformado em Faro, recebeu um SMS do "seu banco" informando que a conta tinha sido bloqueada por atividades suspeitas.',
                ataque: `A mensagem parecia vir do número oficial do banco (usando spoofing) e incluía um link para "reativar a conta". O site era uma cópia perfeita do site do banco, pedindo código de acesso e cartão matriz.
                
                O Sr. António ficou preocupado - era dia de pagamento da reforma - e clicou no link, inserindo os dados como "medida de segurança".`,
                erro: 'Inserir dados bancários num link recebido por SMS. Os bancos nunca pedem códigos de matriz por mensagem.',
                licao: 'Nunca clicar em links de SMS. Se receber uma mensagem do banco, ligar sempre para a linha oficial ou verificar diretamente na app do banco.',
                prevencao: 'O banco começou a enviar alertas regulares sobre SMS fraudulentos e o Sr. António passou a usar apenas a app oficial para gerir a conta.',
                frase: '"Fiquei com tanto medo de perder a reforma... Acabei por perder na mesma, mas de outra forma." - Sr. António',
                consequencia: 'Perda de 3.200€ da conta. O banco reembolsou 50% como "boa fé", mas o processo demorou 4 meses.'
            },
            {
                id: 'story5',
                titulo: 'A Chamada da "AT"',
                empresa: 'Contabilista, Coimbra',
                data: 'Setembro 2024',
                cargo: 'Contabilista',
                vitima: 'Miguel, 45 anos',
                cenario: 'O Miguel, contabilista em Coimbra, recebeu uma chamada da "Autoridade Tributária" informando que a empresa de um cliente estava com dívidas e seria penhorada no dia seguinte.',
                ataque: `A chamada parecia vir do número oficial da AT. A pessoa do outro lado sabia detalhes específicos do cliente (NIF, morada fiscal, volume de negócios) e usava linguagem técnica correta.
                
                Pediu que o Miguel fizesse imediatamente um pagamento de 12.000€ para uma "conta de garantia" para evitar a penhora, prometendo regularização em 48h.`,
                erro: 'Fazer um pagamento com base numa chamada telefónica sem verificar por outros canais. A AT nunca contacta contribuintes por telefone para cobranças.',
                licao: 'Desconfiar sempre de chamadas inesperadas, mesmo que pareçam oficiais. Pedir sempre um número de processo e confirmar através do Portal das Finanças.',
                prevencao: 'O Miguel criou uma política de "nunca decidir no momento" - todas as situações urgentes são sempre verificadas por email oficial e com prazo mínimo de 24h.',
                frase: '"Ele sabia tudo do cliente... Como é que podia ser burla? Foi a lição mais cara da minha carreira." - Miguel',
                consequencia: 'O Miguel pagou 12.000€ do próprio bolso para não prejudicar o cliente. Perdeu o dinheiro e quase fechou o escritório.'
            }
        ]
    }
];

// ==================== CASOS REAIS PORTUGUESES ====================
const REAL_CASES = [
    {
        id: 'case1',
        title: 'O Golpe do CEO - Empresa Tecnológica',
        date: 'Março 2023',
        target: 'Empresa de Software em Lisboa',
        description: 'Uma empresa de software em Lisboa foi alvo de um ataque de "CEO Fraud". O departamento financeiro recebeu um email do "CEO" pedindo transferência urgente de 50.000€. O email mencionava que estava em reuniões e não podia atender telefone. A funcionária realizou a transferência. Horas depois, descobriram a fraude.',
        lesson: 'Sempre verificar pedidos financeiros urgentes através de canais alternativos, mesmo que pareçam vir de superiores.',
        redflags: ['Urgência excessiva', 'Impossibilidade de contacto', 'Pedido financeiro', 'Email ligeiramente alterado']
    },
    {
        id: 'case2',
        title: 'Falso Portal da AT - Reembolso IRS',
        date: 'Abril 2024',
        target: 'Contribuintes Portugueses',
        description: 'Milhares de portugueses receberam emails da "AT" prometendo reembolsos. Os emails continham links para sites que imitavam o Portal das Finanças, pedindo credenciais e dados bancários. Muitas vítimas perderam acesso às contas fiscais.',
        lesson: 'A AT nunca pede credenciais por email. Aceder sempre ao Portal das Finanças digitando o URL diretamente.',
        redflags: ['Email não solicitado', 'Pedido de credenciais', 'Urgência artificial', 'Link em email']
    },
    {
        id: 'case3',
        title: 'Ransomware em Hospital - Porto',
        date: 'Janeiro 2024',
        target: 'Hospital Público',
        description: 'Um hospital no Porto sofreu ataque de ransomware após funcionário abrir anexo de "fatura urgente". O malware encriptou sistemas críticos. Hospital operou manualmente por 3 dias. Custos: centenas de milhares de euros.',
        lesson: 'Nunca abrir anexos inesperados. Verificar sempre com remetente por outro canal.',
        redflags: ['Anexo inesperado', 'Urgência', 'Dia atarefado', 'Falta de verificação']
    }
];

// ==================== BADGES DE CONQUISTA ====================
const BADGES = [
    { id: 'first_steps', name: 'Primeiros Passos', icon: '🎯', description: 'Complete o primeiro módulo', condition: (user) => user.completedModules.length >= 1 },
    { id: 'perfect_score', name: 'Pontuação Perfeita', icon: '💯', description: 'Obtenha 100% num quiz', condition: (user) => Object.values(user.scores).some(s => s === 100) },
    { id: 'halfway', name: 'A Meio Caminho', icon: '⭐', description: 'Complete 5 módulos', condition: (user) => user.completedModules.length >= 5 },
    { id: 'expert', name: 'Especialista', icon: '🏆', description: 'Complete todos os módulos', condition: (user) => user.completedModules.length >= MODULES.length },
    { id: 'quick_learner', name: 'Aprendiz Rápido', icon: '⚡', description: 'Complete 3 módulos num dia', condition: (user) => false },
    { id: 'high_achiever', name: 'Alto Desempenho', icon: '🌟', description: 'Mantenha 90%+ de média', condition: (user) => calculateAverage(user.scores) >= 90 },
    { id: 'security_champion', name: 'Campeão Segurança', icon: '🛡️', description: 'Complete com 95%+', condition: (user) => calculateAverage(user.scores) >= 95 },
    { id: 'knowledge_seeker', name: 'Buscador Conhecimento', icon: '📚', description: 'Visite a biblioteca', condition: (user) => user.visitedLibrary }
];

// ==================== HELPER FUNCTIONS ====================

// Calcular média de scores
function calculateAverage(scores) {
    if (!scores || Object.keys(scores).length === 0) return 0;
    const values = Object.values(scores);
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
}

// Sanitizar email para Firebase key
function sanitizeEmail(email) {
    return email.replace(/\./g, '_').replace(/@/g, '_at_');
}

// Gerar código único
function generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Gerar chave de ativação
function generateActivationKey() {
    const parts = [];
    for (let i = 0; i < 4; i++) {
        parts.push(generateCode(4));
    }
    return parts.join('-');
}

// Calcular progresso
function calculateProgress(user) {
    if (!user || !user.completedModules || user.completedModules.length === 0) return 0;
    return Math.round((user.completedModules.length / MODULES.length) * 100);
}

// Verificar badges
function checkBadges(user) {
    const earned = [];
    if (!user) return earned;
    
    BADGES.forEach(badge => {
        if (!user.badges || !user.badges.includes(badge.id)) {
            try {
                if (badge.condition(user)) {
                    earned.push(badge.id);
                }
            } catch (e) {
                console.log('Error checking badge condition:', e);
            }
        }
    });
    return earned;
}

// ==================== UI FUNCTIONS ====================

// Show/Hide elementos
function show(id) {
    const element = document.getElementById(id);
    if (element) element.classList.remove('hidden');
}

function hide(id) {
    const element = document.getElementById(id);
    if (element) element.classList.add('hidden');
}

// Mostrar tipo de login
function showLoginType(type) {
    const userForm = document.getElementById('userLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const tabUser = document.getElementById('tabUser');
    const tabAdmin = document.getElementById('tabAdmin');

    if (type === 'user') {
        show('userLoginForm');
        hide('adminLoginForm');
        tabUser.classList.add('active');
        tabAdmin.classList.remove('active');
        hide('adminExtraFields');
    } else {
        hide('userLoginForm');
        show('adminLoginForm');
        tabUser.classList.remove('active');
        tabAdmin.classList.add('active');
    }
}

// ==================== NAVIGATION ====================

function hideAllPages() {
    const pages = ['loginPage', 'dashboardPage', 'modulesPage'];
    pages.forEach(page => hide(page));
    
    // Esconder conteúdo dinâmico também
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) dynamicContent.innerHTML = '';
}

function goToDashboard() {
    hideAllPages();
    show('dashboardPage');
    loadDashboard();
}

function goToModules() {
    hideAllPages();
    show('modulesPage');
    loadModules();
}

function goToSimulator() {
    hideAllPages();
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 1.8rem; font-weight: 700;">🎮 Simulador de Phishing</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                
                <p style="color: var(--gray-500); margin-bottom: 2rem;">
                    Teste os seus conhecimentos com cenários realistas. Identifique tentativas de phishing em diferentes situações do dia a dia.
                </p>
                
                <!-- Estatísticas do Simulador -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📊</div>
                        <div style="font-weight: 600;">${USER.simulationsCompleted?.length || 0}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Simulações Feitas</div>
                    </div>
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎯</div>
                        <div style="font-weight: 600;">${USER.xp || 0}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">XP Total</div>
                    </div>
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🏆</div>
                        <div style="font-weight: 600;">${USER.badges?.length || 0}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Badges</div>
                    </div>
                </div>
                
                <!-- Seleção de Cenário -->
                <h3 style="margin-bottom: 1rem;">Escolha um Cenário para Simular</h3>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div class="simulator-card" onclick="startSimulation('email')" style="cursor: pointer; background: white; border: 2px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; text-align: center; transition: all 0.3s;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">📧</div>
                        <h4 style="margin-bottom: 0.5rem;">Email Phishing</h4>
                        <p style="font-size: 0.875rem; color: var(--gray-500);">Identifique emails fraudulentos</p>
                        <div style="margin-top: 1rem;">
                            <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                +50 XP
                            </span>
                        </div>
                    </div>
                    
                    <div class="simulator-card" onclick="startSimulation('sms')" style="cursor: pointer; background: white; border: 2px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">📱</div>
                        <h4 style="margin-bottom: 0.5rem;">Smishing</h4>
                        <p style="font-size: 0.875rem; color: var(--gray-500);">SMS fraudulentos</p>
                        <div style="margin-top: 1rem;">
                            <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                +50 XP
                            </span>
                        </div>
                    </div>
                    
                    <div class="simulator-card" onclick="startSimulation('web')" style="cursor: pointer; background: white; border: 2px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌐</div>
                        <h4 style="margin-bottom: 0.5rem;">Website Falso</h4>
                        <p style="font-size: 0.875rem; color: var(--gray-500);">Detete páginas fraudulentas</p>
                        <div style="margin-top: 1rem;">
                            <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                +50 XP
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Área de Simulação -->
                <div id="simulationArea" class="hidden" style="margin-top: 2rem;">
                    <div style="background: var(--gray-50); border: 2px solid var(--primary-200); border-radius: var(--radius-lg); padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h3 id="simulationTitle" style="color: var(--primary-700); margin: 0;">Simulação</h3>
                            <button class="btn btn-sm btn-outline" onclick="resetSimulation()">Reiniciar</button>
                        </div>
                        
                        <div id="simulationContent"></div>
                        
                        <div id="simulationFeedback" class="hidden" style="margin-top: 2rem; padding: 1.5rem; border-radius: var(--radius);"></div>
                        
                        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                            <button class="btn btn-secondary" onclick="resetSimulation()">Tentar Outro Cenário</button>
                        </div>
                    </div>
                </div>
                
                <!-- Histórico de Simulações -->
                <div style="margin-top: 3rem;">
                    <h4 style="margin-bottom: 1rem;">📋 Histórico de Simulações</h4>
                    <div id="simulationHistory" style="background: var(--gray-50); border-radius: var(--radius); padding: 1rem;">
                        ${renderSimulationHistory()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==================== STORYTELLING FUNCTIONS ====================

function openStoryModule(module) {
    const content = document.getElementById('dynamicContent');
    
    let storiesHtml = '';
    module.stories.forEach((story, index) => {
        storiesHtml += `
            <div class="story-card" id="story-${story.id}" style="margin-bottom: 2rem; scroll-margin-top: 100px;">
                <div class="story-header" onclick="toggleStory('${story.id}')" style="cursor: pointer; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; transition: all 0.3s;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600;">
                                    Caso ${index + 1} de ${module.stories.length}
                                </span>
                                <span style="background: var(--gray-100); color: var(--gray-600); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                    ${story.data}
                                </span>
                            </div>
                            <h3 style="font-size: 1.3rem; color: var(--gray-900);">${story.titulo}</h3>
                            <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                                ${story.empresa} • ${story.cargo}
                            </p>
                        </div>
                        <span class="story-toggle" style="font-size: 1.5rem; color: var(--primary-600); transition: transform 0.3s;">
                            ▼
                        </span>
                    </div>
                </div>
                
                <div class="story-content" id="story-content-${story.id}" style="display: none; margin-top: 1rem;">
                    <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 2rem;">
                        <!-- Vítima -->
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: white; border-radius: var(--radius);">
                            <div style="width: 48px; height: 48px; background: var(--primary-100); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                👤
                            </div>
                            <div>
                                <h4 style="font-weight: 600; color: var(--gray-900);">${story.vitima}</h4>
                                <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0;">${story.cargo}</p>
                            </div>
                        </div>
                        
                        <!-- Cenário -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">🎭</span> O Cenário
                            </h5>
                            <p style="color: var(--gray-600); line-height: 1.6; background: white; padding: 1rem; border-radius: var(--radius);">
                                ${story.cenario}
                            </p>
                        </div>
                        
                        <!-- Ataque -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">⚔️</span> Como o Ataque Aconteceu
                            </h5>
                            <div style="background: var(--danger-light); color: var(--danger); padding: 1rem; border-radius: var(--radius); white-space: pre-line; line-height: 1.6;">
                                ${story.ataque}
                            </div>
                        </div>
                        
                        <!-- Erro -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">❌</span> O Erro
                            </h5>
                            <div style="background: var(--warning-light); color: var(--warning); padding: 1rem; border-radius: var(--radius);">
                                ${story.erro}
                            </div>
                        </div>
                        
                        <!-- Lição -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">💡</span> Lição Aprendida
                            </h5>
                            <div style="background: var(--success-light); color: var(--success); padding: 1rem; border-radius: var(--radius);">
                                ${story.licao}
                            </div>
                        </div>
                        
                        <!-- Prevenção -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">🛡️</span> Como Evitar
                            </h5>
                            <p style="color: var(--gray-600); background: white; padding: 1rem; border-radius: var(--radius);">
                                ${story.prevencao}
                            </p>
                        </div>
                        
                        <!-- Frase da Vítima -->
                        <div style="margin: 2rem 0; padding: 1.5rem; background: var(--primary-50); border-left: 4px solid var(--primary-500); border-radius: var(--radius); font-style: italic;">
                            <p style="color: var(--primary-700); font-size: 1rem; margin: 0;">
                                "${story.frase}"
                            </p>
                        </div>
                        
                        <!-- Consequência -->
                        <div style="background: var(--gray-800); color: white; padding: 1rem; border-radius: var(--radius);">
                            <strong>📊 Consequência:</strong> ${story.consequencia}
                        </div>
                        
                        <!-- Quiz Rápido -->
                        <div style="text-align: center; margin-top: 2rem;">
                            <button class="btn btn-outline" onclick="showStoryQuiz('${story.id}')">
                                📝 Testar Aprendizagem
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = `
        <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <button class="btn btn-outline btn-sm" onclick="goToModules()">
                        ← Voltar aos Módulos
                    </button>
                    <span class="badge" style="background: var(--primary-100); color: var(--primary-700); padding: 0.5rem 1rem; border-radius: var(--radius-full);">
                        +${module.xp} XP
                    </span>
                </div>
                
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${module.icon}</div>
                    <h2 style="font-size: 2rem; font-weight: 700;">${module.title}</h2>
                    <p style="color: var(--gray-500);">${module.description}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    ${module.content}
                </div>
                
                <div id="storiesContainer">
                    ${storiesHtml}
                </div>
                
                <!-- Quiz Container -->
                <div id="storyQuizContainer" class="hidden" style="margin-top: 2rem; padding: 2rem; background: white; border: 2px solid var(--primary-200); border-radius: var(--radius-lg);">
                    <div id="storyQuizContent"></div>
                </div>
                
                <!-- Botão de Conclusão -->
                <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--gray-200);">
                    <button class="btn btn-primary btn-lg" onclick="completeStoryModule()">
                        ✓ Marcar Módulo como Concluído
                    </button>
                    <p class="form-hint mt-2">Ganha 200 XP ao concluir o módulo</p>
                </div>
            </div>
        </div>
    `;
}

function toggleStory(storyId) {
    const content = document.getElementById(`story-content-${storyId}`);
    const header = document.querySelector(`#story-${storyId} .story-header`);
    const toggle = document.querySelector(`#story-${storyId} .story-toggle`);
    
    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        toggle.style.transform = 'rotate(180deg)';
        header.style.background = 'var(--primary-50)';
        header.style.borderColor = 'var(--primary-300)';
    } else {
        content.style.display = 'none';
        toggle.style.transform = 'rotate(0deg)';
        header.style.background = 'white';
        header.style.borderColor = 'var(--gray-200)';
    }
}

function showStoryQuiz(storyId) {
    const module = MODULES.find(m => m.id === 'mod6');
    const story = module.stories.find(s => s.id === storyId);
    if (!story) return;
    
    document.getElementById('storyQuizContainer').classList.remove('hidden');
    
    const quizContent = document.getElementById('storyQuizContent');
    quizContent.innerHTML = `
        <h3 style="margin-bottom: 1.5rem;">📝 Quiz: ${story.titulo}</h3>
        
        <div style="margin-bottom: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem;">1. Qual foi o principal erro da vítima?</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div class="quiz-option" onclick="checkStoryAnswer(this, true)">
                    ${story.erro}
                </div>
                <div class="quiz-option" onclick="checkStoryAnswer(this, false)">
                    Não tinha software antivírus atualizado
                </div>
                <div class="quiz-option" onclick="checkStoryAnswer(this, false)">
                    Não tinha seguro contratado
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem;">2. O que deveria ter feito de diferente?</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div class="quiz-option" onclick="checkStoryAnswer(this, true)">
                    ${story.licao}
                </div>
                <div class="quiz-option" onclick="checkStoryAnswer(this, false)">
                    Ignorar completamente a situação
                </div>
                <div class="quiz-option" onclick="checkStoryAnswer(this, false)">
                    Responder a pedir mais informações
                </div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <button class="btn btn-primary" onclick="submitStoryQuiz('${story.id}')">
                Verificar Respostas
            </button>
            <button class="btn btn-outline" onclick="closeStoryQuiz()" style="margin-left: 1rem;">
                Fechar
            </button>
        </div>
    `;
}

function checkStoryAnswer(element, isCorrect) {
    // Desmarcar outras opções no mesmo grupo
    const parent = element.parentElement;
    parent.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    element.classList.add('selected');
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
    
    // Guardar resposta
    if (!window.storyAnswers) window.storyAnswers = {};
    const storyId = document.querySelector('#storyQuizContent h3').textContent.split(': ')[1];
    if (!window.storyAnswers[storyId]) window.storyAnswers[storyId] = {};
    
    const questionIndex = Array.from(parent.parentElement.parentElement.children).indexOf(parent.parentElement);
    window.storyAnswers[storyId][questionIndex] = isCorrect;
}

function submitStoryQuiz(storyId) {
    if (!window.storyAnswers || !window.storyAnswers[storyId]) {
        showMessage('Por favor, responda às perguntas primeiro', 'warning');
        return;
    }
    
    const answers = window.storyAnswers[storyId];
    const correctCount = Object.values(answers).filter(v => v === true).length;
    
    let feedbackHtml = '';
    if (correctCount === 2) {
        feedbackHtml = `
            <div class="alert alert-success">
                <strong>✅ Muito bem!</strong>
                <p class="mt-2">Acertou em todas as perguntas. Ganhou 25 XP extra!</p>
            </div>
        `;
        USER.xp = (USER.xp || 0) + 25;
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
    } else {
        feedbackHtml = `
            <div class="alert alert-warning">
                <strong>📚 Continue a aprender</strong>
                <p class="mt-2">Acertou em ${correctCount} de 2 perguntas. Reveja a história e tente novamente.</p>
            </div>
        `;
    }
    
    document.getElementById('storyQuizContent').insertAdjacentHTML('beforeend', feedbackHtml);
}

function closeStoryQuiz() {
    document.getElementById('storyQuizContainer').classList.add('hidden');
    document.getElementById('storyQuizContent').innerHTML = '';
    window.storyAnswers = {};
}

function completeStoryModule() {
    if (!USER.completedModules.includes('mod6')) {
        USER.completedModules.push('mod6');
        USER.xp = (USER.xp || 0) + 200;
        
        showMessage('✅ Módulo concluído! Ganhou 200 XP', 'success');
        
        // Guardar no localStorage
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
        
        // Voltar aos módulos após 2 segundos
        setTimeout(() => {
            goToModules();
        }, 2000);
    } else {
        showMessage('Já concluiu este módulo', 'info');
    }
}

function renderSimulationHistory() {
    if (!USER.simulationsCompleted || USER.simulationsCompleted.length === 0) {
        return '<p class="text-center form-hint" style="padding: 2rem;">Ainda não fez nenhuma simulação. Escolha um cenário acima para começar!</p>';
    }
    
    return `
        <div style="max-height: 200px; overflow-y: auto;">
            ${USER.simulationsCompleted.slice(-5).reverse().map((sim, index) => `
                <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">
                    <span style="background: var(--success); width: 8px; height: 8px; border-radius: 50%;"></span>
                    <span style="flex: 1;">Simulação ${index + 1}</span>
                    <span style="color: var(--primary-600);">+50 XP</span>
                    <span style="font-size: 0.75rem; color: var(--gray-500);">${new Date(sim).toLocaleDateString('pt-PT')}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function startSimulation(type) {
    const simulationArea = document.getElementById('simulationArea');
    const simulationContent = document.getElementById('simulationContent');
    const simulationTitle = document.getElementById('simulationTitle');
    
    simulationArea.classList.remove('hidden');
    document.getElementById('simulationFeedback').classList.add('hidden');
    
    // Animar scroll para a área de simulação
    simulationArea.scrollIntoView({ behavior: 'smooth' });
    
    if (type === 'email') {
        simulationTitle.innerHTML = '📧 Simulação: Email de Phishing';
        simulationContent.innerHTML = `
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                    <span style="background: var(--gray-800); color: white; width: 32px; height: 32px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center;">@</span>
                    <div>
                        <div style="font-weight: 600;">suporte@banco-seguranca.net</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">para: cliente@email.pt</div>
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <div style="background: var(--warning-light); color: var(--warning); padding: 0.5rem; border-radius: var(--radius); display: inline-block; font-size: 0.75rem; font-weight: 600;">
                        URGENTE
                    </div>
                    <h4 style="margin: 0.75rem 0;">Atualização de Segurança Necessária</h4>
                </div>
                
                <div style="margin-bottom: 1.5rem; line-height: 1.6;">
                    <p>Prezado cliente,</p>
                    <p>Detetamos atividades suspeitas na sua conta. Para evitar o bloqueio permanente, clique no link abaixo e confirme os seus dados no prazo máximo de 24 horas:</p>
                    
                    <div style="background: var(--gray-100); padding: 1rem; border-radius: var(--radius); font-family: var(--font-mono); font-size: 0.875rem; word-break: break-all; margin: 1rem 0;">
                        https://banc0-portugal.com-verificacao-segura.tk/atualizar-conta/3847hjdf
                    </div>
                    
                    <p style="background: var(--danger-light); color: var(--danger); padding: 0.75rem; border-radius: var(--radius);">
                        ⚠️ A não realização deste procedimento resultará no encerramento da sua conta.
                    </p>
                    
                    <p>Atenciosamente,<br>Departamento de Segurança</p>
                </div>
                
                <div style="background: var(--gray-100); padding: 1rem; border-radius: var(--radius);">
                    <p style="font-weight: 600; margin-bottom: 1rem;">Este email é phishing? Identifique os sinais:</p>
                    <div id="simulationOptions" style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, true)">
                            ✅ Sim, é phishing (remetente suspeito, URL enganador, urgência artificial)
                        </div>
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, false)">
                            ❌ Não, é legítimo (parece oficial do banco)
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'sms') {
        simulationTitle.innerHTML = '📱 Simulação: SMS Fraudulento (Smishing)';
        simulationContent.innerHTML = `
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="background: var(--gray-900); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        📱
                    </div>
                    <div>
                        <div style="font-weight: 600;">CTT Expresso</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">+351 912 345 678 • Hoje, 14:32</div>
                    </div>
                </div>
                
                <div style="background: var(--gray-100); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">
                    <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">A sua encomenda #CT987654321 aguarda pagamento de 2,50€ para libertação na alfândega.</p>
                    <p style="color: var(--primary-600); font-family: var(--font-mono); font-size: 0.875rem;">Pagamento: ctt-portal.com/pay-9a7f3</p>
                    <p style="font-size: 0.75rem; color: var(--gray-500); margin-top: 0.5rem;">Toque para pagar com MB Way</p>
                </div>
                
                <div class="alert alert-warning" style="margin-bottom: 1.5rem;">
                    <strong>🚨 Contexto:</strong> Está à espera de uma encomenda esta semana.
                </div>
                
                <div style="background: var(--gray-100); padding: 1rem; border-radius: var(--radius);">
                    <p style="font-weight: 600; margin-bottom: 1rem;">Esta SMS é fraudulenta?</p>
                    <div id="simulationOptions" style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, true)">
                            ✅ Sim, é smishing (CTT não pede pagamentos assim)
                        </div>
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, false)">
                            ❌ Não, é legítimo (tem tracking number)
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'web') {
        simulationTitle.innerHTML = '🌐 Simulação: Website Falso';
        simulationContent.innerHTML = `
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="background: linear-gradient(135deg, var(--primary-600), var(--primary-800)); color: white; padding: 1.5rem; border-radius: var(--radius) var(--radius) 0 0; margin: -1.5rem -1.5rem 1.5rem -1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.5rem;">🔐</span>
                        <span style="font-weight: 600;">Banco de Portugal • Área de Cliente</span>
                    </div>
                </div>
                
                <div style="background: var(--gray-100); padding: 0.75rem; border-radius: var(--radius); font-family: var(--font-mono); font-size: 0.875rem; margin-bottom: 1.5rem;">
                    <span style="color: var(--success);">🔒 https://</span>
                    <span style="color: var(--gray-600);">bancoportugal.com-verificacao-segura.tk/login</span>
                </div>
                
                <div class="alert alert-danger" style="margin-bottom: 1.5rem;">
                    <strong>⚠️ ALERTA DE SEGURANÇA:</strong> Detetamos atividade suspeita. Confirme os seus dados imediatamente.
                </div>
                
                <div style="background: var(--gray-50); padding: 1.5rem; border-radius: var(--radius);">
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">NIB</label>
                        <input type="text" class="form-input" value="0035 0123 45678901234 5" disabled style="background: var(--gray-200);">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Código de Acesso</label>
                        <input type="password" class="form-input" value="••••••" disabled style="background: var(--gray-200);">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Cartão Matriz (posição 4,7)</label>
                        <input type="text" class="form-input" placeholder="___ ___" disabled style="background: var(--gray-200);">
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" disabled>Confirmar Acesso</button>
                </div>
                
                <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--gray-200);">
                    <p style="font-weight: 600; margin-bottom: 1rem;">Este website é legítimo?</p>
                    <div id="simulationOptions" style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, false)">
                            ❌ Não, o URL é suspeito (domínio .tk)
                        </div>
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, true)">
                            ✅ Sim, tem cadeado HTTPS e parece oficial
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function checkSimulationAnswer(element, isCorrect) {
    // Desmarcar opções anteriores
    document.querySelectorAll('#simulationOptions .quiz-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Marcar opção clicada
    element.classList.add('selected');
    
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
    
    // Mostrar feedback
    const feedback = document.getElementById('simulationFeedback');
    feedback.classList.remove('hidden');
    
    if (isCorrect) {
        feedback.className = 'alert alert-success';
        feedback.innerHTML = `
            <strong>✅ Correto!</strong>
            <p class="mt-2">Identificou corretamente o phishing. Ganhou 50 XP por esta simulação.</p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                    🔍 Observador atento
                </span>
            </div>
        `;
        
        // Adicionar XP ao utilizador
        USER.xp = (USER.xp || 0) + 50;
        if (!USER.simulationsCompleted) USER.simulationsCompleted = [];
        USER.simulationsCompleted.push(Date.now());
        
        // Guardar no localStorage
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
        
        // Atualizar histórico
        const historyDiv = document.getElementById('simulationHistory');
        if (historyDiv) {
            historyDiv.innerHTML = renderSimulationHistory();
        }
        
        // Verificar se ganhou badge
        if (USER.simulationsCompleted.length === 5) {
            showMessage('🏆 Badge desbloqueado: Detetive Digital!', 'success');
        }
    } else {
        feedback.className = 'alert alert-danger';
        feedback.innerHTML = `
            <strong>❌ Incorreto</strong>
            <p class="mt-2">Isto é phishing! Sinais a identificar:</p>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>Remetente suspeito</li>
                <li>URL enganador</li>
                <li>Urgência artificial</li>
                <li>Pedido de dados pessoais</li>
            </ul>
            <p class="mt-2">Continue a praticar para melhorar!</p>
        `;
    }
}

function resetSimulation() {
    document.getElementById('simulationArea').classList.add('hidden');
    document.getElementById('simulationFeedback').classList.add('hidden');
    
    // Dar XP de tentativa (pequeno)
    USER.xp = (USER.xp || 0) + 5;
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    
    showMessage('➕ Ganhou 5 XP por praticar!', 'info');
}

function startSimulation(type) {
    const simulationArea = document.getElementById('simulationArea');
    simulationArea.classList.remove('hidden');
    
    let simulationHtml = '';
    
    if (type === 'email') {
        simulationHtml = `
            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px;">
                <h3 style="margin-bottom: 1.5rem; color: var(--accent-cyan);">📧 Simulação: Email de Phishing</h3>
                
                <div style="background: #1a1f3a; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                    <p><strong>De:</strong> <span style="color: #ff6b35;">suporte@banco-seguranca.net</span></p>
                    <p><strong>Assunto:</strong> <span style="color: #ffb800;">URGENTE: Atualização de Segurança Necessária</span></p>
                    <hr style="border-color: var(--border); margin: 1rem 0;">
                    <p>Prezado cliente,</p>
                    <p>Detectamos atividades suspeitas na sua conta. Para evitar o bloqueio, clique no link abaixo e confirme seus dados:</p>
                    <p style="background: rgba(255,71,87,0.1); padding: 0.5rem; border-radius: 4px; text-align: center;">
                        https://banc0-portugal.com-verificacao.tk/atualizar
                    </p>
                    <p>Este é um processo urgente que deve ser concluído em 24 horas.</p>
                    <p>Atenciosamente,<br>Departamento de Segurança</p>
                </div>
                
                <div style="margin: 2rem 0;">
                    <p style="font-weight: 600; margin-bottom: 1rem;">Este email é phishing? Identifique os sinais:</p>
                    <div id="simulationOptions">
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, true)">
                            ✅ Sim, é phishing (remetente suspeito, URL enganador, urgência)
                        </div>
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, false)">
                            ❌ Não, é legítimo (parece oficial)
                        </div>
                    </div>
                </div>
                
                <div id="simulationFeedback" class="hidden" style="margin-top: 1.5rem; padding: 1rem; border-radius: 8px;"></div>
            </div>
        `;
    } else if (type === 'sms') {
        simulationHtml = `
            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px;">
                <h3 style="margin-bottom: 1.5rem; color: var(--accent-cyan);">📱 Simulação: SMS Fraudulento (Smishing)</h3>
                
                <div style="background: #1a1f3a; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; max-width: 300px; margin-left: auto; margin-right: auto;">
                    <div style="background: #2a2f4a; border-radius: 8px; padding: 1rem;">
                        <p style="color: #00d9ff;">📱 +351 912 345 678</p>
                        <p style="font-size: 1.2rem; margin: 1rem 0;">A sua encomenda CTT aguarda pagamento de 2.50€ para libertação. Pagamento pendente: ctt-portal.com/pay-9a7f3</p>
                        <p style="color: var(--text-secondary); font-size: 0.8rem;">Hoje, 14:32</p>
                    </div>
                </div>
                
                <div style="margin: 2rem 0;">
                    <p style="font-weight: 600; margin-bottom: 1rem;">Esta SMS é fraudulenta?</p>
                    <div id="simulationOptions">
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, true)">
                            ✅ Sim, é smishing (CTT não pede pagamentos assim)
                        </div>
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, false)">
                            ❌ Não, é legítimo
                        </div>
                    </div>
                </div>
                
                <div id="simulationFeedback" class="hidden" style="margin-top: 1.5rem; padding: 1rem; border-radius: 8px;"></div>
            </div>
        `;
    } else if (type === 'web') {
        simulationHtml = `
            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px;">
                <h3 style="margin-bottom: 1.5rem; color: var(--accent-cyan);">🌐 Simulação: Website Falso</h3>
                
                <div style="background: #1a1f3a; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                    <div style="text-align: center; margin-bottom: 1rem;">
                        <div style="background: #00d9ff; width: 50px; height: 50px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">🔐</div>
                        <h4 style="margin-top: 0.5rem;">Banco de Portugal</h4>
                    </div>
                    
                    <div style="background: #2a2f4a; padding: 0.75rem; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; margin-bottom: 1rem;">
                        🔒 https://bancoportugal.com-verificacao-segura.tk/login
                    </div>
                    
                    <div style="margin: 1.5rem 0;">
                        <p style="background: rgba(255,107,35,0.1); padding: 0.75rem; border-left: 4px solid #ff6b35;">
                            ⚠️ "Detectamos atividade suspeita na sua conta. Por favor, verifique seus dados imediatamente."
                        </p>
                    </div>
                    
                    <div style="background: #2a2f4a; padding: 1rem; border-radius: 8px;">
                        <input type="text" placeholder="NIB" style="width: 100%; margin-bottom: 0.5rem;" disabled>
                        <input type="password" placeholder="Senha" style="width: 100%; margin-bottom: 0.5rem;" disabled>
                        <button style="width: 100%; background: #64748b; cursor: not-allowed;" disabled>Entrar</button>
                    </div>
                </div>
                
                <div style="margin: 2rem 0;">
                    <p style="font-weight: 600; margin-bottom: 1rem;">Este website é legítimo?</p>
                    <div id="simulationOptions">
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, false)">
                            ❌ Não, o URL é suspeito
                        </div>
                        <div class="quiz-option" onclick="checkSimulationAnswer(this, true)">
                            ✅ Sim, parece do banco
                        </div>
                    </div>
                </div>
                
                <div id="simulationFeedback" class="hidden" style="margin-top: 1.5rem; padding: 1rem; border-radius: 8px;"></div>
            </div>
        `;
    }
    
    simulationArea.innerHTML = simulationHtml;
}

function checkSimulationAnswer(element, isCorrect) {
    // Desmarcar opções anteriores
    document.querySelectorAll('#simulationOptions .quiz-option').forEach(opt => {
        opt.style.borderColor = 'var(--border)';
        opt.style.background = 'rgba(255,255,255,0.05)';
    });
    
    // Marcar opção clicada
    element.style.borderColor = isCorrect ? 'var(--success)' : 'var(--danger)';
    element.style.background = isCorrect ? 'rgba(0,255,163,0.15)' : 'rgba(255,71,87,0.15)';
    
    // Mostrar feedback
    const feedback = document.getElementById('simulationFeedback');
    feedback.classList.remove('hidden');
    
    if (isCorrect) {
        feedback.style.background = 'rgba(0,255,163,0.1)';
        feedback.style.borderLeft = '4px solid var(--success)';
        feedback.innerHTML = `
            <p style="color: var(--success); font-weight: 600;">✅ Correto! Identificou o phishing.</p>
            <p style="margin-top: 0.5rem;">Ganhou 50 XP por esta simulação!</p>
            <button onclick="continueSimulation()" style="margin-top: 1rem;">Continuar</button>
        `;
        
        // Adicionar XP ao usuário
        USER.xp = (USER.xp || 0) + 50;
        if (!USER.simulationsCompleted) USER.simulationsCompleted = [];
        USER.simulationsCompleted.push(Date.now());
        
        // Salvar no localStorage
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
    } else {
        feedback.style.background = 'rgba(255,71,87,0.1)';
        feedback.style.borderLeft = '4px solid var(--danger)';
        feedback.innerHTML = `
            <p style="color: var(--danger); font-weight: 600;">❌ Incorreto. Isto é phishing!</p>
            <p style="margin-top: 0.5rem;">Sinais a identificar: remetente suspeito, URL enganador, urgência artificial.</p>
            <button onclick="continueSimulation()" style="margin-top: 1rem;">Tentar outro</button>
        `;
    }
}

function continueSimulation() {
    document.getElementById('simulationArea').classList.add('hidden');
    document.getElementById('simulationFeedback').classList.add('hidden');
}

function goToBadges() {
    hideAllPages();
    loadBadgesPage();
}

function goToLibrary() {
    hideAllPages();
    loadLibraryPage();
}

function goToCertificate() {
    hideAllPages();
    loadCertificatePage();
}

function goToAdmin() {
    if (!USER.isAdmin) return;
    hideAllPages();
    loadAdminPage();
}

// ==================== LOGIN FUNCTIONS ====================

async function doUserLogin() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim().toLowerCase();
    const activationKey = document.getElementById('activationKey').value.trim();
    const companyCode = document.getElementById('companyCode').value.trim();

    if (!name || !email) {
        showMessage('Por favor, preencha nome e email', 'error');
        return;
    }

    try {
        const userKey = sanitizeEmail(email);
        const userRef = database.ref(`employees/${userKey}`);
        const snapshot = await userRef.once('value');

        if (snapshot.exists()) {
            // Existing user
            const userData = snapshot.val();
            USER = { ...USER, ...userData, email, isAdmin: false };
            
            // Update last activity
            await userRef.update({ lastActivity: new Date().toISOString() });
            
            onLoginSuccess();
        } else {
            // New user
            await createNewUser(name, email, activationKey, companyCode || generateCode(8));
            onLoginSuccess();
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Erro ao fazer login. Tente novamente.', 'error');
    }
}

async function createNewUser(name, email, activationKey, companyCode) {
    const userKey = sanitizeEmail(email);
    const newUser = {
        name,
        email,
        companyCode: companyCode,
        xp: 0,
        scores: {},
        badges: [],
        completedModules: [],
        simulationsCompleted: [],
        startDate: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        hasSeenWelcome: false,
        activationKey,
        keyType: 'basic'
    };

    await database.ref(`employees/${userKey}`).set(newUser);
    USER = { ...USER, ...newUser, email, isAdmin: false };
}

async function validateActivationKey(key) {
    if (!key || key.trim() === '') return false;
    
    try {
        const keysRef = database.ref('activationKeys');
        const snapshot = await keysRef.once('value');
        
        if (!snapshot.exists()) return false;
        
        const keys = snapshot.val();
        
        for (let keyId in keys) {
            const keyData = keys[keyId];
            
            // Verificar se a chave corresponde
            if (keyData.key === key) {
                // Verificar se não expirou
                const expiryDate = new Date(keyData.expiresAt);
                if (expiryDate > new Date()) {
                    // Verificar se ainda tem licenças disponíveis
                    if (keyData.usedCount < keyData.licenses) {
                        // Atualizar contagem de uso
                        await database.ref(`activationKeys/${keyId}`).update({
                            usedCount: (keyData.usedCount || 0) + 1
                        });
                        return true;
                    } else {
                        showMessage('Chave sem licenças disponíveis', 'warning');
                        return false;
                    }
                } else {
                    showMessage('Chave expirada', 'warning');
                    return false;
                }
            }
        }
        
        return false;
    } catch (error) {
        console.error('Error validating key:', error);
        return false;
    }
}

async function doAdminLogin() {
    const email = document.getElementById('adminEmail').value.trim().toLowerCase();
    const password = document.getElementById('adminPass').value;
    const name = document.getElementById('adminName')?.value.trim();
    const companyName = document.getElementById('companyName')?.value.trim();

    if (!email || !password) {
        showMessage('Preencha email e senha', 'error');
        return;
    }

    try {
        const adminKey = sanitizeEmail(email);
        const adminRef = database.ref(`admins/${adminKey}`);
        const snapshot = await adminRef.once('value');

        if (snapshot.exists()) {
            // Admin existente
            const adminData = snapshot.val();
            // Verificar senha (em produção, use hash)
            if (adminData.password === password) {
                USER = {
                    ...USER,
                    ...adminData,
                    email,
                    isAdmin: true
                };
                
                // Carregar dados da empresa
                const companyRef = database.ref(`companies/${adminData.companyCode}`);
                const companySnapshot = await companyRef.once('value');
                if (companySnapshot.exists()) {
                    COMPANY = companySnapshot.val();
                    COMPANY.code = adminData.companyCode;
                }
                
                onLoginSuccess();
            } else {
                showMessage('Senha incorreta', 'error');
            }
        } else {
            // Primeiro admin - verificar campos adicionais
            const adminExtraFields = document.getElementById('adminExtraFields');
            
            if (!adminExtraFields.classList.contains('hidden')) {
                // Já estávamos mostrando os campos extras
                if (!name || !companyName) {
                    showMessage('Preencha nome e nome da empresa', 'error');
                    return;
                }
                
                // Criar novo admin
                await createNewAdmin(email, password, name, companyName);
            } else {
                // Mostrar campos extras para primeiro registro
                show('adminExtraFields');
                showMessage('Complete o registo inicial da empresa', 'info');
            }
        }
    } catch (error) {
        console.error('Admin login error:', error);
        showMessage('Erro ao fazer login: ' + error.message, 'error');
    }
}

async function createNewAdmin(email, password, name, companyName) {
    try {
        const companyCode = generateCode(8);
        const adminKey = sanitizeEmail(email);
        
        // Criar registro do admin
        const newAdmin = {
            name,
            email,
            password, // NOTA: Em produção, hash a senha!
            companyCode,
            createdAt: new Date().toISOString(),
            isAdmin: true
        };
        
        await database.ref(`admins/${adminKey}`).set(newAdmin);
        
        // Criar registro da empresa
        const newCompany = {
            name: companyName,
            adminEmail: email,
            adminName: name,
            code: companyCode,
            createdAt: new Date().toISOString(),
            settings: {
                minCertificateScore: 80,
                mandatoryModules: MODULES.slice(0, 5).map(m => m.id)
            },
            employees: {}
        };
        
        await database.ref(`companies/${companyCode}`).set(newCompany);
        
        // Atualizar USER global
        USER = {
            ...USER,
            ...newAdmin,
            email,
            isAdmin: true,
            companyCode
        };
        
        COMPANY = newCompany;
        
        showMessage('Empresa registada com sucesso!', 'success');
        onLoginSuccess();
        
    } catch (error) {
        console.error('Error creating admin:', error);
        showMessage('Erro ao criar administrador: ' + error.message, 'error');
    }
}

function onLoginSuccess() {
    hide('loginPage');
    show('navbar');
    
    // Mostrar botões apropriados
    if (USER.isAdmin) {
        document.getElementById('btnAdmin').classList.remove('hidden');
        document.getElementById('btnCert').classList.add('hidden');
    } else {
        document.getElementById('btnCert').classList.remove('hidden');
        document.getElementById('btnAdmin').classList.add('hidden');
        
        // Verificar se já viu welcome
        if (!USER.hasSeenWelcome) {
            showWelcomePopup();
        } else {
            goToDashboard();
        }
    }
    
    // Salvar no localStorage para persistência
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
}

function logout() {
    localStorage.removeItem('phishguard_user');
    USER = {
        id: '', name: '', email: '', isAdmin: false, companyCode: '',
        xp: 0, scores: {}, badges: [], completedModules: [],
        simulationsCompleted: [], startDate: null, lastActivity: null,
        hasSeenWelcome: false, activationKey: '', keyType: 'basic'
    };
    
    hide('navbar');
    hideAllPages();
    
    // Esconder botões específicos
    document.getElementById('btnAdmin').classList.add('hidden');
    document.getElementById('btnCert').classList.add('hidden');
    
    show('loginPage');
    
    // Reset forms
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('activationKey').value = '';
    document.getElementById('companyCode').value = '';
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminName').value = '';
    document.getElementById('companyName').value = '';
    
    showLoginType('user');
}

// ==================== DASHBOARD ====================

async function loadDashboard() {
    document.getElementById('dashName').textContent = USER.name ? USER.name.split(' ')[0] : 'Utilizador';
    document.getElementById('dashCompany').textContent = USER.companyCode ? `Empresa: ${USER.companyCode}` : 'PhishGuard Elite';
    
    // Stats
    document.getElementById('dashXP').textContent = USER.xp || 0;
    document.getElementById('dashMods').textContent = `${USER.completedModules.length}/${MODULES.length}`;
    document.getElementById('dashBadges').textContent = `${USER.badges.length}/${BADGES.length}`;
    
    const avgScore = calculateAverage(USER.scores);
    document.getElementById('dashSuccess').textContent = `${avgScore}%`;
    
    // Progress
    const progress = calculateProgress(USER);
    document.getElementById('dashProgress').style.width = `${progress}%`;
    document.getElementById('dashProgressPct').textContent = progress;
}

// ==================== MODULES ====================

function loadModules() {
    const container = document.getElementById('modulesList');
    container.innerHTML = '';
    
    MODULES.forEach((module, index) => {
        const isCompleted = USER.completedModules.includes(module.id);
        const isLocked = index > 0 && !USER.completedModules.includes(MODULES[index - 1].id);
        
        const card = document.createElement('div');
        card.className = `module-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
        
        if (!isLocked) {
            card.onclick = () => openModule(module);
        }
        
        card.innerHTML = `
            <div class="module-icon">${module.icon}</div>
            <div class="module-title">${module.title}</div>
            <div class="module-description">${module.description}</div>
            <div class="module-meta">
                <span style="color: var(--text-secondary); font-size: 0.9rem;">
                    ${module.difficulty === 'beginner' ? '🟢 Iniciante' : module.difficulty === 'intermediate' ? '🟡 Intermédio' : '🔴 Avançado'}
                </span>
                ${isCompleted ? '<span style="color: var(--success);">✓ Concluído</span>' : ''}
                ${isLocked ? '<span style="color: var(--text-secondary);">🔒 Bloqueado</span>' : ''}
            </div>
            ${!isCompleted && !isLocked ? `<div style="color: var(--accent-cyan); margin-top: 0.5rem; font-weight: 600;">+${module.xp} XP</div>` : ''}
        `;
        
        container.appendChild(card);
    });
}

function openModule(module) {
     console.log('A abrir módulo:', module.id);
    
    if (module.id === 'mod6') {
        // Usar a função global
        if (typeof window.openStoryModule === 'function') {
            window.openStoryModule(module);
        } else {
            console.error('Função openStoryModule não encontrada');
            window.showMessage('Erro ao abrir módulo. Recarregue a página.', 'error');
        }
        return;
    }
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="box">
            <button onclick="goToModules()" style="background: #64748b; margin-bottom: 1.5rem;">← Voltar aos Módulos</button>
            
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${module.icon}</div>
                <h2 style="font-size: 2rem; font-weight: 700;">${module.title}</h2>
                <p style="color: var(--text-secondary);">${module.description}</p>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">📖 Conteúdo do Módulo</h3>
                <div style="color: var(--text-secondary); line-height: 1.8;">
                    ${module.content}
                </div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px;">
                <h3 style="margin-bottom: 1rem;">✍️ Quiz de Avaliação</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                    Responda às ${module.quiz.length} perguntas seguintes para completar o módulo.
                </p>
                <div id="quizContainer"></div>
                <button onclick="submitQuiz('${module.id}')" style="width: 100%; margin-top: 2rem;">
                    Submeter Respostas
                </button>
            </div>
        </div>
    `;
    
    renderQuiz(module.quiz);
    hide('modulesPage');
}

function renderQuiz(questions) {
    const container = document.getElementById('quizContainer');
    container.innerHTML = '';
    
    questions.forEach((q, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'margin-bottom: 2rem; padding: 1.5rem; background: rgba(0,217,255,0.05); border-radius: 8px; border-left: 4px solid var(--accent-cyan);';
        
        questionDiv.innerHTML = `
            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">Pergunta ${qIndex + 1} de ${questions.length}</div>
            <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem;">${q.q}</div>
            <div class="quiz-options">
                ${q.opts.map((opt, oIndex) => `
                    <div class="quiz-option" onclick="selectOption(${qIndex}, ${oIndex})" id="q${qIndex}_o${oIndex}" style="padding: 1rem; margin: 0.5rem 0; background: rgba(255,255,255,0.05); border: 2px solid var(--border); border-radius: 8px; cursor: pointer; transition: all 0.3s;">
                        <input type="radio" name="q${qIndex}" value="${oIndex}" style="margin-right: 0.75rem;">
                        ${opt}
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(questionDiv);
    });
}

function selectOption(qIndex, oIndex) {
    // Deselect all options for this question
    document.querySelectorAll(`input[name="q${qIndex}"]`).forEach(input => {
        input.checked = false;
        input.parentElement.style.borderColor = 'var(--border)';
        input.parentElement.style.background = 'rgba(255,255,255,0.05)';
    });
    
    // Select clicked option
    const option = document.getElementById(`q${qIndex}_o${oIndex}`);
    option.style.borderColor = 'var(--accent-cyan)';
    option.style.background = 'rgba(0,217,255,0.1)';
    const radio = option.querySelector('input');
    radio.checked = true;
}

async function submitQuiz(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;
    
    const answers = [];
    let allAnswered = true;
    let correctCount = 0;
    
    module.quiz.forEach((q, qIndex) => {
        const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
        if (!selected) {
            allAnswered = false;
        } else {
            const selectedIndex = parseInt(selected.value);
            const isCorrect = selectedIndex === q.correct;
            answers.push({ question: qIndex, selected: selectedIndex, correct: isCorrect });
            if (isCorrect) correctCount++;
        }
    });
    
    if (!allAnswered) {
        showMessage('Por favor, responda a todas as perguntas', 'warning');
        return;
    }
    
    const score = Math.round((correctCount / module.quiz.length) * 100);
    const xpEarned = score >= 60 ? module.xp : Math.round(module.xp / 2);
    
    // Show results
    showQuizResults(module, answers, score, xpEarned);
    
    // Update user data
    if (!USER.completedModules.includes(moduleId)) {
        USER.completedModules.push(moduleId);
    }
    USER.xp = (USER.xp || 0) + xpEarned;
    USER.scores[moduleId] = score;
    USER.lastActivity = new Date().toISOString();
    
    // Check for new badges
    const newBadges = checkBadges(USER);
    if (newBadges.length > 0) {
        USER.badges = [...(USER.badges || []), ...newBadges];
        showBadgeNotification(newBadges);
    }
    
    // Save to localStorage
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    
    // Try to save to Firebase if available
    try {
        const userKey = sanitizeEmail(USER.email);
        await database.ref(`employees/${userKey}`).update({
            completedModules: USER.completedModules,
            xp: USER.xp,
            scores: USER.scores,
            badges: USER.badges,
            lastActivity: USER.lastActivity
        });
    } catch (error) {
        console.error('Error saving quiz results to Firebase:', error);
    }
}

function showQuizResults(module, answers, score, xpEarned) {
    // Highlight correct/incorrect
    answers.forEach((answer, qIndex) => {
        const options = document.querySelectorAll(`input[name="q${qIndex}"]`);
        options.forEach((opt, oIndex) => {
            const parent = opt.parentElement;
            parent.style.pointerEvents = 'none';
            
            if (oIndex === module.quiz[qIndex].correct) {
                parent.style.borderColor = 'var(--success)';
                parent.style.background = 'rgba(0,255,163,0.15)';
            } else if (oIndex === answer.selected && !answer.correct) {
                parent.style.borderColor = 'var(--danger)';
                parent.style.background = 'rgba(255,71,87,0.15)';
            }
        });
    });
    
    // Show results summary
    const isPassing = score >= 60;
    const resultsDiv = document.createElement('div');
    resultsDiv.style.cssText = 'margin-top: 2rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px; text-align: center;';
    resultsDiv.innerHTML = `
        <h2 style="font-size: 2rem; color: ${isPassing ? 'var(--success)' : 'var(--warning)'}; margin-bottom: 1rem;">
            ${isPassing ? '🎉 Parabéns!' : '💪 Quase lá!'}
        </h2>
        <p style="font-size: 1.3rem; margin-bottom: 1rem;">
            Pontuação: <strong>${score}%</strong>
        </p>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
            ${isPassing ? 
                `Módulo concluído com sucesso! Ganhou ${xpEarned} XP.` : 
                `Continue a aprender. Ganhou ${xpEarned} XP.`
            }
        </p>
        <button onclick="goToModules()" style="margin-top: 1rem;">
            Voltar aos Módulos
        </button>
    `;
    
    document.getElementById('quizContainer').parentElement.appendChild(resultsDiv);
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==================== WELCOME POPUP ====================

function showWelcomePopup() {
    show('welcomeOverlay');
    show('welcomePopup');
}

function closeWelcomePopup() {
    hide('welcomeOverlay');
    hide('welcomePopup');
    USER.hasSeenWelcome = true;
    
    // Salvar no banco de dados (se Firebase estiver disponível)
    try {
        const userKey = sanitizeEmail(USER.email);
        database.ref(`employees/${userKey}`).update({ hasSeenWelcome: true });
    } catch (error) {
        console.log('Firebase not available, saving locally only');
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    goToDashboard();
}

function goToModulesFromWelcome() {
    closeWelcomePopup();
    goToModules();
}

// ==================== BADGES PAGE ====================

function loadBadgesPage() {
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="box">
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">🏅 Conquistas e Badges</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Complete desafios para desbloquear badges especiais
            </p>
            <div class="badge-grid" id="badgesGrid"></div>
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="goToDashboard()" class="btn-secondary">← Voltar</button>
            </div>
        </div>
    `;
    
    const grid = document.getElementById('badgesGrid');
    BADGES.forEach(badge => {
        const isEarned = USER.badges && USER.badges.includes(badge.id);
        const item = document.createElement('div');
        item.className = `badge-item ${isEarned ? 'earned' : ''}`;
        item.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <small style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 0.5rem; display: block;">
                ${badge.description}
            </small>
        `;
        grid.appendChild(item);
    });
}

function showBadgeNotification(badgeIds) {
    badgeIds.forEach(badgeId => {
        const badge = BADGES.find(b => b.id === badgeId);
        if (badge) {
            showMessage(`🏆 Nova conquista desbloqueada: ${badge.name}!`, 'success');
        }
    });
}

// ==================== LIBRARY PAGE ====================

function loadLibraryPage() {
    USER.visitedLibrary = true;
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="box">
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">📖 Biblioteca de Recursos</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Materiais de estudo e recursos adicionais
            </p>
            <div id="libraryContent"></div>
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="goToDashboard()" class="btn-secondary">← Voltar</button>
            </div>
        </div>
    `;
    
    const libraryContent = document.getElementById('libraryContent');
    
    // Guia de Referência Rápida
    const quickGuide = document.createElement('div');
    quickGuide.innerHTML = `
        <div style="background: linear-gradient(135deg, #00d9ff20, #ff6b3520); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1.5rem; font-size: 1.5rem;">📋 Guia Rápido Anti-Phishing</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                    <span style="color: #00d9ff;">🔍 VERIFIQUE</span>
                    <p style="margin-top: 0.5rem;">Sempre o remetente e URLs</p>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                    <span style="color: #ff6b35;">⚠️ DESCONFIE</span>
                    <p style="margin-top: 0.5rem;">De urgência e ofertas boas demais</p>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                    <span style="color: #00ffa3;">🛡️ PROTEJA</span>
                    <p style="margin-top: 0.5rem;">Nunca partilhe credenciais</p>
                </div>
            </div>
        </div>
    `;
    libraryContent.appendChild(quickGuide);
    
    // Casos Reais
    const casesSection = document.createElement('div');
    casesSection.innerHTML = '<h3 style="margin-bottom: 1.5rem; font-size: 1.5rem;">📋 Casos Reais de Phishing em Portugal</h3>';
    
    REAL_CASES.forEach(case_ => {
        const caseDiv = document.createElement('div');
        caseDiv.style.cssText = 'background: rgba(255,255,255,0.05); border-left: 4px solid var(--accent-orange); padding: 1.5rem; margin: 1rem 0; border-radius: 8px;';
        caseDiv.innerHTML = `
            <h4 style="color: var(--accent-orange); margin-bottom: 0.75rem;">${case_.title}</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                <strong>Data:</strong> ${case_.date} | <strong>Alvo:</strong> ${case_.target}
            </p>
            <p style="margin-bottom: 1rem; line-height: 1.6;">${case_.description}</p>
            <div style="background: rgba(0,255,163,0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid var(--success);">
                <strong style="color: var(--success);">💡 Lição Aprendida:</strong><br>
                ${case_.lesson}
            </div>
        `;
        casesSection.appendChild(caseDiv);
    });
    
    libraryContent.appendChild(casesSection);
    
    // Dicas de Segurança
    const tipsSection = document.createElement('div');
    tipsSection.innerHTML = `
        <h3 style="margin: 2rem 0 1.5rem; font-size: 1.5rem;">🔐 Dicas de Segurança</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px;">
                <span style="font-size: 2rem;">🔑</span>
                <h4 style="margin: 0.5rem 0;">Palavras-passe Fortes</h4>
                <p style="color: var(--text-secondary);">Use 12+ caracteres com maiúsculas, minúsculas, números e símbolos</p>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px;">
                <span style="font-size: 2rem;">📱</span>
                <h4 style="margin: 0.5rem 0;">2FA Sempre</h4>
                <p style="color: var(--text-secondary);">Ative autenticação de dois fatores em todas as contas</p>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px;">
                <span style="font-size: 2rem;">🔄</span>
                <h4 style="margin: 0.5rem 0;">Atualizações</h4>
                <p style="color: var(--text-secondary);">Mantenha sistemas e apps sempre atualizados</p>
            </div>
        </div>
    `;
    libraryContent.appendChild(tipsSection);
}

// ==================== CERTIFICATE PAGE ====================

function loadCertificatePage() {
    const progress = calculateProgress(USER);
    const avgScore = calculateAverage(USER.scores);
    const canGetCertificate = progress === 100 && avgScore >= 80;
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="box">
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem;">📜 Certificado de Conclusão</h2>
            ${canGetCertificate ? `
                <div style="background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%); color: #0A0E27; padding: 4rem; border-radius: 16px; text-align: center; border: 4px solid var(--accent-cyan);">
                    <h1 style="font-size: 3rem; font-weight: 900; color: var(--accent-cyan); margin-bottom: 1rem;">
                        CERTIFICADO
                    </h1>
                    <h2 style="font-size: 2rem; margin-bottom: 2rem;">de Conclusão</h2>
                    <p style="font-size: 1.2rem; margin: 2rem 0;">Certifica-se que</p>
                    <h3 style="font-size: 2.5rem; font-weight: 700; color: var(--accent-cyan); margin: 1rem 0;">
                        ${USER.name}
                    </h3>
                    <p style="font-size: 1.2rem; margin: 2rem 0;">
                        completou com sucesso a formação em<br>
                        <strong>Segurança Digital e Proteção contra Phishing</strong><br>
                        obtendo uma taxa de sucesso de <strong>${avgScore}%</strong>
                    </p>
                    <p style="margin-top: 2rem;">
                        Data de conclusão: ${new Date().toLocaleDateString('pt-PT')}<br>
                        XP Total: ${USER.xp}
                    </p>
                    <button onclick="window.print()" style="margin-top: 2rem; background: var(--accent-cyan); color: #0A0E27;">
                        🖨️ Imprimir / Guardar PDF
                    </button>
                </div>
            ` : `
                <div style="text-align: center; padding: 4rem; color: var(--text-secondary);">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Certificado Bloqueado</h3>
                    <p>Complete todos os módulos com pelo menos 80% de média para desbloquear o certificado.</p>
                    <div style="margin-top: 2rem; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px;">
                        <p><strong>Progresso atual:</strong> ${progress}%</p>
                        <p><strong>Média de pontuação:</strong> ${avgScore}%</p>
                        <p><strong>Módulos concluídos:</strong> ${USER.completedModules.length}/${MODULES.length}</p>
                    </div>
                    <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="goToModules()" style="background: var(--accent-cyan);">
                            📚 Continuar Formação
                        </button>
                        <button onclick="goToDashboard()" class="btn-secondary">
                            ← Voltar
                        </button>
                    </div>
                </div>
            `}
        </div>
    `;
}

// ==================== ADMIN PAGE ====================

function loadAdminPage() {
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="box">
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">👑 Painel de Administração</h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Código da Empresa: <code style="background: rgba(0,217,255,0.1); padding: 0.5rem 1rem; border-radius: 6px; font-family: 'JetBrains Mono', monospace;">${COMPANY.code || USER.companyCode}</code>
            </p>
            
            <div id="adminTabs" style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 2px solid var(--border);">
                <button onclick="showAdminTab('overview')" class="admin-tab active" id="tab-overview">Visão Geral</button>
                <button onclick="showAdminTab('keys')" class="admin-tab" id="tab-keys">Chaves</button>
                <button onclick="showAdminTab('employees')" class="admin-tab" id="tab-employees">Colaboradores</button>
            </div>
            
            <div id="adminTabContent"></div>
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="goToDashboard()" class="btn-secondary">← Voltar ao Dashboard</button>
            </div>
        </div>
    `;
    
    showAdminTab('overview');
}

function showAdminTab(tab) {
    // Update tabs
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    
    const content = document.getElementById('adminTabContent');
    
    if (tab === 'overview') {
        loadAdminOverview(content);
    } else if (tab === 'keys') {
        loadAdminKeys(content);
    } else if (tab === 'employees') {
        loadAdminEmployees(content);
    }
}

async function loadAdminOverview(container) {
    container.innerHTML = '<div style="text-align: center; padding: 2rem;">Carregando dados...</div>';
    
    try {
        // Load employees data
        const employeesRef = database.ref('employees');
        const snapshot = await employeesRef.once('value');
        
        let totalEmployees = 0;
        let totalProgress = 0;
        let certificatesIssued = 0;
        
        if (snapshot.exists()) {
            const employees = snapshot.val();
            for (let empKey in employees) {
                const emp = employees[empKey];
                if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                    totalEmployees++;
                    const progress = calculateProgress(emp);
                    totalProgress += progress;
                    if (progress === 100 && calculateAverage(emp.scores) >= 80) {
                        certificatesIssued++;
                    }
                }
            }
        }
        
        const avgCompletion = totalEmployees > 0 ? Math.round(totalProgress / totalEmployees) : 0;
        
        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Colaboradores</div>
                    <div class="stat-value">${totalEmployees}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Taxa Média Conclusão</div>
                    <div class="stat-value">${avgCompletion}%</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Certificados Emitidos</div>
                    <div class="stat-value">${certificatesIssued}</div>
                </div>
            </div>
            
            <h3 style="margin: 2rem 0 1rem;">📊 Colaboradores Recentes</h3>
            <div id="recentEmployees"></div>
        `;
        
        // Load recent employees
        const recentEmp = document.getElementById('recentEmployees');
        if (snapshot.exists()) {
            const employees = snapshot.val();
            let hasEmployees = false;
            
            // Convert to array and sort by lastActivity
            const empList = [];
            for (let empKey in employees) {
                const emp = employees[empKey];
                if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                    empList.push(emp);
                }
            }
            
            // Sort by lastActivity (most recent first)
            empList.sort((a, b) => {
                return new Date(b.lastActivity || 0) - new Date(a.lastActivity || 0);
            });
            
            // Show only 5 most recent
            empList.slice(0, 5).forEach(emp => {
                hasEmployees = true;
                const progress = calculateProgress(emp);
                
                const empDiv = document.createElement('div');
                empDiv.style.cssText = 'background: rgba(255,255,255,0.05); padding: 1rem; margin: 0.5rem 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;';
                empDiv.innerHTML = `
                    <div>
                        <strong>${emp.name}</strong><br>
                        <small style="color: var(--text-secondary);">${emp.email}</small>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 700; color: var(--accent-cyan);">${emp.xp || 0} XP</div>
                        <small style="color: var(--text-secondary);">${progress}% completo</small>
                    </div>
                `;
                recentEmp.appendChild(empDiv);
            });
            
            if (!hasEmployees) {
                recentEmp.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Nenhum colaborador registado ainda</p>';
            }
        } else {
            recentEmp.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Nenhum colaborador registado ainda</p>';
        }
    } catch (error) {
        console.error('Error loading admin overview:', error);
        container.innerHTML = '<p style="color: var(--danger); text-align: center;">Erro ao carregar dados</p>';
    }
}

function loadAdminKeys(container) {
    container.innerHTML = `
        <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1.5rem;">🔑 Gerar Nova Chave de Ativação</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div>
                    <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Tipo de Chave:</label>
                    <select id="keyType" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                        <option value="basic">Básica</option>
                        <option value="premium">Premium</option>
                        <option value="full">Elite</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Licenças:</label>
                    <input type="number" id="keyLicenses" value="1" min="1" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                </div>
                <div>
                    <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Validade (dias):</label>
                    <input type="number" id="keyValidity" value="90" min="1" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary);">
                </div>
            </div>
            
            <button onclick="generateKey()">🔑 Gerar Chave</button>
            
            <div id="generatedKeyDisplay" class="hidden" style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(0,217,255,0.1); border: 2px solid var(--accent-cyan); border-radius: 8px; text-align: center;">
                <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">Chave Gerada:</p>
                <code id="generatedKey" style="font-size: 1.3rem; font-family: 'JetBrains Mono', monospace; color: var(--accent-cyan);"></code>
                <br>
                <button onclick="copyKeyToClipboard()" style="margin-top: 1rem; background: #64748b;">📋 Copiar</button>
            </div>
        </div>
        
        <h3 style="margin-bottom: 1rem;">📋 Chaves Geradas</h3>
        <div id="keysList"></div>
    `;
    
    loadKeysList();
}

async function generateKey() {
    const type = document.getElementById('keyType').value;
    const licenses = parseInt(document.getElementById('keyLicenses').value);
    const validity = parseInt(document.getElementById('keyValidity').value);
    
    const key = generateActivationKey();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + validity);
    
    const keyData = {
        key,
        type,
        licenses,
        usedCount: 0,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
        companyCode: COMPANY.code || USER.companyCode
    };
    
    try {
        await database.ref('activationKeys').push(keyData);
        
        document.getElementById('generatedKey').textContent = key;
        show('generatedKeyDisplay');
        
        showMessage('Chave gerada com sucesso!', 'success');
        loadKeysList();
    } catch (error) {
        console.error('Error generating key:', error);
        showMessage('Erro ao gerar chave', 'error');
    }
}

function copyKeyToClipboard() {
    const key = document.getElementById('generatedKey').textContent;
    navigator.clipboard.writeText(key).then(() => {
        showMessage('Chave copiada!', 'success');
    }).catch(() => {
        showMessage('Erro ao copiar', 'error');
    });
}

async function loadKeysList() {
    const keysRef = database.ref('activationKeys');
    const snapshot = await keysRef.once('value');
    
    const container = document.getElementById('keysList');
    container.innerHTML = '';
    
    if (!snapshot.exists()) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Nenhuma chave gerada ainda</p>';
        return;
    }
    
    const keys = snapshot.val();
    let hasKeys = false;
    
    // Convert to array and sort by createdAt
    const keysList = [];
    for (let keyId in keys) {
        const keyData = keys[keyId];
        if (keyData.companyCode === (COMPANY.code || USER.companyCode)) {
            keysList.push({ id: keyId, ...keyData });
        }
    }
    
    // Sort by createdAt (most recent first)
    keysList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    
    keysList.forEach(keyData => {
        hasKeys = true;
        const expiryDate = new Date(keyData.expiresAt);
        const isExpired = expiryDate < new Date();
        const isFull = keyData.usedCount >= keyData.licenses;
        
        let status = 'Ativa';
        let statusColor = 'var(--success)';
        if (isExpired) {
            status = 'Expirada';
            statusColor = 'var(--danger)';
        } else if (isFull) {
            status = 'Esgotada';
            statusColor = 'var(--warning)';
        }
        
        const keyDiv = document.createElement('div');
        keyDiv.style.cssText = 'background: rgba(255,255,255,0.05); padding: 1rem; margin: 0.5rem 0; border-radius: 8px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 1rem; align-items: center;';
        keyDiv.innerHTML = `
            <code style="font-family: 'JetBrains Mono', monospace;">${keyData.key}</code>
            <span>${keyData.type}</span>
            <span>${keyData.usedCount}/${keyData.licenses}</span>
            <span>${expiryDate.toLocaleDateString('pt-PT')}</span>
            <span style="color: ${statusColor}; font-weight: 600;">${status}</span>
        `;
        container.appendChild(keyDiv);
    });
    
    if (!hasKeys) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Nenhuma chave gerada ainda</p>';
    }
}

async function loadAdminEmployees(container) {
    container.innerHTML = '<div style="text-align: center; padding: 2rem;">Carregando colaboradores...</div>';
    
    try {
        const employeesRef = database.ref('employees');
        const snapshot = await employeesRef.once('value');
        
        container.innerHTML = '<h3 style="margin-bottom: 1rem;">👥 Gestão de Colaboradores</h3><div id="employeesList"></div>';
        
        const list = document.getElementById('employeesList');
        
        if (!snapshot.exists()) {
            list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Nenhum colaborador registado ainda</p>';
            return;
        }
        
        const employees = snapshot.val();
        let hasEmployees = false;
        
        // Convert to array and sort by name
        const empList = [];
        for (let empKey in employees) {
            const emp = employees[empKey];
            if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                empList.push(emp);
            }
        }
        
        empList.sort((a, b) => a.name.localeCompare(b.name));
        
        empList.forEach(emp => {
            hasEmployees = true;
            const progress = calculateProgress(emp);
            const avgScore = calculateAverage(emp.scores);
            
            const empDiv = document.createElement('div');
            empDiv.style.cssText = 'background: rgba(255,255,255,0.05); padding: 1.5rem; margin: 1rem 0; border-radius: 8px;';
            empDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 1rem;">
                    <div>
                        <strong>${emp.name}</strong><br>
                        <small style="color: var(--text-secondary);">${emp.email}</small>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">Módulos</div>
                        <strong>${emp.completedModules.length}/${MODULES.length}</strong>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">Taxa Sucesso</div>
                        <strong>${avgScore}%</strong>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">XP Total</div>
                        <strong style="color: var(--accent-cyan);">${emp.xp || 0}</strong>
                    </div>
                </div>
                <div class="progress-bar" style="margin-top: 1rem;">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            `;
            list.appendChild(empDiv);
        });
        
        if (!hasEmployees) {
            list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">Nenhum colaborador registado ainda</p>';
        }
    } catch (error) {
        console.error('Error loading employees:', error);
        container.innerHTML = '<p style="color: var(--danger); text-align: center;">Erro ao carregar colaboradores</p>';
    }
}

// ==================== MESSAGES / NOTIFICATIONS ====================

function showMessage(message, type = 'info') {
    const colors = {
        success: 'var(--success)',
        error: 'var(--danger)',
        warning: 'var(--warning)',
        info: 'var(--accent-cyan)'
    };
    
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(26, 31, 58, 0.95);
        color: ${colors[type]};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border-left: 4px solid ${colors[type]};
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    msg.textContent = message;
    
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    .admin-tab {
        padding: 1rem 2rem;
        background: none;
        border: none;
        border-bottom: 3px solid transparent;
        color: var(--text-secondary);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
    }
    .admin-tab.active {
        color: var(--accent-cyan);
        border-bottom-color: var(--accent-cyan);
    }
    .admin-tab:hover:not(.active) {
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZATION ====================

window.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('phishguard_user');
    if (savedUser) {
        try {
            USER = JSON.parse(savedUser);
            onLoginSuccess();
        } catch (e) {
            console.error('Error parsing saved user:', e);
            localStorage.removeItem('phishguard_user');
        }
    }
    
    // Initialize with user tab active
    showLoginType('user');
});

// ==================== STORYTELLING FUNCTIONS ====================
// Tornar funções globais
window.openStoryModule = function(module) {
    console.log('A abrir módulo de storytelling:', module);
    
    const content = document.getElementById('dynamicContent');
    if (!content) {
        console.error('Elemento dynamicContent não encontrado');
        return;
    }
    
    let storiesHtml = '';
    module.stories.forEach((story, index) => {
        storiesHtml += `
            <div class="story-card" id="story-${story.id}" style="margin-bottom: 2rem; scroll-margin-top: 100px;">
                <div class="story-header" onclick="window.toggleStory('${story.id}')" style="cursor: pointer; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; transition: all 0.3s; box-shadow: var(--shadow-sm);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
                                <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600;">
                                    Caso ${index + 1} de ${module.stories.length}
                                </span>
                                <span style="background: var(--gray-100); color: var(--gray-600); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                    ${story.data}
                                </span>
                                <span style="background: var(--gray-100); color: var(--gray-600); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                    ${story.empresa}
                                </span>
                            </div>
                            <h3 style="font-size: 1.3rem; color: var(--gray-900); margin: 0.5rem 0 0.25rem 0;">${story.titulo}</h3>
                            <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0;">
                                ${story.cargo} • ${story.vitima}
                            </p>
                        </div>
                        <span class="story-toggle" style="font-size: 1.5rem; color: var(--primary-600); transition: transform 0.3s;">
                            ▼
                        </span>
                    </div>
                </div>
                
                <div class="story-content" id="story-content-${story.id}" style="display: none; margin-top: 1rem;">
                    <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 2rem;">
                        <!-- Informação da Vítima -->
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding: 1rem; background: white; border-radius: var(--radius); border-left: 4px solid var(--primary-500);">
                            <div style="width: 48px; height: 48px; background: var(--primary-100); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                👤
                            </div>
                            <div>
                                <h4 style="font-weight: 600; color: var(--gray-900); margin: 0;">${story.vitima}</h4>
                                <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0.25rem 0 0 0;">${story.cargo} • ${story.empresa}</p>
                                <p style="color: var(--gray-400); font-size: 0.75rem; margin: 0.25rem 0 0 0;">${story.data}</p>
                            </div>
                        </div>
                        
                        <!-- Cenário -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">🎭</span> O Cenário
                            </h5>
                            <div style="background: white; padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--gray-400);">
                                <p style="color: var(--gray-600); line-height: 1.6; margin: 0;">
                                    ${story.cenario}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Ataque -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">⚔️</span> Como o Ataque Aconteceu
                            </h5>
                            <div style="background: var(--danger-light); padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--danger);">
                                <p style="color: var(--danger); line-height: 1.6; margin: 0; white-space: pre-line;">
                                    ${story.ataque}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Erro -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">❌</span> O Erro Cometido
                            </h5>
                            <div style="background: var(--warning-light); padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--warning);">
                                <p style="color: var(--warning); line-height: 1.6; margin: 0;">
                                    ${story.erro}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Lição -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">💡</span> Lição Aprendida
                            </h5>
                            <div style="background: var(--success-light); padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--success);">
                                <p style="color: var(--success); line-height: 1.6; margin: 0;">
                                    ${story.licao}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Prevenção -->
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">🛡️</span> Como Evitar
                            </h5>
                            <div style="background: white; padding: 1.5rem; border-radius: var(--radius); border: 2px solid var(--primary-200);">
                                <p style="color: var(--gray-700); line-height: 1.6; margin: 0;">
                                    ${story.prevencao}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Frase da Vítima -->
                        <div style="margin: 2rem 0; padding: 1.5rem; background: var(--primary-50); border-left: 4px solid var(--primary-500); border-radius: var(--radius); font-style: italic;">
                            <p style="color: var(--primary-700); font-size: 1.1rem; margin: 0;">
                                "${story.frase}"
                            </p>
                        </div>
                        
                        <!-- Consequência -->
                        <div style="background: var(--gray-800); color: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
                            <strong>📊 Consequência Real:</strong>
                            <p style="color: white; margin: 0.5rem 0 0 0; opacity: 0.9;">
                                ${story.consequencia}
                            </p>
                        </div>
                        
                        <!-- Quiz Rápido -->
                        <div style="text-align: center; margin-top: 2rem;">
                            <button class="btn btn-primary" onclick="window.showStoryQuiz('${story.id}')" style="margin-right: 1rem;">
                                📝 Testar Aprendizagem (+25 XP)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = `
        <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 2rem 1rem;">
            <div class="card" style="background: white;">
                <!-- Cabeçalho com navegação -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid var(--gray-200);">
                    <button class="btn btn-outline" onclick="window.goToModules()">
                        ← Voltar aos Módulos
                    </button>
                    <div style="display: flex; gap: 0.5rem;">
                        <span class="badge" style="background: var(--primary-100); color: var(--primary-700); padding: 0.5rem 1rem; border-radius: var(--radius-full);">
                            ⭐ ${module.xp} XP
                        </span>
                        <span class="badge" style="background: var(--gray-100); color: var(--gray-600); padding: 0.5rem 1rem; border-radius: var(--radius-full);">
                            📚 ${module.stories.length} Casos
                        </span>
                    </div>
                </div>
                
                <!-- Título e descrição -->
                <div style="text-align: center; margin-bottom: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${module.icon}</div>
                    <h1 style="font-size: 2.2rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">${module.title}</h1>
                    <p style="color: var(--gray-500); font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
                        ${module.description}
                    </p>
                </div>
                
                <!-- Estatísticas -->
                <div style="background: linear-gradient(135deg, var(--primary-50), var(--primary-100)); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 3rem;">
                    <h3 style="margin-bottom: 1.5rem; color: var(--primary-800);">📊 Estatísticas Reais em Portugal</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                        <div style="text-align: center;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">5</div>
                            <div style="color: var(--gray-600);">Casos Documentados</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">250k€</div>
                            <div style="color: var(--gray-600);">Prejuízo Total</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">5</div>
                            <div style="color: var(--gray-600);">Vítimas Reais</div>
                        </div>
                    </div>
                </div>
                
                <!-- Aviso importante -->
                <div class="alert alert-info" style="margin-bottom: 2rem;">
                    <strong>🎯 Como usar este módulo:</strong>
                    <p style="margin-top: 0.5rem; margin-bottom: 0;">Clique em cada caso para ler a história completa. Depois de estudar, faça o quiz rápido para testar a sua aprendizagem e ganhar XP extra.</p>
                </div>
                
                <!-- Lista de histórias -->
                <div id="storiesContainer">
                    ${storiesHtml}
                </div>
                
                <!-- Quiz Container -->
                <div id="storyQuizContainer" class="hidden" style="margin-top: 3rem; padding: 2rem; background: white; border: 2px solid var(--primary-300); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="margin: 0;">📝 Quiz da História</h3>
                        <button class="btn btn-sm btn-outline" onclick="window.closeStoryQuiz()">✕ Fechar</button>
                    </div>
                    <div id="storyQuizContent"></div>
                </div>
                
                <!-- Botão de Conclusão -->
                <div style="text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 2px solid var(--gray-200);">
                    <button class="btn btn-success btn-lg" onclick="window.completeStoryModule()" style="font-size: 1.2rem; padding: 1rem 3rem;">
                        ✓ Marcar Módulo como Concluído
                    </button>
                    <p class="form-hint mt-3">Ganha ${module.xp} XP ao concluir o módulo</p>
                    ${USER.completedModules.includes('mod6') ? 
                        '<p class="text-success mt-2">✅ Módulo já concluído</p>' : 
                        ''}
                </div>
            </div>
        </div>
    `;
    
    // Esconder a página de módulos
    hide('modulesPage');
};

window.toggleStory = function(storyId) {
    console.log('A toggle story:', storyId);
    const content = document.getElementById(`story-content-${storyId}`);
    const header = document.querySelector(`#story-${storyId} .story-header`);
    const toggle = document.querySelector(`#story-${storyId} .story-toggle`);
    
    if (!content || !header || !toggle) {
        console.error('Elementos não encontrados para story:', storyId);
        return;
    }
    
    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        toggle.style.transform = 'rotate(180deg)';
        header.style.background = 'var(--primary-50)';
        header.style.borderColor = 'var(--primary-400)';
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        content.style.display = 'none';
        toggle.style.transform = 'rotate(0deg)';
        header.style.background = 'white';
        header.style.borderColor = 'var(--gray-200)';
        header.style.boxShadow = 'var(--shadow-sm)';
    }
};

window.showStoryQuiz = function(storyId) {
    console.log('A mostrar quiz para story:', storyId);
    const module = MODULES.find(m => m.id === 'mod6');
    if (!module) {
        console.error('Módulo 6 não encontrado');
        return;
    }
    
    const story = module.stories.find(s => s.id === storyId);
    if (!story) {
        console.error('História não encontrada:', storyId);
        return;
    }
    
    const quizContainer = document.getElementById('storyQuizContainer');
    const quizContent = document.getElementById('storyQuizContent');
    
    if (!quizContainer || !quizContent) {
        console.error('Elementos de quiz não encontrados');
        return;
    }
    
    quizContainer.classList.remove('hidden');
    
    quizContent.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <h4 style="color: var(--primary-700); margin-bottom: 1rem;">${story.titulo}</h4>
            <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Responda às perguntas para testar a sua compreensão do caso.</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem;">1. Qual foi o principal erro da vítima?</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div class="quiz-option" onclick="window.checkStoryAnswer(this, '${storyId}', 1, true)">
                    ${story.erro}
                </div>
                <div class="quiz-option" onclick="window.checkStoryAnswer(this, '${storyId}', 1, false)">
                    Não tinha software antivírus atualizado
                </div>
                <div class="quiz-option" onclick="window.checkStoryAnswer(this, '${storyId}', 1, false)">
                    Não tinha seguro contratado
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <p style="font-weight: 600; margin-bottom: 1rem;">2. Qual a principal lição a reter deste caso?</p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div class="quiz-option" onclick="window.checkStoryAnswer(this, '${storyId}', 2, true)">
                    ${story.licao}
                </div>
                <div class="quiz-option" onclick="window.checkStoryAnswer(this, '${storyId}', 2, false)">
                    Ignorar completamente situações suspeitas
                </div>
                <div class="quiz-option" onclick="window.checkStoryAnswer(this, '${storyId}', 2, false)">
                    Responder sempre a pedir mais informações
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="window.submitStoryQuiz('${storyId}')">
                Verificar Respostas
            </button>
        </div>
    `;
};

window.checkStoryAnswer = function(element, storyId, questionNum, isCorrect) {
    console.log('A verificar resposta:', {storyId, questionNum, isCorrect});
    
    // Desmarcar outras opções no mesmo grupo
    const parentGroup = element.parentElement;
    parentGroup.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Marcar opção atual
    element.classList.add('selected');
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
    
    // Guardar resposta
    if (!window.storyAnswers) window.storyAnswers = {};
    if (!window.storyAnswers[storyId]) window.storyAnswers[storyId] = {};
    window.storyAnswers[storyId][questionNum] = isCorrect;
};

window.submitStoryQuiz = function(storyId) {
    console.log('A submeter quiz para story:', storyId);
    
    if (!window.storyAnswers || !window.storyAnswers[storyId]) {
        window.showMessage('Por favor, responda às perguntas primeiro', 'warning');
        return;
    }
    
    const answers = window.storyAnswers[storyId];
    const correctCount = Object.values(answers).filter(v => v === true).length;
    
    // Remover feedback anterior se existir
    const existingFeedback = document.querySelector('#storyQuizContent .quiz-feedback');
    if (existingFeedback) existingFeedback.remove();
    
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'quiz-feedback';
    
    if (correctCount === 2) {
        feedbackDiv.innerHTML = `
            <div class="alert alert-success" style="margin-top: 1.5rem;">
                <strong>✅ Muito bem!</strong>
                <p class="mt-2">Acertou em todas as perguntas! Ganhou 25 XP extra por esta história.</p>
            </div>
        `;
        
        // Dar XP extra
        USER.xp = (USER.xp || 0) + 25;
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
        
        // Marcar esta história como estudada
        if (!USER.studiedStories) USER.studiedStories = [];
        if (!USER.studiedStories.includes(storyId)) {
            USER.studiedStories.push(storyId);
        }
        
        // Verificar se estudou todas as histórias
        const module = MODULES.find(m => m.id === 'mod6');
        if (module && USER.studiedStories.length === module.stories.length) {
            setTimeout(() => {
                window.showMessage('🏆 Parabéns! Estudou todas as histórias!', 'success');
            }, 500);
        }
    } else {
        feedbackDiv.innerHTML = `
            <div class="alert alert-warning" style="margin-top: 1.5rem;">
                <strong>📚 Continue a aprender</strong>
                <p class="mt-2">Acertou em ${correctCount} de 2 perguntas. Reveja a história com atenção e tente novamente.</p>
            </div>
        `;
    }
    
    document.getElementById('storyQuizContent').appendChild(feedbackDiv);
};

window.closeStoryQuiz = function() {
    console.log('A fechar quiz');
    const quizContainer = document.getElementById('storyQuizContainer');
    const quizContent = document.getElementById('storyQuizContent');
    
    if (quizContainer) quizContainer.classList.add('hidden');
    if (quizContent) quizContent.innerHTML = '';
    window.storyAnswers = {};
};

window.completeStoryModule = function() {
    console.log('A completar módulo de storytelling');
    
    if (!USER.completedModules.includes('mod6')) {
        USER.completedModules.push('mod6');
        USER.xp = (USER.xp || 0) + 200;
        
        // Guardar no localStorage
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
        
        window.showMessage('✅ Módulo concluído! Ganhou 200 XP', 'success');
        
        // Atualizar dashboard se estiver visível
        if (!document.getElementById('dashboardPage').classList.contains('hidden')) {
            loadDashboard();
        }
        
        // Voltar aos módulos após 2 segundos
        setTimeout(() => {
            window.goToModules();
        }, 2000);
    } else {
        window.showMessage('Já concluiu este módulo', 'info');
    }
};

console.log('✅ PhishGuard Elite carregado com sucesso!');
