// ==================== PHISHGUARD ELITE - JAVASCRIPT ====================
// Plataforma de Formação Anti-Phishing | Mareginter
// Versão Completa e Corrigida

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
    console.log('✅ Firebase inicializado com sucesso');
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
    database = {
        ref: () => ({
            once: () => Promise.resolve({ exists: () => false, val: () => null }),
            set: () => Promise.resolve(),
            update: () => Promise.resolve()
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
        title: '📧 Identificar Emails Suspeitos',
        icon: '📧',
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
        title: '🔐 Segurança de Palavras-passe',
        icon: '🔐',
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
        title: '🔗 Reconhecer URLs Fraudulentos',
        icon: '🔗',
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
        title: '📱 Proteção em Redes Sociais',
        icon: '📱',
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
            </div>
        `,
        stories: [
            {
                id: 'story1',
                titulo: 'O Golpe do Falso CEO',
                empresa: 'Empresa de Consultoria, Lisboa',
                data: 'Janeiro 2024',
                cargo: 'Diretora Financeira',
                vitima: 'Carla, 42 anos',
                cenario: 'A Carla, diretora financeira de uma consultora em Lisboa, recebeu um email do "CEO" pedindo uma transferência urgente de 45.000€ para um novo parceiro na Alemanha.',
                ataque: 'O email parecia legítimo - usava o nome correto do CEO, o logótipo da empresa, e até incluía detalhes de uma reunião que realmente tinha acontecido. A Carla estava ocupada e o email chegou numa sexta-feira à tarde, quando sabia que o CEO estava em viagem. O tom era urgente: "Precisamos fechar isto hoje, estou em reuniões o dia todo, não posso atender chamadas."',
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
                ataque: 'O email tinha o layout idêntico ao da CTT, incluindo o logótipo correto e números de tracking parecidos com os reais. Dizia que uma encomenda estava retida na alfândega e precisava de pagamento de 3,50€ para libertação. O Rui estava à espera de várias encomendas para a loja naquela semana e, sem pensar duas vezes, clicou no PDF.',
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
                ataque: 'O perfil parecia legítimo - tinha foto profissional, conexões em comum, e até recomendações. O "recrutador" propôs uma parceria exclusiva e pediu acesso à base de dados de currículos da empresa para "cruzar informações". A conversa durou duas semanas, com várias trocas de mensagens e uma videochamada onde o "recrutador" apareceu brevemente (usando deepfake) antes de "problemas de conexão".',
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
                ataque: 'A mensagem parecia vir do número oficial do banco (usando spoofing) e incluía um link para "reativar a conta". O site era uma cópia perfeita do site do banco, pedindo código de acesso e cartão matriz. O Sr. António ficou preocupado - era dia de pagamento da reforma - e clicou no link, inserindo os dados como "medida de segurança".',
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
                ataque: 'A chamada parecia vir do número oficial da AT. A pessoa do outro lado sabia detalhes específicos do cliente (NIF, morada fiscal, volume de negócios) e usava linguagem técnica correta. Pediu que o Miguel fizesse imediatamente um pagamento de 12.000€ para uma "conta de garantia" para evitar a penhora, prometendo regularização em 48h.',
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

function calculateAverage(scores) {
    if (!scores || Object.keys(scores).length === 0) return 0;
    const values = Object.values(scores);
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
}

function sanitizeEmail(email) {
    return email.replace(/\./g, '_').replace(/@/g, '_at_');
}

function generateCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function generateActivationKey() {
    const parts = [];
    for (let i = 0; i < 4; i++) {
        parts.push(generateCode(4));
    }
    return parts.join('-');
}

function calculateProgress(user) {
    if (!user || !user.completedModules || user.completedModules.length === 0) return 0;
    return Math.round((user.completedModules.length / MODULES.length) * 100);
}

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

function show(id) {
    const element = document.getElementById(id);
    if (element) element.classList.remove('hidden');
}

function hide(id) {
    const element = document.getElementById(id);
    if (element) element.classList.add('hidden');
}

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
                
                <h3 style="margin-bottom: 1rem;">Escolha um Cenário para Simular</h3>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div class="simulator-card" onclick="startSimulation('email')" style="cursor: pointer; background: white; border: 2px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; text-align: center;">
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
    document.querySelectorAll('#simulationOptions .quiz-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    element.classList.add('selected');
    
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
    
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
        
        USER.xp = (USER.xp || 0) + 50;
        if (!USER.simulationsCompleted) USER.simulationsCompleted = [];
        USER.simulationsCompleted.push(Date.now());
        
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
        
        const historyDiv = document.getElementById('simulationHistory');
        if (historyDiv) {
            historyDiv.innerHTML = renderSimulationHistory();
        }
        
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
    
    USER.xp = (USER.xp || 0) + 5;
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    
    showMessage('➕ Ganhou 5 XP por praticar!', 'info');
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
    console.log('A entrar no painel admin');
    
    if (!USER.isAdmin) {
        console.log('Utilizador não é admin - redirecionar');
        goToDashboard();
        return;
    }
    
    hideAllPages();
    
    const content = document.getElementById('dynamicContent');
    if (!content) {
        console.error('Elemento dynamicContent não encontrado');
        return;
    }
    
    content.innerHTML = `
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div>
                        <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;">👑 Painel de Administração</h2>
                        <p style="color: var(--gray-500);">Bem-vindo, ${USER.name || 'Administrador'}</p>
                    </div>
                    <button class="btn btn-outline" onclick="goToDashboard()">← Voltar</button>
                </div>
                
                <div style="background: var(--primary-50); padding: 1.5rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div>
                            <div style="font-size: 0.875rem; color: var(--gray-500);">Empresa</div>
                            <div style="font-weight: 600;">${COMPANY.name || USER.companyCode || 'Não definida'}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: var(--gray-500);">Código</div>
                            <div style="font-family: var(--font-mono); background: white; padding: 0.25rem 0.5rem; border-radius: var(--radius); display: inline-block;">
                                ${COMPANY.code || USER.companyCode || '---'}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: var(--gray-500);">Email</div>
                            <div>${USER.email}</div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--gray-200); margin-bottom: 2rem;">
                    <button class="admin-tab active" onclick="showAdminTab('overview')" id="tab-overview">
                        📊 Visão Geral
                    </button>
                    <button class="admin-tab" onclick="showAdminTab('keys')" id="tab-keys">
                        🔑 Chaves de Ativação
                    </button>
                    <button class="admin-tab" onclick="showAdminTab('employees')" id="tab-employees">
                        👥 Colaboradores
                    </button>
                    <button class="admin-tab" onclick="showAdminTab('settings')" id="tab-settings">
                        ⚙️ Configurações
                    </button>
                </div>
                
                <div id="adminTabContent">
                    <div style="text-align: center; padding: 4rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem; animation: spin 1s linear infinite;">⏳</div>
                        <p style="color: var(--gray-500);">A carregar painel admin...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        showAdminTab('overview');
    }, 100);
}

function showAdminTab(tab) {
    console.log('📌 A mostrar tab admin:', tab);
    
    document.querySelectorAll('.admin-tab').forEach(t => {
        t.classList.remove('active');
    });
    
    const tabElement = document.getElementById(`tab-${tab}`);
    if (tabElement) {
        tabElement.classList.add('active');
    }
    
    const content = document.getElementById('adminTabContent');
    if (!content) {
        console.error('Elemento adminTabContent não encontrado');
        return;
    }
    
    content.innerHTML = `
        <div style="text-align: center; padding: 4rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem; animation: spin 1s linear infinite;">⏳</div>
            <p style="color: var(--gray-500);">A carregar ${tab}...</p>
        </div>
    `;
    
    setTimeout(() => {
        try {
            if (tab === 'overview') {
                loadAdminOverview();
            } else if (tab === 'keys') {
                loadAdminKeys();
            } else if (tab === 'employees') {
                loadAdminEmployees();
            } else if (tab === 'settings') {
                loadAdminSettings();
            }
        } catch (error) {
            console.error('Erro ao carregar tab:', error);
            content.innerHTML = `
                <div class="alert alert-danger">
                    Erro ao carregar ${tab}: ${error.message}
                </div>
            `;
        }
    }, 100);
}

async function loadAdminOverview() {
    console.log('📊 A carregar visão geral admin');
    
    const content = document.getElementById('adminTabContent');
    if (!content) return;
    
    try {
        let totalEmployees = 0;
        let totalXP = 0;
        let totalModules = 0;
        let activeToday = 0;
        
        if (database && typeof database.ref === 'function') {
            try {
                const snapshot = await database.ref('employees').once('value');
                if (snapshot.exists()) {
                    const employees = snapshot.val();
                    const today = new Date().toDateString();
                    
                    Object.values(employees).forEach(emp => {
                        if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                            totalEmployees++;
                            totalXP += emp.xp || 0;
                            totalModules += emp.completedModules?.length || 0;
                            
                            if (emp.lastActivity) {
                                const lastActive = new Date(emp.lastActivity).toDateString();
                                if (lastActive === today) activeToday++;
                            }
                        }
                    });
                }
            } catch (dbError) {
                console.warn('Erro ao buscar dados do Firebase:', dbError);
            }
        }
        
        if (totalEmployees === 0) {
            totalEmployees = 1;
            totalXP = USER.xp || 0;
            totalModules = USER.completedModules?.length || 0;
        }
        
        const avgXP = totalEmployees > 0 ? Math.round(totalXP / totalEmployees) : 0;
        
        content.innerHTML = `
            <div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
                        <div style="font-size: 0.875rem; color: var(--gray-500); margin-bottom: 0.5rem;">👥 Total Colaboradores</div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">${totalEmployees}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-400); margin-top: 0.5rem;">${activeToday} ativos hoje</div>
                    </div>
                    
                    <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
                        <div style="font-size: 0.875rem; color: var(--gray-500); margin-bottom: 0.5rem;">⭐ XP Total</div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">${totalXP}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-400); margin-top: 0.5rem;">Média: ${avgXP} por utilizador</div>
                    </div>
                    
                    <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
                        <div style="font-size: 0.875rem; color: var(--gray-500); margin-bottom: 0.5rem;">📚 Módulos Concluídos</div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">${totalModules}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-400); margin-top: 0.5rem;">Total de ${MODULES.length} módulos</div>
                    </div>
                    
                    <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm);">
                        <div style="font-size: 0.875rem; color: var(--gray-500); margin-bottom: 0.5rem;">🏆 Certificados</div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">0</div>
                        <div style="font-size: 0.75rem; color: var(--gray-400); margin-top: 0.5rem;">Aguardando conclusões</div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, var(--primary-50), var(--primary-100)); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem; color: var(--primary-800);">🏢 Informação da Empresa</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div>
                            <div style="font-size: 0.75rem; color: var(--primary-600); text-transform: uppercase;">Código</div>
                            <div style="font-family: var(--font-mono); font-size: 1.1rem; background: white; padding: 0.25rem 0.75rem; border-radius: var(--radius); display: inline-block;">
                                ${COMPANY.code || USER.companyCode || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 0.75rem; color: var(--primary-600); text-transform: uppercase;">Administrador</div>
                            <div style="font-weight: 600;">${USER.name || USER.email}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.75rem; color: var(--primary-600); text-transform: uppercase;">Desde</div>
                            <div>${USER.startDate ? new Date(USER.startDate).toLocaleDateString('pt-PT') : new Date().toLocaleDateString('pt-PT')}</div>
                        </div>
                    </div>
                </div>
                
                <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem;">
                    <h4 style="margin-bottom: 1rem;">⚡ Ações Rápidas</h4>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                        <button class="btn btn-outline" onclick="showAdminTab('keys')" style="padding: 1rem;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔑</div>
                            <div>Gerar Chaves</div>
                        </button>
                        <button class="btn btn-outline" onclick="showAdminTab('employees')" style="padding: 1rem;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">👥</div>
                            <div>Ver Colaboradores</div>
                        </button>
                        <button class="btn btn-outline" onclick="showAdminTab('settings')" style="padding: 1rem;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚙️</div>
                            <div>Configurações</div>
                        </button>
                        <button class="btn btn-outline" onclick="exportCompanyData()" style="padding: 1rem;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📥</div>
                            <div>Exportar Dados</div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('❌ Erro ao carregar overview:', error);
        content.innerHTML = `
            <div class="alert alert-danger">
                <strong>Erro ao carregar dados:</strong> ${error.message}
                <br><br>
                <button class="btn btn-primary" onclick="showAdminTab('overview')">Tentar novamente</button>
            </div>
        `;
    }
}

async function loadAdminKeys() {
    console.log('🔑 A carregar gestão de chaves');
    
    const content = document.getElementById('adminTabContent');
    if (!content) return;
    
    content.innerHTML = `
        <div>
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">🔑</span>
                    Gerar Nova Chave de Ativação
                </h4>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <label class="form-label">Tipo de Chave</label>
                        <select id="keyType" class="form-input">
                            <option value="basic">Básica (6 meses)</option>
                            <option value="premium">Premium (1 ano)</option>
                            <option value="enterprise">Enterprise (2 anos)</option>
                        </select>
                    </div>
                    <div>
                        <label class="form-label">Número de Licenças</label>
                        <input type="number" id="keyLicenses" class="form-input" value="1" min="1" max="100">
                    </div>
                    <div>
                        <label class="form-label">Validade (dias)</label>
                        <input type="number" id="keyValidity" class="form-input" value="180" min="1" max="730">
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="generateNewKey()">
                    🔑 Gerar Chave
                </button>
                
                <div id="generatedKeyDisplay" class="hidden" style="margin-top: 1.5rem; padding: 1.5rem; background: var(--primary-50); border-radius: var(--radius);">
                    <p style="font-weight: 600; margin-bottom: 0.5rem;">✅ Chave Gerada com Sucesso:</p>
                    <div style="display: flex; gap: 0.5rem; align-items: center; background: white; padding: 0.75rem; border-radius: var(--radius);">
                        <code id="generatedKey" style="flex: 1; font-family: var(--font-mono); font-size: 1.2rem; text-align: center;">XXXX-XXXX-XXXX-XXXX</code>
                        <button class="btn btn-sm btn-outline" onclick="copyKeyToClipboard()">📋 Copiar</button>
                    </div>
                </div>
            </div>
            
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem;">
                <h4 style="margin-bottom: 1rem;">📋 Chaves de Ativação</h4>
                <div id="keysList" style="min-height: 200px;">
                    <div style="text-align: center; padding: 3rem; color: var(--gray-500);">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">⏳</div>
                        <p>A carregar chaves...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        loadKeysList();
    }, 100);
}

async function loadKeysList() {
    console.log('📋 A carregar lista de chaves');
    
    const keysList = document.getElementById('keysList');
    if (!keysList) {
        console.error('Elemento keysList não encontrado');
        return;
    }
    
    try {
        const mockKeys = [
            {
                key: 'ABCD-1234-EFGH-5678',
                type: 'premium',
                licenses: 10,
                usedCount: 3,
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                key: 'IJKL-9012-MNOP-3456',
                type: 'basic',
                licenses: 5,
                usedCount: 5,
                expiresAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                key: 'QRST-7890-UVWX-1234',
                type: 'enterprise',
                licenses: 20,
                usedCount: 12,
                expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        let keysHtml = '';
        let hasKeys = false;
        
        if (database && typeof database.ref === 'function') {
            try {
                const snapshot = await database.ref('activationKeys').once('value');
                if (snapshot.exists()) {
                    const keys = snapshot.val();
                    Object.values(keys).forEach(keyData => {
                        if (keyData.companyCode === (COMPANY.code || USER.companyCode)) {
                            hasKeys = true;
                            const expiryDate = new Date(keyData.expiresAt);
                            const isExpired = expiryDate < new Date();
                            const isFull = keyData.usedCount >= keyData.licenses;
                            
                            let status = '✅ Ativa';
                            let statusColor = 'var(--success)';
                            if (isExpired) {
                                status = '❌ Expirada';
                                statusColor = 'var(--danger)';
                            } else if (isFull) {
                                status = '⚠️ Esgotada';
                                statusColor = 'var(--warning)';
                            }
                            
                            keysHtml += `
                                <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200); display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; align-items: center;">
                                    <code style="font-family: var(--font-mono); font-size: 0.9rem;">${keyData.key}</code>
                                    <span style="text-transform: capitalize;">${keyData.type}</span>
                                    <span>${keyData.usedCount || 0}/${keyData.licenses}</span>
                                    <span>${expiryDate.toLocaleDateString('pt-PT')}</span>
                                    <span style="color: ${statusColor};">${status}</span>
                                </div>
                            `;
                        }
                    });
                }
            } catch (dbError) {
                console.warn('Erro ao buscar chaves do Firebase:', dbError);
            }
        }
        
        if (!hasKeys) {
            mockKeys.forEach(keyData => {
                const expiryDate = new Date(keyData.expiresAt);
                const isExpired = expiryDate < new Date();
                const isFull = keyData.usedCount >= keyData.licenses;
                
                let status = '✅ Ativa';
                let statusColor = 'var(--success)';
                if (isExpired) {
                    status = '❌ Expirada';
                    statusColor = 'var(--danger)';
                } else if (isFull) {
                    status = '⚠️ Esgotada';
                    statusColor = 'var(--warning)';
                }
                
                keysHtml += `
                    <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200); display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem; align-items: center;">
                        <code style="font-family: var(--font-mono); font-size: 0.9rem;">${keyData.key}</code>
                        <span style="text-transform: capitalize;">${keyData.type}</span>
                        <span>${keyData.usedCount}/${keyData.licenses}</span>
                        <span>${expiryDate.toLocaleDateString('pt-PT')}</span>
                        <span style="color: ${statusColor};">${status}</span>
                    </div>
                `;
                hasKeys = true;
            });
        }
        
        if (!hasKeys) {
            keysList.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--gray-500);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔑</div>
                    <p>Nenhuma chave gerada ainda.</p>
                    <p style="font-size: 0.875rem;">Use o formulário acima para gerar a primeira chave.</p>
                </div>
            `;
        } else {
            keysList.innerHTML = `
                <div style="background: var(--gray-50); padding: 0.75rem 1rem; border-bottom: 2px solid var(--gray-200); font-weight: 600; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 0.5rem;">
                    <div>Chave</div>
                    <div>Tipo</div>
                    <div>Usos</div>
                    <div>Expira</div>
                    <div>Estado</div>
                </div>
                ${keysHtml}
            `;
        }
    } catch (error) {
        console.error('❌ Erro ao carregar chaves:', error);
        keysList.innerHTML = `
            <div class="alert alert-danger">
                Erro ao carregar chaves: ${error.message}
                <br><br>
                <button class="btn btn-primary" onclick="loadKeysList()">Tentar novamente</button>
            </div>
        `;
    }
}

async function loadAdminEmployees() {
    console.log('👥 A carregar lista de colaboradores');
    
    const content = document.getElementById('adminTabContent');
    if (!content) return;
    
    content.innerHTML = `
        <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h4 style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">👥</span>
                    Colaboradores
                </h4>
                <button class="btn btn-outline btn-sm" onclick="exportEmployeesList()">
                    📥 Exportar Lista
                </button>
            </div>
            
            <div id="employeesList" style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); min-height: 400px;">
                <div style="text-align: center; padding: 4rem; color: var(--gray-500);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
                    <p>A carregar colaboradores...</p>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        loadEmployeesList();
    }, 100);
}

async function loadEmployeesList() {
    console.log('📋 A carregar lista de colaboradores');
    
    const employeesList = document.getElementById('employeesList');
    if (!employeesList) {
        console.error('Elemento employeesList não encontrado');
        return;
    }
    
    try {
        let employeesHtml = '';
        let totalEmployees = 0;
        
        const mockEmployees = [
            {
                name: 'Ana Silva',
                email: 'ana.silva@empresa.pt',
                xp: 1250,
                completedModules: [1, 2, 3],
                lastActivity: new Date().toISOString()
            },
            {
                name: 'João Santos',
                email: 'joao.santos@empresa.pt',
                xp: 850,
                completedModules: [1, 2],
                lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                name: 'Maria Ferreira',
                email: 'maria.ferreira@empresa.pt',
                xp: 2100,
                completedModules: [1, 2, 3, 4],
                lastActivity: new Date().toISOString()
            }
        ];
        
        if (database && typeof database.ref === 'function') {
            try {
                const snapshot = await database.ref('employees').once('value');
                if (snapshot.exists()) {
                    const employees = snapshot.val();
                    Object.values(employees).forEach(emp => {
                        if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                            totalEmployees++;
                            const progress = emp.completedModules ? Math.round((emp.completedModules.length / MODULES.length) * 100) : 0;
                            const lastActive = emp.lastActivity ? new Date(emp.lastActivity).toLocaleDateString('pt-PT') : 'Nunca';
                            
                            employeesHtml += `
                                <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200); display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr; gap: 1rem; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600;">${emp.name || 'N/A'}</div>
                                        <div style="font-size: 0.75rem; color: var(--gray-500);">${emp.email || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600;">${emp.completedModules?.length || 0}/${MODULES.length}</div>
                                        <div class="progress" style="width: 100%; height: 4px; margin-top: 0.25rem;">
                                            <div class="progress-bar" style="width: ${progress}%;"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style="font-weight: 600;">${emp.xp || 0} XP</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.875rem;">${lastActive}</div>
                                    </div>
                                    <div>
                                        <span style="background: ${progress >= 80 ? 'var(--success-light)' : 'var(--warning-light)'}; color: ${progress >= 80 ? 'var(--success)' : 'var(--warning)'}; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                            ${progress}%
                                        </span>
                                    </div>
                                </div>
                            `;
                        }
                    });
                }
            } catch (dbError) {
                console.warn('Erro ao buscar colaboradores do Firebase:', dbError);
            }
        }
        
        if (totalEmployees === 0) {
            mockEmployees.forEach(emp => {
                totalEmployees++;
                const progress = Math.round((emp.completedModules.length / MODULES.length) * 100);
                const lastActive = new Date(emp.lastActivity).toLocaleDateString('pt-PT');
                
                employeesHtml += `
                    <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200); display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr; gap: 1rem; align-items: center;">
                        <div>
                            <div style="font-weight: 600;">${emp.name}</div>
                            <div style="font-size: 0.75rem; color: var(--gray-500);">${emp.email}</div>
                        </div>
                        <div>
                            <div style="font-weight: 600;">${emp.completedModules.length}/${MODULES.length}</div>
                            <div class="progress" style="width: 100%; height: 4px; margin-top: 0.25rem;">
                                <div class="progress-bar" style="width: ${progress}%;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="font-weight: 600;">${emp.xp} XP</div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem;">${lastActive}</div>
                        </div>
                        <div>
                            <span style="background: ${progress >= 80 ? 'var(--success-light)' : 'var(--warning-light)'}; color: ${progress >= 80 ? 'var(--success)' : 'var(--warning)'}; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                ${progress}%
                            </span>
                        </div>
                    </div>
                `;
            });
        }
        
        if (totalEmployees === 0) {
            employeesList.innerHTML = `
                <div style="text-align: center; padding: 4rem; color: var(--gray-500);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
                    <p>Nenhum colaborador registado.</p>
                    <p style="font-size: 0.875rem; margin-top: 1rem;">Gere chaves de ativação na tab "Chaves" para começar.</p>
                </div>
            `;
        } else {
            employeesList.innerHTML = `
                <div style="background: var(--gray-50); padding: 1rem; border-bottom: 2px solid var(--gray-200); font-weight: 600; display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr; gap: 1rem;">
                    <div>Colaborador</div>
                    <div>Progresso</div>
                    <div>XP</div>
                    <div>Último Acesso</div>
                    <div>Desempenho</div>
                </div>
                ${employeesHtml}
                <div style="padding: 1rem; text-align: center; background: var(--gray-50); color: var(--gray-500); font-size: 0.875rem;">
                    Total: ${totalEmployees} colaborador(es)
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Erro ao carregar colaboradores:', error);
        employeesList.innerHTML = `
            <div class="alert alert-danger" style="margin: 1rem;">
                Erro ao carregar colaboradores: ${error.message}
                <br><br>
                <button class="btn btn-primary" onclick="loadEmployeesList()">Tentar novamente</button>
            </div>
        `;
    }
}

function loadAdminSettings() {
    console.log('⚙️ A carregar configurações');
    
    const content = document.getElementById('adminTabContent');
    if (!content) return;
    
    content.innerHTML = `
        <div>
            <h4 style="margin-bottom: 1.5rem;">⚙️ Configurações da Empresa</h4>
            
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
                <h5 style="margin-bottom: 1rem;">Informação da Empresa</h5>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label class="form-label">Nome da Empresa</label>
                        <input type="text" class="form-input" id="companyNameSetting" value="${COMPANY.name || ''}" placeholder="Nome da empresa">
                    </div>
                    <div>
                        <label class="form-label">Código da Empresa</label>
                        <input type="text" class="form-input" value="${COMPANY.code || USER.companyCode || ''}" readonly disabled style="background: var(--gray-100);">
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="updateCompanySettings()">
                    Guardar Alterações
                </button>
            </div>
            
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem;">
                <h5 style="margin-bottom: 1rem;">Configurações de Formação</h5>
                
                <div style="margin-bottom: 1rem;">
                    <label class="form-label">Pontuação Mínima para Certificado (%)</label>
                    <input type="number" class="form-input" id="minScoreSetting" value="${COMPANY.settings?.minCertificateScore || 80}" min="50" max="100">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label class="form-label">Módulos Obrigatórios</label>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
                        ${MODULES.map(module => `
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" id="mod-${module.id}" ${COMPANY.settings?.mandatoryModules?.includes(module.id) ? 'checked' : ''}>
                                ${module.title}
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="updateTrainingSettings()">
                    Guardar Configurações
                </button>
            </div>
        </div>
    `;
}

// ==================== STORYTELLING FUNCTIONS ====================

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
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h5 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 0.75rem;">
                                <span style="font-size: 1.25rem;">⚔️</span> Como o Ataque Aconteceu
                            </h5>
                            <div style="background: var(--danger-light); padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--danger);">
                                <p style="color: var(--danger); line-height: 1.6; margin: 0;">
                                    ${story.ataque}
                                </p>
                            </div>
                        </div>
                        
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
                        
                        <div style="margin: 2rem 0; padding: 1.5rem; background: var(--primary-50); border-left: 4px solid var(--primary-500); border-radius: var(--radius); font-style: italic;">
                            <p style="color: var(--primary-700); font-size: 1.1rem; margin: 0;">
                                "${story.frase}"
                            </p>
                        </div>
                        
                        <div style="background: var(--gray-800); color: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
                            <strong>📊 Consequência Real:</strong>
                            <p style="color: white; margin: 0.5rem 0 0 0; opacity: 0.9;">
                                ${story.consequencia}
                            </p>
                        </div>
                        
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
                
                <div style="text-align: center; margin-bottom: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${module.icon}</div>
                    <h1 style="font-size: 2.2rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">${module.title}</h1>
                    <p style="color: var(--gray-500); font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
                        ${module.description}
                    </p>
                </div>
                
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
                
                <div class="alert alert-info" style="margin-bottom: 2rem;">
                    <strong>🎯 Como usar este módulo:</strong>
                    <p style="margin-top: 0.5rem; margin-bottom: 0;">Clique em cada caso para ler a história completa. Depois de estudar, faça o quiz rápido para testar a sua aprendizagem e ganhar XP extra.</p>
                </div>
                
                <div id="storiesContainer">
                    ${storiesHtml}
                </div>
                
                <div id="storyQuizContainer" class="hidden" style="margin-top: 3rem; padding: 2rem; background: white; border: 2px solid var(--primary-300); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h3 style="margin: 0;">📝 Quiz da História</h3>
                        <button class="btn btn-sm btn-outline" onclick="window.closeStoryQuiz()">✕ Fechar</button>
                    </div>
                    <div id="storyQuizContent"></div>
                </div>
                
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
    
    const parentGroup = element.parentElement;
    parentGroup.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    element.classList.add('selected');
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
    
    if (!window.storyAnswers) window.storyAnswers = {};
    if (!window.storyAnswers[storyId]) window.storyAnswers[storyId] = {};
    window.storyAnswers[storyId][questionNum] = isCorrect;
};

window.submitStoryQuiz = function(storyId) {
    console.log('A submeter quiz para story:', storyId);
    
    if (!window.storyAnswers || !window.storyAnswers[storyId]) {
        showMessage('Por favor, responda às perguntas primeiro', 'warning');
        return;
    }
    
    const answers = window.storyAnswers[storyId];
    const correctCount = Object.values(answers).filter(v => v === true).length;
    
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
        
        USER.xp = (USER.xp || 0) + 25;
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
        
        if (!USER.studiedStories) USER.studiedStories = [];
        if (!USER.studiedStories.includes(storyId)) {
            USER.studiedStories.push(storyId);
        }
        
        const module = MODULES.find(m => m.id === 'mod6');
        if (module && USER.studiedStories.length === module.stories.length) {
            setTimeout(() => {
                showMessage('🏆 Parabéns! Estudou todas as histórias!', 'success');
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
        
        localStorage.setItem('phishguard_user', JSON.stringify(USER));
        
        showMessage('✅ Módulo concluído! Ganhou 200 XP', 'success');
        
        if (!document.getElementById('dashboardPage').classList.contains('hidden')) {
            loadDashboard();
        }
        
        setTimeout(() => {
            window.goToModules();
        }, 2000);
    } else {
        showMessage('Já concluiu este módulo', 'info');
    }
};

// ==================== LANDING PAGE FUNCTIONS ====================

function showLandingPage() {
    hide('navbar');
    hide('dashboardPage');
    hide('modulesPage');
    hide('loginSection');
    
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) dynamicContent.innerHTML = '';
    
    show('landingPage');
}

function showLoginSection(type) {
    // Esconder landing page e mostrar secção de login
    hide('landingPage');
    show('loginSection');
    
    // Scroll para o topo da secção de login
    document.getElementById('loginSection').scrollIntoView({ behavior: 'smooth' });
    
    // Mostrar o tipo de login correto
    showLoginType(type);
}

function hideLoginSection() {
    hide('loginSection');
    show('landingPage');
}

// Modificar showLoginType para não chamar showLoginSection
function showLoginType(type) {
    const userForm = document.getElementById('userLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const tabUser = document.getElementById('tabUser');
    const tabAdmin = document.getElementById('tabAdmin');
    const adminExtraFields = document.getElementById('adminExtraFields');

    if (type === 'user') {
        userForm.classList.remove('hidden');
        adminForm.classList.add('hidden');
        tabUser.classList.add('active');
        tabAdmin.classList.remove('active');
        if (adminExtraFields) adminExtraFields.classList.add('hidden');
    } else {
        userForm.classList.add('hidden');
        adminForm.classList.remove('hidden');
        tabUser.classList.remove('active');
        tabAdmin.classList.add('active');
    }
}

// Modificar onLoginSuccess para esconder landing page e login section
function onLoginSuccess() {
    console.log('Login bem-sucedido para:', USER.email, 'Admin:', USER.isAdmin);
    
    hide('landingPage');
    hide('loginSection');
    hide('loginPage');
    show('navbar');
    
    if (USER.isAdmin) {
        console.log('Utilizador é admin - a mostrar painel admin');
        document.getElementById('btnAdmin').classList.remove('hidden');
        document.getElementById('btnCert').classList.add('hidden');
        
        const dashboardPage = document.getElementById('dashboardPage');
        dashboardPage.classList.remove('hidden');
        dashboardPage.innerHTML = ''; // Limpar conteúdo anterior
        
        goToAdmin();
    } else {
        console.log('Utilizador é colaborador');
        document.getElementById('btnCert').classList.remove('hidden');
        document.getElementById('btnAdmin').classList.add('hidden');
        
        if (!USER.hasSeenWelcome) {
            showWelcomePopup();
        } else {
            goToDashboard();
        }
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
}

// Modificar logout para voltar à landing page
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
    showLandingPage();
    
    // Limpar formulários
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('activationKey').value = '';
    document.getElementById('companyCode').value = '';
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminName').value = '';
    document.getElementById('companyName').value = '';
    
    // Reset tabs
    showLoginType('user');
}

// Modificar hideAllPages para incluir landingPage e loginSection
function hideAllPages() {
    const pages = ['landingPage', 'loginSection', 'dashboardPage', 'modulesPage', 'loginPage'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (element) element.classList.add('hidden');
    });
    
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) dynamicContent.innerHTML = '';
}

// ==================== LANDING PAGE FUNCTIONS ====================

// ==================== LANDING PAGE FUNCTIONS ====================

// Tornar funções globalmente acessíveis
window.showLandingPage = function() {
    console.log('A mostrar landing page');
    
    // Esconder tudo
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.add('hidden');
    
    const dashboardPage = document.getElementById('dashboardPage');
    if (dashboardPage) dashboardPage.classList.add('hidden');
    
    const modulesPage = document.getElementById('modulesPage');
    if (modulesPage) modulesPage.classList.add('hidden');
    
    const loginSection = document.getElementById('loginSection');
    if (loginSection) loginSection.classList.add('hidden');
    
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) dynamicContent.innerHTML = '';
    
    // Mostrar landing page
    const landingPage = document.getElementById('landingPage');
    if (landingPage) landingPage.classList.remove('hidden');
};

window.showLoginSection = function(type) {
    console.log('A mostrar secção de login para:', type);
    
    // Esconder landing page
    const landingPage = document.getElementById('landingPage');
    if (landingPage) landingPage.classList.add('hidden');
    
    // Mostrar secção de login
    const loginSection = document.getElementById('loginSection');
    if (loginSection) {
        loginSection.classList.remove('hidden');
        
        // Scroll suave para a secção de login
        loginSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Garantir que o formulário correto é mostrado
    if (type === 'user') {
        showLoginType('user');
    } else {
        showLoginType('admin');
    }
};

window.hideLoginSection = function() {
    console.log('A esconder secção de login');
    
    // Esconder secção de login
    const loginSection = document.getElementById('loginSection');
    if (loginSection) loginSection.classList.add('hidden');
    
    // Mostrar landing page
    const landingPage = document.getElementById('landingPage');
    if (landingPage) landingPage.classList.remove('hidden');
    
    // Reset para o formulário de colaborador
    showLoginType('user');
};

// Função para mostrar o tipo de login correto
window.showLoginType = function(type) {
    console.log('A mostrar tipo de login:', type);
    
    const userForm = document.getElementById('userLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const tabUser = document.getElementById('tabUser');
    const tabAdmin = document.getElementById('tabAdmin');
    const adminExtraFields = document.getElementById('adminExtraFields');

    if (type === 'user') {
        // Mostrar formulário de colaborador
        if (userForm) userForm.classList.remove('hidden');
        if (adminForm) adminForm.classList.add('hidden');
        
        // Ativar tab de colaborador
        if (tabUser) tabUser.classList.add('active');
        if (tabAdmin) tabAdmin.classList.remove('active');
        
        // Esconder campos extras de admin
        if (adminExtraFields) adminExtraFields.classList.add('hidden');
    } else {
        // Mostrar formulário de admin
        if (userForm) userForm.classList.add('hidden');
        if (adminForm) adminForm.classList.remove('hidden');
        
        // Ativar tab de admin
        if (tabUser) tabUser.classList.remove('active');
        if (tabAdmin) tabAdmin.classList.add('active');
        
        // Os campos extras de admin ficam escondidos inicialmente
        if (adminExtraFields) adminExtraFields.classList.add('hidden');
    }
};

// Função para quando clica no tab de admin (mostrar campos extras se necessário)
window.onAdminTabClick = function() {
    showLoginType('admin');
};

// Função para quando clica no tab de user
window.onUserTabClick = function() {
    showLoginType('user');
};

// Modificar onLoginSuccess
window.onLoginSuccess = function() {
    console.log('Login bem-sucedido para:', USER.email, 'Admin:', USER.isAdmin);
    
    // Esconder landing page e login section
    const landingPage = document.getElementById('landingPage');
    if (landingPage) landingPage.classList.add('hidden');
    
    const loginSection = document.getElementById('loginSection');
    if (loginSection) loginSection.classList.add('hidden');
    
    // Mostrar navbar
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.remove('hidden');
    
    if (USER.isAdmin) {
        console.log('Utilizador é admin - a mostrar painel admin');
        const btnAdmin = document.getElementById('btnAdmin');
        if (btnAdmin) btnAdmin.classList.remove('hidden');
        
        const btnCert = document.getElementById('btnCert');
        if (btnCert) btnCert.classList.add('hidden');
        
        goToAdmin();
    } else {
        console.log('Utilizador é colaborador');
        const btnCert = document.getElementById('btnCert');
        if (btnCert) btnCert.classList.remove('hidden');
        
        const btnAdmin = document.getElementById('btnAdmin');
        if (btnAdmin) btnAdmin.classList.add('hidden');
        
        if (!USER.hasSeenWelcome) {
            showWelcomePopup();
        } else {
            goToDashboard();
        }
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
};

// Modificar doAdminLogin para mostrar campos extras no primeiro acesso
window.doAdminLogin = async function() {
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
            // Admin existente - fazer login normal
            const adminData = snapshot.val();
            if (adminData.password === password) {
                USER = {
                    ...USER,
                    ...adminData,
                    email,
                    isAdmin: true
                };
                
                onLoginSuccess();
            } else {
                showMessage('Senha incorreta', 'error');
            }
        } else {
            // Primeiro admin - mostrar campos extras se não estiverem visíveis
            const adminExtraFields = document.getElementById('adminExtraFields');
            
            if (adminExtraFields.classList.contains('hidden')) {
                // Mostrar campos extras
                adminExtraFields.classList.remove('hidden');
                showMessage('Complete o registo inicial da empresa', 'info');
            } else {
                // Campos extras já estão visíveis - tentar criar admin
                if (!name || !companyName) {
                    showMessage('Preencha nome e nome da empresa', 'error');
                    return;
                }
                
                // Criar novo admin
                await createNewAdmin(email, password, name, companyName);
            }
        }
    } catch (error) {
        console.error('Admin login error:', error);
        showMessage('Erro ao fazer login: ' + error.message, 'error');
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - a inicializar');
    
    // Garantir que os formulários começam no estado correto
    const userForm = document.getElementById('userLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const adminExtraFields = document.getElementById('adminExtraFields');
    
    if (userForm) userForm.classList.remove('hidden');
    if (adminForm) adminForm.classList.add('hidden');
    if (adminExtraFields) adminExtraFields.classList.add('hidden');
    
    const savedUser = localStorage.getItem('phishguard_user');
    if (savedUser) {
        try {
            USER = JSON.parse(savedUser);
            onLoginSuccess();
        } catch (e) {
            console.error('Error parsing saved user:', e);
            localStorage.removeItem('phishguard_user');
            showLandingPage();
        }
    } else {
        showLandingPage();
    }
});

// Inicialização - mostrar landing page
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('phishguard_user');
    if (savedUser) {
        try {
            USER = JSON.parse(savedUser);
            onLoginSuccess();
        } catch (e) {
            console.error('Error parsing saved user:', e);
            localStorage.removeItem('phishguard_user');
            showLandingPage();
        }
    } else {
        showLandingPage();
    }
    
    // Garantir que a login section começa escondida
    hide('loginSection');
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

function showLoginSection() {
    document.getElementById('loginSection').classList.remove('hidden');
    
    // Scroll suave para a secção de login
    document.getElementById('loginSection').scrollIntoView({ behavior: 'smooth' });
}

// Modificar a função showLoginType para mostrar a secção de login
function showLoginType(type) {
    showLoginSection();
    
    const userForm = document.getElementById('userLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const tabUser = document.getElementById('tabUser');
    const tabAdmin = document.getElementById('tabAdmin');

    if (type === 'user') {
        userForm.classList.remove('hidden');
        adminForm.classList.add('hidden');
        tabUser.classList.add('active');
        tabAdmin.classList.remove('active');
        document.getElementById('adminExtraFields').classList.add('hidden');
    } else {
        userForm.classList.add('hidden');
        adminForm.classList.remove('hidden');
        tabUser.classList.remove('active');
        tabAdmin.classList.add('active');
    }
}

// Modificar onLoginSuccess para esconder landing page
function onLoginSuccess() {
    console.log('Login bem-sucedido para:', USER.email, 'Admin:', USER.isAdmin);
    
    hide('landingPage');
    hide('loginPage');
    show('navbar');
    
    if (USER.isAdmin) {
        console.log('Utilizador é admin - a mostrar painel admin');
        document.getElementById('btnAdmin').classList.remove('hidden');
        document.getElementById('btnCert').classList.add('hidden');
        
        // Usar o mesmo container do dashboard para admin
        const dashboardContainer = document.getElementById('dashboardPage');
        dashboardContainer.classList.remove('hidden');
        dashboardContainer.innerHTML = ''; // Limpar conteúdo anterior
        
        goToAdmin();
    } else {
        console.log('Utilizador é colaborador');
        document.getElementById('btnCert').classList.remove('hidden');
        document.getElementById('btnAdmin').classList.add('hidden');
        
        if (!USER.hasSeenWelcome) {
            showWelcomePopup();
        } else {
            goToDashboard();
        }
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
}

// Modificar goToAdmin para usar o layout do dashboard
function goToAdmin() {
    console.log('A entrar no painel admin');
    
    if (!USER.isAdmin) {
        console.log('Utilizador não é admin - redirecionar');
        goToDashboard();
        return;
    }
    
    hideAllPages();
    
    const dashboardPage = document.getElementById('dashboardPage');
    dashboardPage.classList.remove('hidden');
    
    dashboardPage.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-card">
                <div class="dashboard-header">
                    <div>
                        <h2 class="dashboard-title">👑 Painel de Administração</h2>
                        <p class="dashboard-subtitle">Bem-vindo, ${USER.name || 'Administrador'}</p>
                    </div>
                    <div class="dashboard-stats-mini">
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
                
                <!-- Admin Tabs -->
                <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--gray-200); margin-bottom: 2rem; padding-bottom: 0.5rem;">
                    <button class="admin-tab active" onclick="showAdminTab('overview')" id="tab-overview">
                        📊 Visão Geral
                    </button>
                    <button class="admin-tab" onclick="showAdminTab('keys')" id="tab-keys">
                        🔑 Chaves de Ativação
                    </button>
                    <button class="admin-tab" onclick="showAdminTab('employees')" id="tab-employees">
                        👥 Colaboradores
                    </button>
                    <button class="admin-tab" onclick="showAdminTab('settings')" id="tab-settings">
                        ⚙️ Configurações
                    </button>
                </div>
                
                <!-- Admin Tab Content -->
                <div id="adminTabContent" class="dashboard-progress-section">
                    <div style="text-align: center; padding: 3rem;">
                        <div style="font-size: 2rem; margin-bottom: 1rem; animation: spin 1s linear infinite;">⏳</div>
                        <p style="color: var(--gray-500);">A carregar painel admin...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Carregar estatísticas iniciais
    loadAdminStats();
    
    setTimeout(() => {
        showAdminTab('overview');
    }, 100);
}

// Nova função para carregar estatísticas admin
async function loadAdminStats() {
    try {
        let totalEmployees = 0;
        
        if (database && typeof database.ref === 'function') {
            const snapshot = await database.ref('employees').once('value');
            if (snapshot.exists()) {
                const employees = snapshot.val();
                Object.values(employees).forEach(emp => {
                    if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                        totalEmployees++;
                    }
                });
            }
        }
        
        const totalEmployeesEl = document.getElementById('adminTotalEmployees');
        if (totalEmployeesEl) {
            totalEmployeesEl.textContent = totalEmployees || 1;
        }
    } catch (error) {
        console.error('Erro ao carregar estatísticas admin:', error);
    }
}

// Modificar logout para voltar à landing page
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
    showLandingPage();
    
    // Limpar formulários
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('activationKey').value = '';
    document.getElementById('companyCode').value = '';
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminName').value = '';
    document.getElementById('companyName').value = '';
    
    // Reset tabs
    showLoginType('user');
}

// Modificar hideAllPages para incluir landingPage
function hideAllPages() {
    const pages = ['landingPage', 'dashboardPage', 'modulesPage', 'loginPage'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (element) element.classList.add('hidden');
    });
    
    const dynamicContent = document.getElementById('dynamicContent');
    if (dynamicContent) dynamicContent.innerHTML = '';
}

// Modificar goToDashboard para usar o novo layout
function goToDashboard() {
    hideAllPages();
    
    const dashboardPage = document.getElementById('dashboardPage');
    dashboardPage.classList.remove('hidden');
    
    dashboardPage.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-card">
                <div class="dashboard-header">
                    <div>
                        <h2 class="dashboard-title">📊 Dashboard</h2>
                        <p class="dashboard-subtitle">Bem-vindo de volta, ${USER.name ? USER.name.split(' ')[0] : 'Utilizador'}!</p>
                    </div>
                    <div class="dashboard-stats-mini">
                        <span class="badge" style="background: var(--primary-100); color: var(--primary-700); padding: 0.5rem 1rem; border-radius: var(--radius-full);">
                            ${USER.companyCode || 'PhishGuard Elite'}
                        </span>
                    </div>
                </div>
                
                <div class="dashboard-stats-grid">
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">XP Total</div>
                        <div class="dashboard-stat-value" id="dashXP">${USER.xp || 0}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Módulos</div>
                        <div class="dashboard-stat-value" id="dashMods">${USER.completedModules.length}/${MODULES.length}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Badges</div>
                        <div class="dashboard-stat-value" id="dashBadges">${USER.badges.length}/${BADGES.length}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Sucesso</div>
                        <div class="dashboard-stat-value" id="dashSuccess">${calculateAverage(USER.scores)}%</div>
                    </div>
                </div>
                
                <div class="dashboard-progress-section">
                    <div class="dashboard-progress-header">
                        <span class="dashboard-progress-title">📈 Progresso Global</span>
                        <span class="dashboard-progress-value" id="dashProgressPct">${calculateProgress(USER)}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" id="dashProgress" style="width: ${calculateProgress(USER)}%"></div>
                    </div>
                </div>
                
                <div class="dashboard-actions">
                    <button class="btn btn-primary" onclick="goToModules()">
                        📚 Continuar Formação
                    </button>
                    <button class="btn btn-outline" onclick="goToSimulator()">
                        🎮 Testar Conhecimentos
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Inicialização - mostrar landing page em vez de login page
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('phishguard_user');
    if (savedUser) {
        try {
            USER = JSON.parse(savedUser);
            onLoginSuccess();
        } catch (e) {
            console.error('Error parsing saved user:', e);
            localStorage.removeItem('phishguard_user');
            showLandingPage();
        }
    } else {
        showLandingPage();
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

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
            const userData = snapshot.val();
            USER = { ...USER, ...userData, email, isAdmin: false };
            
            await userRef.update({ lastActivity: new Date().toISOString() });
            
            onLoginSuccess();
        } else {
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
            
            if (keyData.key === key) {
                const expiryDate = new Date(keyData.expiresAt);
                if (expiryDate > new Date()) {
                    if (keyData.usedCount < keyData.licenses) {
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
            const adminData = snapshot.val();
            if (adminData.password === password) {
                USER = {
                    ...USER,
                    ...adminData,
                    email,
                    isAdmin: true
                };
                
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
            const adminExtraFields = document.getElementById('adminExtraFields');
            
            if (!adminExtraFields.classList.contains('hidden')) {
                if (!name || !companyName) {
                    showMessage('Preencha nome e nome da empresa', 'error');
                    return;
                }
                
                await createNewAdmin(email, password, name, companyName);
            } else {
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
        
        const newAdmin = {
            name,
            email,
            password,
            companyCode,
            createdAt: new Date().toISOString(),
            isAdmin: true
        };
        
        await database.ref(`admins/${adminKey}`).set(newAdmin);
        
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
    console.log('Login bem-sucedido para:', USER.email, 'Admin:', USER.isAdmin);
    
    hide('loginPage');
    show('navbar');
    
    if (USER.isAdmin) {
        console.log('Utilizador é admin - a mostrar painel admin');
        document.getElementById('btnAdmin').classList.remove('hidden');
        document.getElementById('btnCert').classList.add('hidden');
        
        hideAllPages();
        goToAdmin();
    } else {
        console.log('Utilizador é colaborador');
        document.getElementById('btnCert').classList.remove('hidden');
        document.getElementById('btnAdmin').classList.add('hidden');
        
        if (!USER.hasSeenWelcome) {
            showWelcomePopup();
        } else {
            goToDashboard();
        }
    }
    
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
    
    document.getElementById('btnAdmin').classList.add('hidden');
    document.getElementById('btnCert').classList.add('hidden');
    
    show('loginPage');
    
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
    
    document.getElementById('dashXP').textContent = USER.xp || 0;
    document.getElementById('dashMods').textContent = `${USER.completedModules.length}/${MODULES.length}`;
    document.getElementById('dashBadges').textContent = `${USER.badges.length}/${BADGES.length}`;
    
    const avgScore = calculateAverage(USER.scores);
    document.getElementById('dashSuccess').textContent = `${avgScore}%`;
    
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
        const isLocked = index > 0 && !USER.completedModules.includes(MODULES[index - 1].id) && module.id !== 'mod6';
        
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
                <span class="difficulty-badge ${module.difficulty}">
                    ${module.difficulty === 'beginner' ? '🟢 Iniciante' : '🟡 Intermédio'}
                </span>
                ${isCompleted ? '<span style="color: var(--success);">✓ Concluído</span>' : ''}
                ${isLocked ? '<span style="color: var(--gray-500);">🔒 Bloqueado</span>' : ''}
            </div>
            ${!isCompleted && !isLocked ? `<div style="color: var(--primary-600); margin-top: 0.5rem; font-weight: 600;">+${module.xp} XP</div>` : ''}
        `;
        
        container.appendChild(card);
    });
}

function openModule(module) {
    console.log('A abrir módulo:', module.id);
    
    if (module.id === 'mod6') {
        if (typeof window.openStoryModule === 'function') {
            window.openStoryModule(module);
        } else {
            console.error('Função openStoryModule não encontrada');
            showMessage('Erro ao abrir módulo. Recarregue a página.', 'error');
        }
        return;
    }
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div class="card">
                <button class="btn btn-outline btn-sm" onclick="goToModules()" style="margin-bottom: 1.5rem;">
                    ← Voltar aos Módulos
                </button>
                
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${module.icon}</div>
                    <h2 style="font-size: 2rem; font-weight: 700;">${module.title}</h2>
                    <p style="color: var(--gray-500);">${module.description}</p>
                </div>

                <div style="background: var(--gray-50); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem;">📖 Conteúdo do Módulo</h3>
                    <div style="color: var(--gray-600); line-height: 1.8;">
                        ${module.content}
                    </div>
                </div>

                <div style="background: var(--gray-50); padding: 2rem; border-radius: var(--radius-lg);">
                    <h3 style="margin-bottom: 1rem;">✍️ Quiz de Avaliação</h3>
                    <p style="color: var(--gray-500); margin-bottom: 2rem;">
                        Responda às ${module.quiz.length} perguntas seguintes para completar o módulo.
                    </p>
                    <div id="quizContainer"></div>
                    <button class="btn btn-primary btn-lg" onclick="submitQuiz('${module.id}')" style="width: 100%; margin-top: 2rem;">
                        Submeter Respostas
                    </button>
                </div>
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
        questionDiv.style.cssText = 'margin-bottom: 2rem; padding: 1.5rem; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg);';
        
        questionDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                <span style="background: var(--primary-100); color: var(--primary-700); width: 28px; height: 28px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 600;">
                    ${qIndex + 1}
                </span>
                <div style="font-size: 1.1rem; font-weight: 500; color: var(--gray-900);">${q.q}</div>
            </div>
            <div class="quiz-options">
                ${q.opts.map((opt, oIndex) => `
                    <div class="quiz-option" onclick="selectOption(${qIndex}, ${oIndex})" id="q${qIndex}_o${oIndex}">
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
    document.querySelectorAll(`input[name="q${qIndex}"]`).forEach(input => {
        input.checked = false;
        input.parentElement.classList.remove('selected');
    });
    
    const option = document.getElementById(`q${qIndex}_o${oIndex}`);
    option.classList.add('selected');
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
    
    showQuizResults(module, answers, score, xpEarned);
    
    if (!USER.completedModules.includes(moduleId)) {
        USER.completedModules.push(moduleId);
    }
    USER.xp = (USER.xp || 0) + xpEarned;
    USER.scores[moduleId] = score;
    USER.lastActivity = new Date().toISOString();
    
    const newBadges = checkBadges(USER);
    if (newBadges.length > 0) {
        USER.badges = [...(USER.badges || []), ...newBadges];
        showBadgeNotification(newBadges);
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    
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
    answers.forEach((answer, qIndex) => {
        const options = document.querySelectorAll(`input[name="q${qIndex}"]`);
        options.forEach((opt, oIndex) => {
            const parent = opt.parentElement;
            parent.style.pointerEvents = 'none';
            
            if (oIndex === module.quiz[qIndex].correct) {
                parent.classList.add('correct');
            } else if (oIndex === answer.selected && !answer.correct) {
                parent.classList.add('incorrect');
            }
        });
    });
    
    const isPassing = score >= 60;
    const resultsDiv = document.createElement('div');
    resultsDiv.style.cssText = 'margin-top: 2rem; padding: 2rem; background: white; border: 2px solid ' + (isPassing ? 'var(--success)' : 'var(--warning)') + '; border-radius: var(--radius-lg); text-align: center;';
    resultsDiv.innerHTML = `
        <h2 style="font-size: 2rem; color: ${isPassing ? 'var(--success)' : 'var(--warning)'}; margin-bottom: 1rem;">
            ${isPassing ? '🎉 Parabéns!' : '💪 Quase lá!'}
        </h2>
        <p style="font-size: 1.3rem; margin-bottom: 1rem;">
            Pontuação: <strong>${score}%</strong>
        </p>
        <p style="color: var(--gray-500); margin-bottom: 1.5rem;">
            ${isPassing ? 
                `Módulo concluído com sucesso! Ganhou ${xpEarned} XP.` : 
                `Continue a aprender. Ganhou ${xpEarned} XP.`
            }
        </p>
        <button class="btn btn-primary" onclick="goToModules()">
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
        <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="font-size: 2rem; font-weight: 700;">🏅 Conquistas e Badges</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                <p style="color: var(--gray-500); margin-bottom: 2rem;">
                    Complete desafios para desbloquear badges especiais
                </p>
                <div class="badge-grid" id="badgesGrid"></div>
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
            <div class="badge-description">${badge.description}</div>
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
        <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="font-size: 2rem; font-weight: 700;">📖 Biblioteca de Recursos</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                <p style="color: var(--gray-500); margin-bottom: 2rem;">
                    Materiais de estudo e recursos adicionais
                </p>
                <div id="libraryContent"></div>
            </div>
        </div>
    `;
    
    const libraryContent = document.getElementById('libraryContent');
    
    const quickGuide = document.createElement('div');
    quickGuide.innerHTML = `
        <div style="background: linear-gradient(135deg, var(--primary-50), var(--primary-100)); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1.5rem; font-size: 1.5rem;">📋 Guia Rápido Anti-Phishing</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="background: white; padding: 1rem; border-radius: var(--radius);">
                    <span style="color: var(--primary-600);">🔍 VERIFIQUE</span>
                    <p style="margin-top: 0.5rem;">Sempre o remetente e URLs</p>
                </div>
                <div style="background: white; padding: 1rem; border-radius: var(--radius);">
                    <span style="color: var(--warning);">⚠️ DESCONFIE</span>
                    <p style="margin-top: 0.5rem;">De urgência e ofertas boas demais</p>
                </div>
                <div style="background: white; padding: 1rem; border-radius: var(--radius);">
                    <span style="color: var(--success);">🛡️ PROTEJA</span>
                    <p style="margin-top: 0.5rem;">Nunca partilhe credenciais</p>
                </div>
            </div>
        </div>
    `;
    libraryContent.appendChild(quickGuide);
    
    const casesSection = document.createElement('div');
    casesSection.innerHTML = '<h3 style="margin-bottom: 1.5rem; font-size: 1.5rem;">📋 Casos Reais de Phishing em Portugal</h3>';
    
    REAL_CASES.forEach(case_ => {
        const caseDiv = document.createElement('div');
        caseDiv.style.cssText = 'background: white; border-left: 4px solid var(--warning); padding: 1.5rem; margin: 1rem 0; border-radius: var(--radius); box-shadow: var(--shadow-sm);';
        caseDiv.innerHTML = `
            <h4 style="color: var(--warning); margin-bottom: 0.75rem;">${case_.title}</h4>
            <p style="font-size: 0.9rem; color: var(--gray-500); margin-bottom: 0.5rem;">
                <strong>Data:</strong> ${case_.date} | <strong>Alvo:</strong> ${case_.target}
            </p>
            <p style="margin-bottom: 1rem; line-height: 1.6;">${case_.description}</p>
            <div style="background: var(--success-light); padding: 1rem; border-radius: var(--radius); border-left: 3px solid var(--success);">
                <strong style="color: var(--success);">💡 Lição Aprendida:</strong><br>
                ${case_.lesson}
            </div>
        `;
        casesSection.appendChild(caseDiv);
    });
    
    libraryContent.appendChild(casesSection);
}

// ==================== CERTIFICATE PAGE ====================

function loadCertificatePage() {
    const progress = calculateProgress(USER);
    const avgScore = calculateAverage(USER.scores);
    const canGetCertificate = progress === 100 && avgScore >= 80;
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 900px; margin: 0 auto;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="font-size: 2rem; font-weight: 700;">📜 Certificado de Conclusão</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                ${canGetCertificate ? `
                    <div class="certificate">
                        <h1>CERTIFICADO</h1>
                        <h2>de Conclusão</h2>
                        <p>Certifica-se que</p>
                        <div class="certificate-name">${USER.name}</div>
                        <p>completou com sucesso a formação em<br>
                        <strong>Segurança Digital e Proteção contra Phishing</strong><br>
                        obtendo uma taxa de sucesso de <strong>${avgScore}%</strong></p>
                        <p style="margin-top: 2rem;">
                            Data de conclusão: ${new Date().toLocaleDateString('pt-PT')}<br>
                            XP Total: ${USER.xp}
                        </p>
                        <button class="btn btn-primary" onclick="window.print()" style="margin-top: 2rem;">
                            🖨️ Imprimir / Guardar PDF
                        </button>
                    </div>
                ` : `
                    <div style="text-align: center; padding: 4rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Certificado Bloqueado</h3>
                        <p>Complete todos os módulos com pelo menos 80% de média para desbloquear o certificado.</p>
                        <div style="margin-top: 2rem; background: var(--gray-50); padding: 1.5rem; border-radius: var(--radius);">
                            <p><strong>Progresso atual:</strong> ${progress}%</p>
                            <p><strong>Média de pontuação:</strong> ${avgScore}%</p>
                            <p><strong>Módulos concluídos:</strong> ${USER.completedModules.length}/${MODULES.length}</p>
                        </div>
                        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                            <button class="btn btn-primary" onclick="goToModules()">
                                📚 Continuar Formação
                            </button>
                        </div>
                    </div>
                `}
            </div>
        </div>
    `;
}

// ==================== MESSAGES / NOTIFICATIONS ====================

function showMessage(message, type = 'info') {
    const colors = {
        success: 'var(--success)',
        error: 'var(--danger)',
        warning: 'var(--warning)',
        info: 'var(--primary-500)'
    };
    
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        color: ${colors[type]};
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        border-left: 4px solid ${colors[type]};
        box-shadow: var(--shadow-lg);
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

// ==================== ADMIN HELPER FUNCTIONS ====================

window.generateNewKey = async function() {
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
        companyCode: COMPANY.code || USER.companyCode,
        createdBy: USER.email
    };
    
    try {
        if (database) {
            await database.ref('activationKeys').push(keyData);
        }
        
        document.getElementById('generatedKey').textContent = key;
        document.getElementById('generatedKeyDisplay').classList.remove('hidden');
        
        showMessage('✅ Chave gerada com sucesso!', 'success');
        
        loadKeysList();
    } catch (error) {
        console.error('Erro ao gerar chave:', error);
        showMessage('Erro ao gerar chave', 'error');
    }
};

window.copyKeyToClipboard = function() {
    const key = document.getElementById('generatedKey').textContent;
    navigator.clipboard.writeText(key).then(() => {
        showMessage('📋 Chave copiada!', 'success');
    }).catch(() => {
        showMessage('Erro ao copiar', 'error');
    });
};

window.exportCompanyData = function() {
    showMessage('Função de exportação em desenvolvimento', 'info');
};

window.exportEmployeesList = function() {
    showMessage('Função de exportação em desenvolvimento', 'info');
};

window.updateCompanySettings = function() {
    showMessage('Configurações guardadas com sucesso!', 'success');
};

window.updateTrainingSettings = function() {
    showMessage('Configurações de formação guardadas!', 'success');
};

// ==================== INITIALIZATION ====================

window.addEventListener('DOMContentLoaded', () => {
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
    
    showLoginType('user');
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

console.log('✅ PhishGuard Elite carregado com sucesso!');
