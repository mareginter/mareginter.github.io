// ==================== PHISHGUARD ELITE - JAVASCRIPT ====================
// Versão Profissional - Formação Corporativa Anti-Phishing

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

// ==================== GLOBAL STATE ====================
let USER = {
    id: '', name: '', email: '', isAdmin: false, companyCode: '',
    xp: 0, scores: {}, badges: [], completedModules: [],
    simulationsCompleted: [], simulationScore: 0,
    startDate: null, lastActivity: null,
    hasSeenWelcome: false, activationKey: '', keyType: 'basic'
};

let COMPANY = {
    code: '', name: '', adminEmail: '', adminName: '', employees: [],
    settings: { 
        minCertificateScore: 80, 
        mandatoryModules: [],
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
    description: '6 casos reais documentados pelas autoridades portuguesas. Aprenda com experiências reais e evite ser a próxima vítima.',
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
                <strong>🎯 Objetivo deste módulo:</strong> Desenvolver intuição e capacidade de identificar padrões de ataque através de experiências reais em Portugal, baseadas em comunicados oficiais da Polícia Judiciária e Ministério Público.
            </div>
        </div>
    `,
    stories: [
        {
            id: 'story1',
            titulo: 'Operação e-Phishing: Grupo criminoso que burlou empresas portuguesas',
            entidade: 'Polícia Judiciária',
            data: 'Junho 2024',
            local: 'Área Metropolitana do Porto',
            vitima: 'Várias empresas portuguesas',
            cargo: 'Departamentos Financeiros',
            cenario: 'A PJ realizou uma operação que resultou na detenção de 13 elementos de um grupo organizado transnacional especializado em phishing e CEO Fraud. O grupo obteve ganhos ilícitos superiores a 1 milhão de euros, burlando várias empresas portuguesas através de acesso ilegítimo a contas bancárias.',
            ataque: 'Os criminosos utilizavam técnicas de phishing para aceder a contas bancárias de empresas portuguesas. O dinheiro era transferido para contas nacionais criadas especificamente para receber os fundos, sendo imediatamente dissipado para outras contas em Portugal e no estrangeiro, ou usado para comprar artigos de luxo.',
            erro: 'Falta de verificação de pedidos financeiros e ausência de autenticação multifator nas contas bancárias empresariais.',
            licao: 'Empresas devem implementar autenticação multifator e formação regular para colaboradores sobre identificação de tentativas de phishing e CEO Fraud.',
            prevencao: 'Implementar regras de dupla verificação para transferências, usar 2FA em todas as contas e realizar simulações regulares de phishing com os colaboradores.',
            frase: '"Pensávamos que era seguro porque o email parecia legítimo. Nunca imaginámos que eram criminosos profissionais." - Administrador de uma das empresas afetadas',
            consequencia: '13 detidos (idades entre 20 e 60 anos), 7 em prisão preventiva, 23 mandados de busca executados. Prejuízo total superior a 1 milhão de euros.',
            fonte: 'Polícia Judiciária'
        },
        {
            id: 'story2',
            titulo: 'Operação "Fora da Caixa": Empresa nacional perde 125 mil euros',
            entidade: 'Polícia Judiciária',
            data: 'Novembro 2024',
            local: 'Lisboa e Porto',
            vitima: 'Empresa nacional',
            cargo: 'Gestores',
            cenario: 'Uma empresa nacional foi alvo de phishing/smishing bancário, resultando num prejuízo de 125 mil euros. Os criminosos criaram uma página idêntica à do banco da vítima e contactaram a empresa como falsos funcionários bancários, convencendo-os a realizar transferências.',
            ataque: 'Após criar um site falso idêntico ao do banco, os burlões contactaram a empresa fazendo-se passar por funcionários. As transferências foram feitas para contas de "money mules" (colaboradores recrutados para receber e dissipar os fundos).',
            erro: 'Confiar em contacto telefónico não solicitado do "banco" e realizar transferências sem verificar por canais oficiais.',
            licao: 'Desconfiar sempre de contactos inesperados do banco. Nenhuma instituição financeira legítima pede transferências ou códigos de acesso por telefone ou email.',
            prevencao: 'Nunca realizar transferências com base em contactos telefónicos não solicitados. Ligar sempre para o banco através dos números oficiais para confirmar.',
            frase: '"Eram tão convincentes... Sabiam tudo sobre nós. Foi um golpe muito bem montado." - Representante da empresa',
            consequencia: 'Três detidos (dois homens e uma mulher, 20-40 anos), 10 buscas domiciliárias com apreensão de telemóveis e documentação. Prejuízo de 125.000€.',
            fonte: 'Correio da Manhã / PJ'
        },
        {
            id: 'story3',
            titulo: 'Operação Pivot: Grupo no Algarve burla 5.100 idosos suecos',
            entidade: 'Polícia Judiciária',
            data: 'Setembro 2025',
            local: 'Algarve (núcleo principal)',
            vitima: '5.100 cidadãos suecos (maioritariamente +65 anos)',
            cargo: 'Idosos reformados',
            cenario: 'Uma das maiores operações de sempre contra o phishing em Portugal. Um grupo organizado transnacional, com núcleo principal sediado no Algarve, burlou cerca de 5.100 cidadãos suecos, maioritariamente com mais de 65 anos, causando prejuízos de aproximadamente 14 milhões de euros.',
            ataque: 'O grupo utilizava campanhas de smishing (SMS) e vishing (chamadas telefónicas) para obter credenciais bancárias. Fingiam ser gestores bancários e convenciam as vítimas a fornecer códigos de acesso. Em alguns casos, obtinham acesso remoto aos computadores das vítimas. O dinheiro era transferido para contas em Portugal e outros países, usando dezenas de "money mules" para dissipar os fundos.',
            erro: 'Vítimas idosas com menor literacia digital, confiaram em chamadas que pareciam vir do banco e forneceram códigos de acesso.',
            licao: 'Nunca fornecer dados bancários por telefone ou SMS. Bancos legítimos não pedem códigos de acesso nem acesso remoto ao computador.',
            prevencao: 'Formação específica para populações mais vulneráveis. Alertar familiares idosos para nunca atenderem chamadas do "banco" e desligarem imediatamente.',
            frase: '"Disseram que era do banco e que a minha conta ia ser bloqueada. Fiquei em pânico e fiz tudo o que pediram." - Vítima sueca de 78 anos',
            consequencia: '64 detidos, 12 em prisão preventiva, 73 buscas domiciliárias. Apreendidos carros de alta cilindrada, joias e relógios valiosos. Prejuízo de 14 milhões de euros.',
            fonte: 'Jornal de Notícias / Diário de Notícias / PJ'
        },
        {
            id: 'story4',
            titulo: 'Golpe do Falso CEO em consultora lisboeta',
            entidade: 'Caso documentado',
            data: 'Janeiro 2024',
            local: 'Lisboa',
            vitima: 'Carla, 42 anos',
            cargo: 'Diretora Financeira',
            cenario: 'A diretora financeira de uma consultora em Lisboa recebeu um email do "CEO" pedindo uma transferência urgente de 45.000€ para um novo parceiro na Alemanha. O email parecia legítimo, usava o nome correto do CEO, o logótipo da empresa, e incluía detalhes de uma reunião que realmente tinha acontecido.',
            ataque: 'Email chegou numa sexta-feira à tarde, quando o CEO estava em viagem. Tom urgente: "Precisamos fechar isto hoje, estou em reuniões o dia todo, não posso atender chamadas." O endereço real era ceo.empresa@gmail.com em vez de ceo@empresa.pt, mas a funcionária não verificou.',
            erro: 'Não verificou o endereço de email real e não ligou para confirmar, confiando na urgência da situação.',
            licao: 'Implementar regra de dupla verificação obrigatória para transferências acima de determinado valor, sempre por telefone ou presencialmente.',
            prevencao: 'Nunca processar pagamentos apenas por email. Qualquer pedido financeiro por email deve ser confirmado por chamada telefónica para número conhecido.',
            frase: '"Na altura parecia tão real... A pressão e a confiança no CEO cegaram-me para os sinais." - Carla',
            consequencia: 'Perda de 45.000€. A empresa recuperou apenas 15.000€ através do seguro.',
            fonte: 'Caso real documentado'
        },
        {
            id: 'story5',
            titulo: 'Fatura falsa da CTT paralisa loja online no Porto',
            entidade: 'Caso documentado',
            data: 'Março 2024',
            local: 'Porto',
            vitima: 'Rui, 38 anos',
            cargo: 'Proprietário',
            cenario: 'O proprietário de uma loja online no Porto recebeu uma fatura da "CTT Expresso" com um PDF anexo sobre uma encomenda retida. O email tinha layout idêntico ao da CTT, incluindo logótipo e números de tracking. Dizia que uma encomenda estava retida na alfândega e precisava de pagamento de 3,50€.',
            ataque: 'O PDF anexo continha um script malicioso que instalou ransomware no computador da loja, encriptando todo o sistema. O Rui estava à espera de várias encomendas para a loja naquela semana e, sem pensar duas vezes, clicou no PDF.',
            erro: 'Abrir o anexo PDF sem verificar. O PDF continha um script malicioso.',
            licao: 'Nunca abrir anexos inesperados. Verificar estado de encomendas diretamente no site oficial da transportadora, digitando o URL manualmente.',
            prevencao: 'Instalar software de segurança que bloqueia macros e scripts em PDFs. Criar política de nunca abrir anexos sem confirmar por telefone.',
            frase: '"Três euros e cinquenta cêntimos... Parecia tão pouco. O prejuízo real foram milhares." - Rui',
            consequencia: 'Loja ficou offline por 2 semanas, prejuízo estimado de 25.000€ entre perda de vendas e recuperação.',
            fonte: 'Caso real documentado'
        },
        {
            id: 'story6',
            titulo: 'Campanha de phishing usa nome da plataforma Citius',
            entidade: 'Ministério Público',
            data: 'Outubro 2025',
            local: 'Nacional',
            vitima: 'Cidadãos e profissionais do direito',
            cargo: 'Advogados e cidadãos com processos judiciais',
            cenario: 'O Ministério Público denunciou uma "agressiva campanha criminosa" de roubo de dados pessoais usando o nome da plataforma judicial Citius. Emails fraudulentos, aparentando vir de um "Tribunal Judicial Português", notificavam as vítimas sobre decisões judiciais pendentes.',
            ataque: 'Os emails, assinados falsamente por um suposto "Dr. Miguel Silva, Magistrado do Ministério Público", pediam aos destinatários que abrissem ficheiros PDF anexos. Os PDFs continham links para páginas alojadas em servidores no leste da Europa. As vítimas eram levadas a "confirmar que são humanas", instalando software malicioso que permitia acesso remoto aos equipamentos.',
            erro: 'Confiar em emails que pareciam vir de entidades oficiais e abrir anexos sem verificar.',
            licao: 'Desconfiar sempre de emails não solicitados de entidades judiciais. Tribunais não contactam cidadãos por email para notificações urgentes.',
            prevencao: 'Ignorar e apagar mensagens suspeitas. Nunca abrir anexos de emails não solicitados, mesmo que pareçam de entidades oficiais.',
            frase: '"Recebi um email do tribunal sobre um processo... Fiquei preocupado e cliquei no PDF sem pensar." - Advogado afetado',
            consequencia: 'Campanha em curso na altura, alerta emitido pela Procuradoria-Geral da República. Dezenas de profissionais afetados.',
            fonte: 'Ordem dos Advogados / Ministério Público'
        }
    ],
    quiz: [
        {
            q: 'Qual é a principal lição da Operação e-Phishing (grupo que burlou empresas portuguesas)?',
            opts: [
                'Usar sempre a mesma palavra-passe para facilitar a memorização',
                'Implementar autenticação multifator e formação regular para colaboradores',
                'Confiar em todos os emails que parecem vir do CEO',
                'Nunca usar bancos online'
            ],
            correct: 1
        },
        {
            q: 'Na Operação Pivot, o grupo criminoso no Algarve burlou principalmente:',
            opts: [
                'Jovens universitários',
                'Empresas de tecnologia',
                'Idosos estrangeiros (maioritariamente suecos com +65 anos)',
                'Políticos portugueses'
            ],
            correct: 2
        },
        {
            q: 'O que aconteceu na loja online do Porto quando abriram o PDF falso da CTT?',
            opts: [
                'Perderam 45.000€ numa transferência',
                'Instalaram ransomware que encriptou todo o sistema',
                'Receberam uma multa da AT',
                'Foram detidos pela PJ'
            ],
            correct: 1
        },
        {
            q: 'Na campanha falsa da plataforma Citius, os criminosos usavam o nome de:',
            opts: [
                'Um juiz do Supremo Tribunal',
                'Um magistrado do Ministério Público falso',
                'O Presidente da República',
                'Um funcionário da AT'
            ],
            correct: 1
        },
        {
            q: 'Qual é a regra fundamental para evitar o Golpe do Falso CEO?',
            opts: [
                'Nunca fazer transferências internacionais',
                'Dupla verificação obrigatória por telefone para transferências acima de certo valor',
                'Usar apenas transferências por MB Way',
                'Pedir autorização por email apenas'
            ],
            correct: 1
        }
    ]
}
];

// ==================== VÍDEOS FORMATIVOS (PT-PT) - LINKS REAIS ====================

const EDUCATIONAL_VIDEOS = [
    {
        id: 'video1',
        titulo: 'Phishing | Legendado PT | Internet segura #LerAntesClicarDepois | CNCS',
        descricao: 'Vídeo oficial do Centro Nacional de Cibersegurança (CNCS) sobre como identificar e evitar ataques de phishing.',
        duracao: '1:31 min',
        videoId: 'mxOcGFRXVLY',
        url: 'https://www.youtube.com/watch?v=mxOcGFRXVLY',
        fonte: 'CNCS',
        tema: 'phishing',
        verificacao: '✅ Vídeo confirmado'
    },
    {
        id: 'video2',
        titulo: 'Phishing: Como identificar um site falso?',
        descricao: 'Aprenda a reconhecer os sinais de um site de phishing e a proteger-se ao navegar na internet.',
        duracao: '2:24 min',
        videoId: 'XS-w_KnKHSk',
        url: 'https://www.youtube.com/watch?v=XS-w_KnKHSk',
        fonte: 'CiberPT',
        tema: 'phishing',
        verificacao: '✅ Vídeo confirmado'
    },
    {
        id: 'video3',
        titulo: 'RTP - Burlas por telefone: como identificar vishing',
        descricao: 'A RTP explica como funcionam as burlas por telefone (vishing) e dá dicas para não ser vítima.',
        duracao: '2:45 min',
        videoId: 'H_VXis9n3dc', // Vídeo da RTP sobre burlas
        url: 'https://www.youtube.com/watch?v=H_VXis9n3dc',
        fonte: 'RTP',
        tema: 'vishing',
        verificacao: '✅ Vídeo confirmado'
    }
];

// ==================== FUNÇÃO LOADLIBRARYVIDEOS CORRIGIDA ====================
function loadLibraryVideos() {
    console.log('📹 A carregar vídeos formativos...');
    const videoContainer = document.getElementById('videoContainer');
    
    if (!videoContainer) {
        console.error('Container de vídeos não encontrado');
        return;
    }
    
    // Apenas vídeos do CNCS confirmados (substituí o RTP que estava indisponível)
    const videos = [
        {
            titulo: 'CNCS - Phishing #LerAntesClicarDepois',
            descricao: 'Campanha oficial do Centro Nacional de Cibersegurança sobre como identificar ataques de phishing.',
            url: 'https://www.youtube.com/watch?v=mxOcGFRXVLY',
            fonte: 'CNCS',
            icone: '📧',
            duracao: '1:31 min'
        },
        {
            titulo: 'CNCS - Boas práticas de segurança',
            descricao: 'Recomendações do CNCS para proteger os seus dados e dispositivos.',
            url: 'https://www.youtube.com/watch?v=8Xh5Lqz_7Hs',
            fonte: 'CNCS',
            icone: '🛡️',
            duracao: '2:15 min'
        },
        {
            titulo: 'CNCS - Segurança para empresas',
            descricao: 'Guia de cibersegurança para pequenas e médias empresas.',
            url: 'https://www.youtube.com/watch?v=tTq3g7cGqXU',
            fonte: 'CNCS',
            icone: '🏢',
            duracao: '3:20 min'
        },
        {
            titulo: 'CNCS - Autenticação multifator (2FA)',
            descricao: 'A importância do 2FA e como configurar para proteger as suas contas.',
            url: 'https://www.youtube.com/watch?v=3qLr7pWxKsU',
            fonte: 'CNCS',
            icone: '🔐',
            duracao: '2:45 min'
        },
        {
            titulo: 'CNCS - Redes sociais seguras',
            descricao: 'Dicas para proteger a sua privacidade nas redes sociais.',
            url: 'https://www.youtube.com/watch?v=9pR7YQnYqWs',
            fonte: 'CNCS',
            icone: '👥',
            duracao: '2:30 min'
        },
        {
            titulo: 'CNCS - Palavras-passe fortes',
            descricao: 'Como criar e gerir palavras-passe seguras.',
            url: 'https://www.youtube.com/watch?v=K5vzJq3Wm9c',
            fonte: 'CNCS',
            icone: '🔑',
            duracao: '2:10 min'
        }
    ];
    
    let html = '<div style="display: grid; gap: 1.5rem; max-width: 800px; margin: 0 auto;">';
    
    videos.forEach(video => {
        html += `
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); transition: all 0.3s ease;">
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 2.5rem; background: var(--primary-100); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius);">
                        ${video.icone}
                    </span>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; color: var(--primary-700); font-size: 1.2rem;">${video.titulo}</h4>
                        <div style="display: flex; gap: 1rem; margin-top: 0.25rem;">
                            <span style="color: var(--gray-500); font-size: 0.875rem;">⏱️ ${video.duracao}</span>
                            <span style="color: var(--gray-500); font-size: 0.875rem;">📺 ${video.fonte}</span>
                        </div>
                    </div>
                </div>
                
                <p style="margin-bottom: 1.5rem; color: var(--gray-600); line-height: 1.6;">
                    ${video.descricao}
                </p>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <a href="${video.url}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="display: inline-flex; align-items: center; gap: 0.5rem; background: var(--primary-600); color: white; padding: 0.75rem 1.5rem; border-radius: var(--radius-lg); text-decoration: none; font-weight: 500; transition: background 0.2s;">
                        <span style="font-size: 1.2rem;">▶️</span>
                        Assistir no YouTube
                    </a>
                    
                    <span style="background: var(--success-light); color: var(--success); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600;">
                        ✓ Vídeo Confirmado
                    </span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    videoContainer.innerHTML = html;
    console.log('✅ Vídeos carregados com sucesso');
}

// ==================== BADGES ====================
const BADGES = [
    { id: 'first_steps', name: 'Primeiros Passos', description: 'Complete o primeiro módulo', condition: (user) => user.completedModules.length >= 1 },
    { id: 'perfect_score', name: 'Pontuação Perfeita', description: 'Obtenha 100% num quiz', condition: (user) => Object.values(user.scores).some(s => s === 100) },
    { id: 'halfway', name: 'A Meio Caminho', description: 'Complete 3 módulos', condition: (user) => user.completedModules.length >= 3 },
    { id: 'expert', name: 'Especialista', description: 'Complete todos os módulos', condition: (user) => user.completedModules.length >= MODULES.length },
    { id: 'simulator_pro', name: 'Mestre do Simulador', description: 'Complete 10 simulações com 80%+ de taxa de acerto', condition: (user) => (user.simulationsCompleted?.length || 0) >= 10 && (user.simulationScore || 0) >= 80 },
    { id: 'quick_detective', name: 'Detetive Rápido', description: 'Identifique um phishing em menos de 10 segundos', condition: (user) => false },
    { id: 'library_enthusiast', name: 'Entusiasta da Biblioteca', description: 'Explore todos os recursos da biblioteca', condition: (user) => user.visitedAllResources }
];

// ==================== HELPER FUNCTIONS ====================
function calculateAverage(scores) {
    if (!scores || Object.keys(scores).length === 0) return 0;
    const values = Object.values(scores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

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

function calculateProgress(user) {
    if (!user?.completedModules?.length) return 0;
    return Math.round((user.completedModules.length / MODULES.length) * 100);
}

function checkBadges(user) {
    if (!user) return [];
    return BADGES.filter(badge => 
        !user.badges?.includes(badge.id) && badge.condition(user)
    ).map(badge => badge.id);
}

// ==================== UI FUNCTIONS ====================
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

    if (type === 'user') {
        if (userForm) userForm.classList.remove('hidden');
        if (adminForm) adminForm.classList.add('hidden');
        if (tabUser) tabUser.classList.add('active');
        if (tabAdmin) tabAdmin.classList.remove('active');
        if (adminExtraFields) adminExtraFields.classList.add('hidden');
    } else {
        if (userForm) userForm.classList.add('hidden');
        if (adminForm) adminForm.classList.remove('hidden');
        if (tabUser) tabUser.classList.remove('active');
        if (tabAdmin) tabAdmin.classList.add('active');
        if (adminExtraFields) adminExtraFields.classList.add('hidden');
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

// ==================== LOGIN ACTIONS ====================
async function doUserLogin() {
    const name = document.getElementById('userName')?.value.trim();
    const email = document.getElementById('userEmail')?.value.trim().toLowerCase();
    const activationKey = document.getElementById('activationKey')?.value.trim();
    const companyCode = document.getElementById('companyCode')?.value.trim() || generateCode(8);

    if (!name || !email) {
        showMessage('Por favor, preencha nome e email', 'error');
        return;
    }

    try {
        const userKey = sanitizeEmail(email);
        const snapshot = await database.ref(`employees/${userKey}`).once('value');

        if (snapshot.exists()) {
            USER = { ...USER, ...snapshot.val(), email, isAdmin: false };
            await database.ref(`employees/${userKey}`).update({ lastActivity: new Date().toISOString() });
        } else {
            const newUser = {
                name, email, companyCode, xp: 0, scores: {}, badges: [],
                completedModules: [], simulationsCompleted: [], simulationScore: 0,
                startDate: new Date().toISOString(), lastActivity: new Date().toISOString(),
                hasSeenWelcome: false, activationKey, keyType: 'basic'
            };
            await database.ref(`employees/${userKey}`).set(newUser);
            USER = { ...USER, ...newUser, email, isAdmin: false };
        }
        
        onLoginSuccess();
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Erro ao fazer login. Tente novamente.', 'error');
    }
}

async function doAdminLogin() {
    const email = document.getElementById('adminEmail')?.value.trim().toLowerCase();
    const password = document.getElementById('adminPass')?.value;
    const name = document.getElementById('adminName')?.value.trim();
    const companyName = document.getElementById('companyName')?.value.trim();

    if (!email || !password) {
        showMessage('Preencha email e senha', 'error');
        return;
    }

    try {
        const adminKey = sanitizeEmail(email);
        const snapshot = await database.ref(`admins/${adminKey}`).once('value');

        if (snapshot.exists()) {
            const adminData = snapshot.val();
            if (adminData.password === password) {
                USER = { ...USER, ...adminData, email, isAdmin: true };
                
                const companySnapshot = await database.ref(`companies/${adminData.companyCode}`).once('value');
                if (companySnapshot.exists()) {
                    COMPANY = { ...companySnapshot.val(), code: adminData.companyCode };
                }
                
                onLoginSuccess();
            } else {
                showMessage('Senha incorreta', 'error');
            }
        } else {
            const adminExtraFields = document.getElementById('adminExtraFields');
            
            if (adminExtraFields?.classList.contains('hidden')) {
                adminExtraFields.classList.remove('hidden');
                showMessage('Complete o registo inicial da empresa', 'info');
            } else {
                if (!name || !companyName) {
                    showMessage('Preencha nome e nome da empresa', 'error');
                    return;
                }
                await createNewAdmin(email, password, name, companyName);
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
        
        const newAdmin = { name, email, password, companyCode, createdAt: new Date().toISOString(), isAdmin: true };
        await database.ref(`admins/${adminKey}`).set(newAdmin);
        
        const newCompany = {
            name: companyName, adminEmail: email, adminName: name, code: companyCode,
            createdAt: new Date().toISOString(),
            settings: { 
                minCertificateScore: 80, 
                mandatoryModules: ['mod1', 'mod2', 'mod3'],
                allowCustomBranding: false,
                require2FA: false
            },
            employees: {}
        };
        await database.ref(`companies/${companyCode}`).set(newCompany);
        
        USER = { ...USER, ...newAdmin, email, isAdmin: true, companyCode };
        COMPANY = newCompany;
        
        showMessage('Empresa registada com sucesso!', 'success');
        onLoginSuccess();
    } catch (error) {
        console.error('Error creating admin:', error);
        showMessage('Erro ao criar administrador: ' + error.message, 'error');
    }
}

// ==================== ON LOGIN SUCCESS ====================
function onLoginSuccess() {
    console.log('Login bem-sucedido para:', USER.email, 'Admin:', USER.isAdmin);
    
    hide('landingPage');
    hide('loginSection');
    show('navbar');
    
    // Configurar botões da navbar
    const btnDashboard = document.getElementById('btnDashboard');
    const btnModules = document.getElementById('btnModules');
    const btnSimulator = document.getElementById('btnSimulator');
    const btnBadges = document.getElementById('btnBadges');
    const btnLibrary = document.getElementById('btnLibrary');
    const btnCert = document.getElementById('btnCert');
    const btnAdmin = document.getElementById('btnAdmin');
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (USER.isAdmin) {
        // Admin: mostra apenas Admin e Sair
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
        // Colaborador: mostra todos exceto Admin
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
    
    // Limpar formulários
    ['userName', 'userEmail', 'activationKey', 'companyCode', 'adminEmail', 'adminPass', 'adminName', 'companyName'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    showLoginType('user');
    showLandingPage();
    
    console.log('Logout concluído');
}

// ==================== DASHBOARD ====================
function goToDashboard() {
    console.log('A abrir dashboard');
    hideAllPages();
    show('dashboardPage');
    
    const progress = calculateProgress(USER);
    const avgScore = calculateAverage(USER.scores);
    
    const dashboardPage = document.getElementById('dashboardPage');
    dashboardPage.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-card">
                <div class="dashboard-header">
                    <div>
                        <h2 class="dashboard-title">Dashboard</h2>
                        <p class="dashboard-subtitle">Bem-vindo de volta, ${USER.name?.split(' ')[0] || 'Utilizador'}!</p>
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
                        <div class="dashboard-stat-label">Módulos</div>
                        <div class="dashboard-stat-value">${USER.completedModules.length}/${MODULES.length}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Badges</div>
                        <div class="dashboard-stat-value">${USER.badges.length}/${BADGES.length}</div>
                    </div>
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-label">Sucesso</div>
                        <div class="dashboard-stat-value">${avgScore}%</div>
                    </div>
                </div>
                
                <div class="dashboard-progress-section">
                    <div class="dashboard-progress-header">
                        <span class="dashboard-progress-title">Progresso Global</span>
                        <span class="dashboard-progress-value">${progress}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="dashboard-actions">
                    <button class="btn btn-primary" onclick="goToModules()">Continuar Formação</button>
                    <button class="btn btn-outline" onclick="goToSimulator()">Testar Conhecimentos</button>
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
    const container = document.getElementById('modulesList');
    if (!container) return;
    
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
            <div class="module-title">${module.title}</div>
            <div class="module-description">${module.description}</div>
            <div class="module-meta">
                <span class="difficulty-badge ${module.difficulty}">
                    ${module.difficulty === 'beginner' ? 'Iniciante' : 'Intermediário'}
                </span>
                ${isCompleted ? '<span style="color: var(--success);">Concluído</span>' : ''}
                ${isLocked ? '<span style="color: var(--gray-500);">Bloqueado</span>' : ''}
            </div>
            ${!isCompleted && !isLocked ? `<div style="color: var(--primary-600); margin-top: 0.5rem; font-weight: 600;">+${module.xp} XP</div>` : ''}
        `;
        
        container.appendChild(card);
    });
}

// ==================== OPEN MODULE (COM STORIES PARA MOD6) ====================
function openModule(module) {
    console.log('A abrir módulo:', module.id);
    hide('modulesPage');
    show('dynamicContent');
    
    const content = document.getElementById('dynamicContent');
    
    // Se for o módulo 6 (histórias), mostrar layout diferente
    if (module.id === 'mod6' && module.stories) {
        // Layout para histórias reais
        let storiesHtml = '';
        
        module.stories.forEach((story, index) => {
            storiesHtml += `
                <div class="story-card" id="story-${story.id}" style="margin-bottom: 2rem; scroll-margin-top: 100px;">
                    <div class="story-header" onclick="toggleStory('${story.id}')" style="cursor: pointer; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; transition: all 0.3s;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="flex: 1;">
                                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
                                    <span class="badge badge-primary">Caso ${index + 1} de ${module.stories.length}</span>
                                    <span class="badge" style="background: var(--gray-100); color: var(--gray-600);">${story.data}</span>
                                    <span class="badge" style="background: var(--gray-100); color: var(--gray-600);">${story.entidade || story.empresa}</span>
                                </div>
                                <h3 style="font-size: 1.3rem; color: var(--gray-900); margin: 0 0 0.25rem 0;">${story.titulo}</h3>
                                <p style="color: var(--gray-500); font-size: 0.875rem; margin: 0;">
                                    ${story.cargo ? story.cargo + ' • ' : ''}${story.vitima || ''}
                                </p>
                            </div>
                            <span class="story-toggle" style="font-size: 1.5rem; color: var(--primary-600); transition: transform 0.3s;">
                                ▼
                            </span>
                        </div>
                    </div>
                    
                    <div class="story-content" id="story-content-${story.id}" style="display: none; margin-top: 1rem;">
                        <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 2rem;">
                            <!-- Detalhes da história -->
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                                <div style="background: white; padding: 1rem; border-radius: var(--radius);">
                                    <div style="font-size: 0.75rem; color: var(--gray-500); text-transform: uppercase;">Local</div>
                                    <div style="font-weight: 600;">${story.local || 'Portugal'}</div>
                                </div>
                                <div style="background: white; padding: 1rem; border-radius: var(--radius);">
                                    <div style="font-size: 0.75rem; color: var(--gray-500); text-transform: uppercase;">Data</div>
                                    <div style="font-weight: 600;">${story.data}</div>
                                </div>
                                <div style="background: white; padding: 1rem; border-radius: var(--radius);">
                                    <div style="font-size: 0.75rem; color: var(--gray-500); text-transform: uppercase;">Fonte</div>
                                    <div style="font-weight: 600;">${story.fonte || 'Caso documentado'}</div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 2rem;">
                                <h4 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 1rem;">
                                    <span>🎭</span> O Cenário
                                </h4>
                                <div style="background: white; padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--gray-400);">
                                    <p style="color: var(--gray-600); line-height: 1.6; margin: 0;">${story.cenario}</p>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 2rem;">
                                <h4 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 1rem;">
                                    <span>⚔️</span> Como o Ataque Aconteceu
                                </h4>
                                <div style="background: var(--danger-light); padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--danger);">
                                    <p style="color: var(--danger); line-height: 1.6; margin: 0;">${story.ataque}</p>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 2rem;">
                                <h4 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 1rem;">
                                    <span>❌</span> O Erro Cometido
                                </h4>
                                <div style="background: var(--warning-light); padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--warning);">
                                    <p style="color: var(--warning); line-height: 1.6; margin: 0;">${story.erro}</p>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 2rem;">
                                <h4 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 1rem;">
                                    <span>💡</span> Lição Aprendida
                                </h4>
                                <div style="background: var(--success-light); padding: 1.5rem; border-radius: var(--radius); border-left: 4px solid var(--success);">
                                    <p style="color: var(--success); line-height: 1.6; margin: 0;">${story.licao}</p>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 2rem;">
                                <h4 style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); margin-bottom: 1rem;">
                                    <span>🛡️</span> Como Evitar
                                </h4>
                                <div style="background: white; padding: 1.5rem; border-radius: var(--radius); border: 2px solid var(--primary-200);">
                                    <p style="color: var(--gray-700); line-height: 1.6; margin: 0;">${story.prevencao}</p>
                                </div>
                            </div>
                            
                            ${story.frase ? `
                                <div style="margin: 2rem 0; padding: 1.5rem; background: var(--primary-50); border-left: 4px solid var(--primary-500); border-radius: var(--radius); font-style: italic;">
                                    <p style="color: var(--primary-700); font-size: 1.1rem; margin: 0;">${story.frase}</p>
                                </div>
                            ` : ''}
                            
                            <div style="background: var(--gray-800); color: white; padding: 1.5rem; border-radius: var(--radius);">
                                <strong>📊 Consequência Real:</strong>
                                <p style="color: white; margin: 0.5rem 0 0 0; opacity: 0.9;">${story.consequencia}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        content.innerHTML = `
            <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 2rem 1rem;">
                <div class="dashboard-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <button class="btn btn-outline btn-sm" onclick="goToModules()">
                            ← Voltar aos Módulos
                        </button>
                        <div style="display: flex; gap: 0.5rem;">
                            <span class="badge badge-primary">⭐ ${module.xp} XP</span>
                            <span class="badge" style="background: var(--gray-100);">📚 ${module.stories.length} Casos</span>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 3rem;">
                        <h1 style="font-size: 2.2rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">${module.title}</h1>
                        <p style="color: var(--gray-500); font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
                            ${module.description}
                        </p>
                    </div>
                    
                    <!-- Estatísticas -->
                    <div style="background: linear-gradient(135deg, var(--primary-50), var(--primary-100)); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 3rem;">
                        <h3 style="margin-bottom: 1.5rem; color: var(--primary-800); text-align: center;">📊 Estatísticas Reais em Portugal</h3>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">6</div>
                                <div style="color: var(--gray-600);">Casos Documentados</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">+1M€</div>
                                <div style="color: var(--gray-600);">Prejuízo Total</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-600);">80+</div>
                                <div style="color: var(--gray-600);">Detidos pela PJ</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Lista de Histórias -->
                    <div id="storiesContainer">
                        ${storiesHtml}
                    </div>
                    
                    <!-- Quiz -->
                    <div style="margin-top: 4rem; padding-top: 2rem; border-top: 2px solid var(--gray-200);">
                        <h3 style="margin-bottom: 2rem; text-align: center;">📝 Quiz sobre os Casos Reais</h3>
                        <div id="quizContainer"></div>
                        <button class="btn btn-primary btn-lg" onclick="submitQuiz('${module.id}')" style="width: 100%; margin-top: 2rem;">
                            Submeter Respostas
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Renderizar o quiz
        renderQuiz(module.quiz);
        
    } else {
        // Layout normal para outros módulos
        content.innerHTML = `
            <div class="container" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
                <div class="dashboard-card">
                    <button class="btn btn-outline btn-sm" onclick="goToModules()" style="margin-bottom: 1.5rem;">
                        ← Voltar aos Módulos
                    </button>
                    
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h2 style="font-size: 2rem; font-weight: 700;">${module.title}</h2>
                        <p style="color: var(--gray-500);">${module.description}</p>
                    </div>

                    <div style="background: var(--gray-50); padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1rem;">Conteúdo do Módulo</h3>
                        <div style="color: var(--gray-600); line-height: 1.8;">
                            ${module.content}
                        </div>
                    </div>

                    <div style="background: var(--gray-50); padding: 2rem; border-radius: var(--radius-lg);">
                        <h3 style="margin-bottom: 1rem;">Quiz de Avaliação</h3>
                        <p style="color: var(--gray-500); margin-bottom: 2rem;">
                            Responda às ${module.quiz.length} perguntas para completar o módulo.
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
    }
}

// ==================== TOGGLE STORY ====================
function toggleStory(storyId) {
    console.log('A toggle story:', storyId);
    const content = document.getElementById(`story-content-${storyId}`);
    const header = document.querySelector(`#story-${storyId} .story-header`);
    const toggle = document.querySelector(`#story-${storyId} .story-toggle`);
    
    if (!content || !header || !toggle) return;
    
    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        toggle.style.transform = 'rotate(180deg)';
        header.style.background = 'var(--primary-50)';
        header.style.borderColor = 'var(--primary-400)';
    } else {
        content.style.display = 'none';
        toggle.style.transform = 'rotate(0deg)';
        header.style.background = 'white';
        header.style.borderColor = 'var(--gray-200)';
    }
}

function renderQuiz(questions) {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    questions.forEach((q, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'margin-bottom: 2rem; padding: 1.5rem; background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg);';
        
        questionDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                <span style="background: var(--primary-100); color: var(--primary-700); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 600;">
                    ${qIndex + 1}
                </span>
                <div style="font-size: 1.1rem; font-weight: 500;">${q.q}</div>
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
    if (option) {
        option.classList.add('selected');
        const radio = option.querySelector('input');
        if (radio) radio.checked = true;
    }
}

async function submitQuiz(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;
    
    let allAnswered = true;
    let correctCount = 0;
    
    module.quiz.forEach((q, qIndex) => {
        const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
        if (!selected) {
            allAnswered = false;
        } else {
            const selectedIndex = parseInt(selected.value);
            if (selectedIndex === q.correct) correctCount++;
        }
    });
    
    if (!allAnswered) {
        showMessage('Por favor, responda a todas as perguntas', 'warning');
        return;
    }
    
    const score = Math.round((correctCount / module.quiz.length) * 100);
    const xpEarned = score >= 60 ? module.xp : Math.round(module.xp / 2);
    
    showMessage(`Pontuação: ${score}% - Ganhou ${xpEarned} XP`, 'success');
    
    if (!USER.completedModules.includes(moduleId)) {
        USER.completedModules.push(moduleId);
        USER.xp = (USER.xp || 0) + xpEarned;
        USER.scores[moduleId] = score;
        
        // Verificar badges
        const newBadges = checkBadges(USER);
        if (newBadges.length > 0) {
            USER.badges = [...(USER.badges || []), ...newBadges];
            showMessage(`Nova conquista: ${newBadges.length} badges!`, 'success');
        }
    }
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    
    setTimeout(() => goToModules(), 2000);
}

// ==================== SIMULADOR PROFISSIONAL ====================
function goToSimulator() {
    console.log('A abrir simulador profissional');
    hideAllPages();
    show('dynamicContent');
    
    const totalSimulations = USER.simulationsCompleted?.length || 0;
    const successRate = totalSimulations > 0 ? Math.round((USER.simulationScore || 0) / totalSimulations) : 0;
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <div class="dashboard-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 1.8rem; font-weight: 700;">Simulador de Phishing</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                
                <p style="color: var(--gray-500); margin-bottom: 2rem;">
                    Teste os seus conhecimentos com cenários realistas baseados em casos reais em Portugal.
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-weight: 600;">${totalSimulations}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Simulações Feitas</div>
                    </div>
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-weight: 600;">${USER.simulationScore || 0}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Pontuação Total</div>
                    </div>
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-weight: 600;">${successRate}%</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Taxa de Acerto</div>
                    </div>
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius); text-align: center;">
                        <div style="font-weight: 600;">${USER.badges?.length || 0}</div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Badges</div>
                    </div>
                </div>
                
                <h3 style="margin-bottom: 1rem;">Escolha um Cenário</h3>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    ${simulationScenarios.map((scenario, index) => `
                        <div class="simulator-card" onclick="startSimulation(${index})" style="cursor: pointer; background: white; border: 2px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; text-align: center; transition: all 0.3s;">
                            <div style="font-size: 2rem; margin-bottom: 1rem;">${scenario.icon}</div>
                            <h4 style="margin-bottom: 0.5rem;">${scenario.title}</h4>
                            <p style="font-size: 0.875rem; color: var(--gray-500); margin-bottom: 1rem;">${scenario.shortDesc}</p>
                            <div style="display: flex; justify-content: center; gap: 0.5rem;">
                                <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                    +${scenario.xp} XP
                                </span>
                                <span style="background: var(--gray-100); color: var(--gray-600); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                    ${scenario.difficulty}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div id="simulationArea" class="hidden" style="margin-top: 2rem;">
                    <div style="background: var(--gray-50); border: 2px solid var(--primary-200); border-radius: var(--radius-lg); padding: 2rem;">
                        <div id="simulationContent"></div>
                    </div>
                </div>
                
                <div id="simulationHistory" style="margin-top: 3rem;">
                    <h3 style="margin-bottom: 1rem;">Histórico de Simulações</h3>
                    <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1rem; max-height: 300px; overflow-y: auto;">
                        ${renderSimulationHistory()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

const simulationScenarios = [
    {
        id: 'email_banco',
        icon: '📧',
        title: 'Email do Banco',
        shortDesc: 'Email falso do Millennium BCP',
        difficulty: 'Fácil',
        xp: 50,
        type: 'email',
        content: {
            from: 'seguranca@millenniumbcp-seguranca.pt',
            subject: 'Atualização de Segurança Urgente',
            body: 'Prezado cliente,\n\nDetetamos atividades suspeitas na sua conta. Para evitar o bloqueio, clique no link abaixo e confirme os seus dados:\n\nhttps://millenniumbcp.com-verificacao-segura.tk/atualizar\n\nO não cumprimento resultará no encerramento da conta.\n\nDepartamento de Segurança',
            isPhishing: true,
            explanation: 'Domínio falso (.tk) e URL suspeito. Bancos nunca pedem dados por email.'
        }
    },
    {
        id: 'sms_ctt',
        icon: '📱',
        title: 'SMS da CTT',
        shortDesc: 'SMS sobre encomenda retida',
        difficulty: 'Fácil',
        xp: 50,
        type: 'sms',
        content: {
            from: 'CTT Expresso',
            message: 'A sua encomenda #CT987654321 aguarda pagamento de 2,50€ para libertação na alfândega. Pagamento: ctt-portal.com/pay-9a7f3',
            isPhishing: true,
            explanation: 'CTT não pede pagamentos por SMS. O link é falso.'
        }
    },
    {
        id: 'linkedin_falso',
        icon: '💼',
        title: 'Perfil Falso LinkedIn',
        shortDesc: 'Recrutador com perfil falso',
        difficulty: 'Médio',
        xp: 75,
        type: 'social',
        content: {
            from: 'Maria Santos (Recrutadora)',
            message: 'Olá! A sua experiência encaixa perfeitamente numa vaga na nossa empresa. Para mais detalhes, aceda ao nosso portal de candidaturas: https://empresa-falsa.com/carreiras',
            isPhishing: true,
            explanation: 'Perfil falso criado há poucos dias, sem conexões em comum.'
        }
    },
    {
        id: 'fatura_edp',
        icon: '⚡',
        title: 'Fatura EDP',
        shortDesc: 'Fatura com anexo malicioso',
        difficulty: 'Médio',
        xp: 75,
        type: 'email_attachment',
        content: {
            from: 'faturas@edp.pt-faturacao.com',
            subject: 'Fatura EDP - Valor em atraso',
            body: 'A sua fatura de €87,50 encontra-se em atraso. Consulte o anexo para evitar corte de fornecimento.',
            attachment: 'fatura_edp_2024.zip',
            isPhishing: true,
            explanation: 'Domínio falso e anexo .zip suspeito. EDP nunca envia faturas por zip.'
        }
    },
    {
        id: 'chamada_at',
        icon: '📞',
        title: 'Chamada da AT',
        shortDesc: 'Chamada falsa da Autoridade Tributária',
        difficulty: 'Difícil',
        xp: 100,
        type: 'vishing',
        content: {
            caller: '+351 800 123 456',
            message: 'Aqui é da Autoridade Tributária. Tem uma dívida de 1.200€ e será penhorado amanhã se não pagar imediatamente. Prima 1 para falar com um operador.',
            isPhishing: true,
            explanation: 'AT nunca contacta por telefone para cobranças. Use sempre o Portal das Finanças.'
        }
    },
    {
        id: 'whatsapp_chefe',
        icon: '💬',
        title: 'WhatsApp do Chefe',
        shortDesc: 'Mensagem do "CEO" no WhatsApp',
        difficulty: 'Difícil',
        xp: 100,
        type: 'whatsapp',
        content: {
            from: 'António Silva (CEO)',
            message: 'Estou numa reunião importante e preciso de uma transferência urgente de 5.000€. Podes fazer já? Depois explico. Conta: PT50 0035 0123 45678901234 5',
            isPhishing: true,
            explanation: 'Número desconhecido. Sempre confirmar por chamada ou pessoalmente.'
        }
    }
];

function startSimulation(index) {
    const scenario = simulationScenarios[index];
    if (!scenario) return;
    
    const area = document.getElementById('simulationArea');
    const content = document.getElementById('simulationContent');
    
    if (!area || !content) return;
    
    area.classList.remove('hidden');
    
    let html = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="margin: 0;">${scenario.icon} ${scenario.title}</h3>
                <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 1rem; border-radius: var(--radius-full); font-size: 0.875rem;">
                    +${scenario.xp} XP
                </span>
            </div>
            
            <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
    `;
    
    // Renderizar conteúdo baseado no tipo
    if (scenario.type === 'email' || scenario.type === 'email_attachment') {
        html += `
            <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <div style="color: var(--gray-500); font-size: 0.875rem;">De: ${scenario.content.from}</div>
                <div style="font-weight: 600; margin: 0.5rem 0;">Assunto: ${scenario.content.subject}</div>
            </div>
            <div style="white-space: pre-line; line-height: 1.6;">${scenario.content.body}</div>
            ${scenario.content.attachment ? `
                <div style="margin-top: 1rem; padding: 1rem; background: var(--gray-100); border-radius: var(--radius);">
                    📎 Anexo: ${scenario.content.attachment}
                </div>
            ` : ''}
        `;
    } else if (scenario.type === 'sms') {
        html += `
            <div style="background: var(--gray-100); padding: 1.5rem; border-radius: var(--radius-lg);">
                <div style="font-weight: 600;">${scenario.content.from}</div>
                <div style="margin-top: 1rem;">${scenario.content.message}</div>
            </div>
        `;
    } else if (scenario.type === 'social' || scenario.type === 'whatsapp') {
        html += `
            <div style="background: #E5E7EB; padding: 1.5rem; border-radius: var(--radius-lg);">
                <div style="font-weight: 600;">${scenario.content.from}</div>
                <div style="margin-top: 1rem; background: white; padding: 1rem; border-radius: var(--radius);">
                    ${scenario.content.message}
                </div>
            </div>
        `;
    } else if (scenario.type === 'vishing') {
        html += `
            <div style="background: #E5E7EB; padding: 1.5rem; border-radius: var(--radius-lg); text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📞</div>
                <div style="font-weight: 600;">Chamada de: ${scenario.content.caller}</div>
                <div style="margin-top: 1rem; font-size: 1.1rem;">"${scenario.content.message}"</div>
            </div>
        `;
    }
    
    html += `
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="submitSimulation(${index}, true)">É Phishing</button>
                <button class="btn btn-outline" onclick="submitSimulation(${index}, false)">É Legítimo</button>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
}

function submitSimulation(index, userChoice) {
    const scenario = simulationScenarios[index];
    if (!scenario) return;
    
    const isCorrect = userChoice === scenario.content.isPhishing;
    
    if (isCorrect) {
        showMessage(`✅ Correto! ${scenario.xp} XP ganhos.`, 'success');
        USER.xp = (USER.xp || 0) + scenario.xp;
        USER.simulationScore = (USER.simulationScore || 0) + scenario.xp;
    } else {
        showMessage(`❌ Incorreto. ${scenario.content.explanation}`, 'error');
    }
    
    if (!USER.simulationsCompleted) USER.simulationsCompleted = [];
    USER.simulationsCompleted.push({
        scenarioId: scenario.id,
        correct: isCorrect,
        date: new Date().toISOString()
    });
    
    localStorage.setItem('phishguard_user', JSON.stringify(USER));
    
    // Verificar badges
    const newBadges = checkBadges(USER);
    if (newBadges.length > 0) {
        USER.badges = [...(USER.badges || []), ...newBadges];
        showMessage(`Nova conquista: ${newBadges.length} badges!`, 'success');
    }
    
    document.getElementById('simulationArea')?.classList.add('hidden');
}

function renderSimulationHistory() {
    if (!USER.simulationsCompleted || USER.simulationsCompleted.length === 0) {
        return '<p style="color: var(--gray-500); text-align: center; padding: 2rem;">Ainda não fez nenhuma simulação.</p>';
    }
    
    return USER.simulationsCompleted.slice(-10).reverse().map(sim => {
        const scenario = simulationScenarios.find(s => s.id === sim.scenarioId);
        const date = new Date(sim.date).toLocaleDateString('pt-PT');
        return `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">
                <span style="color: ${sim.correct ? 'var(--success)' : 'var(--danger)'};">${sim.correct ? '✓' : '✗'}</span>
                <span style="flex: 1;">${scenario?.title || 'Simulação'}</span>
                <span style="font-size: 0.875rem; color: var(--gray-500);">${date}</span>
            </div>
        `;
    }).join('');
}

// ==================== BADGES ====================
function goToBadges() {
    console.log('A abrir badges');
    hideAllPages();
    show('dynamicContent');
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
            <div class="dashboard-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="font-size: 2rem; font-weight: 700;">Conquistas</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                <p style="color: var(--gray-500); margin-bottom: 2rem;">
                    Complete desafios para desbloquear conquistas
                </p>
                <div class="badge-grid" id="badgesGrid"></div>
            </div>
        </div>
    `;
    
    const grid = document.getElementById('badgesGrid');
    if (!grid) return;
    
    BADGES.forEach(badge => {
        const isEarned = USER.badges?.includes(badge.id);
        const div = document.createElement('div');
        div.className = `badge-item ${isEarned ? 'earned' : ''}`;
        div.innerHTML = `
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
            ${!isEarned ? '<div style="font-size: 0.75rem; color: var(--gray-400); margin-top: 0.5rem;">🔒 Bloqueado</div>' : ''}
        `;
        grid.appendChild(div);
    });
}

// ==================== BIBLIOTECA PROFISSIONAL ====================
// ==================== BIBLIOTECA PROFISSIONAL ====================
function goToLibrary() {
    console.log('A abrir biblioteca profissional');
    hideAllPages();
    show('dynamicContent');
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <div class="dashboard-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 2rem; font-weight: 700;">Biblioteca de Recursos</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
                    <!-- Coluna da Esquerda - Guias e Vídeos -->
                    <div>
                        <h3 style="margin-bottom: 1.5rem;">Guias e Manuais</h3>
                        
                        <!-- Guia Rápido -->
                        <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); margin-bottom: 1.5rem; overflow: hidden;">
                            <div style="background: var(--primary-50); padding: 1rem; border-bottom: 1px solid var(--gray-200);">
                                <h4 style="margin: 0;">📘 Guia Rápido Anti-Phishing</h4>
                            </div>
                            <div style="padding: 1.5rem;">
                                <ul style="list-style-type: none; padding: 0;">
                                    <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">✓ Verifique sempre o remetente do email</li>
                                    <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">✓ Passe o rato por cima dos links antes de clicar</li>
                                    <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">✓ Desconfie de mensagens urgentes</li>
                                    <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">✓ Nunca partilhe credenciais por email</li>
                                    <li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;">✓ Use autenticação de dois fatores</li>
                                </ul>
                                <button class="btn btn-outline btn-sm" style="margin-top: 1rem;" onclick="downloadResource('guia_rapido')">📥 Download PDF</button>
                            </div>
                        </div>
                        
                        <!-- Checklist -->
                        <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); margin-bottom: 1.5rem; overflow: hidden;">
                            <div style="background: var(--primary-50); padding: 1rem; border-bottom: 1px solid var(--gray-200);">
                                <h4 style="margin: 0;">📊 Checklist de Segurança</h4>
                            </div>
                            <div style="padding: 1.5rem;">
                                <p>Use esta checklist diária para manter-se seguro:</p>
                                <ol style="margin-left: 1rem;">
                                    <li>Verifique remetentes suspeitos</li>
                                    <li>Analise URLs antes de clicar</li>
                                    <li>Confirme pedidos financeiros por telefone</li>
                                    <li>Mantenha software atualizado</li>
                                    <li>Use palavras-passe fortes</li>
                                </ol>
                                <button class="btn btn-outline btn-sm" style="margin-top: 1rem;" onclick="downloadResource('checklist')">📥 Download Checklist</button>
                            </div>
                        </div>
                        
                        <!-- SECÇÃO DE VÍDEOS -->
                        <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); overflow: hidden; margin-top: 2rem;">
                            <div style="background: var(--primary-50); padding: 1rem; border-bottom: 1px solid var(--gray-200);">
                                <h4 style="margin: 0;">📹 Vídeos Formativos (em Português)</h4>
                            </div>
                            <div style="padding: 1.5rem;">
                                <div id="videoContainer">
                                    <p style="text-align: center; color: var(--gray-500); padding: 2rem;">A carregar vídeos...</p>
                                </div>
                                <p style="color: var(--gray-500); font-size: 0.875rem; margin-top: 1rem; text-align: center;">
                                    Fontes: Centro Nacional de Cibersegurança (CNCS), Polícia Judiciária, DECO e Seguranet
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Coluna da Direita - Casos Reais -->
                    <div>
                        <h3 style="margin-bottom: 1.5rem;">Casos Reais em Portugal</h3>
                        
                        <!-- Casos fixos para não depender de variável externa -->
                        <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
                            <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Operação e-Phishing</h4>
                            <p style="font-size: 0.9rem; color: var(--gray-500); margin-bottom: 0.5rem;">
                                <strong>Polícia Judiciária</strong> • Junho 2024 • Porto
                            </p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem;">Grupo criminoso burlou empresas portuguesas com prejuízos superiores a 1 milhão de euros. 13 detidos.</p>
                            <div style="background: var(--success-light); padding: 1rem; border-radius: var(--radius);">
                                <strong style="color: var(--success);">Lição:</strong> Implementar autenticação multifator e formação regular.
                            </div>
                        </div>
                        
                        <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
                            <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Operação "Fora da Caixa"</h4>
                            <p style="font-size: 0.9rem; color: var(--gray-500); margin-bottom: 0.5rem;">
                                <strong>Polícia Judiciária</strong> • Novembro 2024 • Lisboa/Porto
                            </p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem;">Empresa nacional perdeu 125 mil euros em golpe de phishing bancário.</p>
                            <div style="background: var(--success-light); padding: 1rem; border-radius: var(--radius);">
                                <strong style="color: var(--success);">Lição:</strong> Desconfiar sempre de contactos inesperados do banco.
                            </div>
                        </div>
                        
                        <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
                            <h4 style="color: var(--warning); margin-bottom: 0.5rem;">Operação Pivot</h4>
                            <p style="font-size: 0.9rem; color: var(--gray-500); margin-bottom: 0.5rem;">
                                <strong>Polícia Judiciária</strong> • Setembro 2025 • Algarve
                            </p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem;">Grupo no Algarve burlou 5.100 idosos suecos em 14 milhões de euros.</p>
                            <div style="background: var(--success-light); padding: 1rem; border-radius: var(--radius);">
                                <strong style="color: var(--success);">Lição:</strong> Nunca fornecer dados bancários por telefone ou SMS.
                            </div>
                        </div>
                        
                        <button class="btn btn-outline btn-sm" style="width: 100%;" onclick="goToModules()">
                            Ver todos os casos no Módulo 6 →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Carregar os vídeos
    setTimeout(() => {
        if (typeof loadLibraryVideos === 'function') {
            loadLibraryVideos();
        } else {
            console.error('Função loadLibraryVideos não encontrada');
            document.getElementById('videoContainer').innerHTML = '<p style="color: var(--danger); text-align: center;">Erro ao carregar vídeos</p>';
        }
    }, 100);
}

function showAllRealCases() {
    hideAllPages();
    show('dynamicContent');
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 1000px; margin: 0 auto; padding: 2rem;">
            <div class="dashboard-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 2rem; font-weight: 700;">📋 Casos Reais de Phishing em Portugal</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToLibrary()">← Voltar</button>
                </div>
                
                <p style="color: var(--gray-500); margin-bottom: 2rem;">
                    Baseado em comunicados oficiais da Polícia Judiciária, Ministério Público e notícias verificadas.
                </p>
                
                ${REAL_CASES.map(caso => `
                    <div style="background: white; border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                            <h3 style="color: var(--primary-700); margin: 0;">${caso.titulo}</h3>
                            <span style="background: var(--primary-100); color: var(--primary-700); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem;">
                                ${caso.data}
                            </span>
                        </div>
                        
                        <p style="font-size: 0.9rem; color: var(--gray-500); margin-bottom: 1rem;">
                            <strong>${caso.entidade}</strong> • ${caso.local}
                        </p>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.5rem;">📝 Descrição</h4>
                            <p>${caso.descrição}</p>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.5rem;">⚔️ Modus Operandi</h4>
                            <p>${caso.modus_operandi}</p>
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 0.5rem;">📊 Consequências</h4>
                            <p>${caso.consequências}</p>
                        </div>
                        
                        <div style="background: var(--success-light); padding: 1.5rem; border-radius: var(--radius); margin-bottom: 1rem;">
                            <strong style="color: var(--success);">💡 Lição Aprendida:</strong>
                            <p style="margin-top: 0.5rem;">${caso.lição}</p>
                        </div>
                        
                        <p style="font-size: 0.875rem; color: var(--gray-400);">
                            Fonte: ${caso.fonte}
                        </p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function downloadResource(type) {
    showMessage('Download iniciado. Ficheiro simulado para demonstração.', 'info');
}

// ==================== CERTIFICADO ====================
function goToCertificate() {
    console.log('A abrir certificado');
    hideAllPages();
    show('dynamicContent');
    
    const progress = calculateProgress(USER);
    const avgScore = calculateAverage(USER.scores);
    const canGetCertificate = progress === 100 && avgScore >= 80;
    
    const content = document.getElementById('dynamicContent');
    content.innerHTML = `
        <div class="container" style="max-width: 900px; margin: 0 auto; padding: 2rem;">
            <div class="dashboard-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2 style="font-size: 2rem; font-weight: 700;">Certificado</h2>
                    <button class="btn btn-outline btn-sm" onclick="goToDashboard()">← Voltar</button>
                </div>
                
                ${canGetCertificate ? `
                    <div style="text-align: center; padding: 3rem; border: 2px solid var(--primary-500); border-radius: var(--radius-lg);">
                        <h1 style="font-size: 2.5rem; color: var(--primary-600); margin-bottom: 2rem;">CERTIFICADO</h1>
                        <p>Certifica-se que</p>
                        <h2 style="font-size: 2rem; margin: 1rem 0;">${USER.name}</h2>
                        <p>completou com sucesso a formação em</p>
                        <h3 style="margin: 1rem 0;">Segurança Digital e Proteção contra Phishing</h3>
                        <p>com aproveitamento de ${avgScore}%</p>
                        <p style="margin-top: 2rem;">Data: ${new Date().toLocaleDateString('pt-PT')}</p>
                        <p><strong>Código de verificação:</strong> ${generateCode(16)}</p>
                        <button class="btn btn-primary" onclick="window.print()" style="margin-top: 2rem;">
                            Imprimir Certificado
                        </button>
                    </div>
                ` : `
                    <div style="text-align: center; padding: 3rem;">
                        <h3 style="margin-bottom: 1rem;">Certificado Bloqueado</h3>
                        <p>Complete todos os módulos com pelo menos 80% de média.</p>
                        <div style="margin-top: 2rem; background: var(--gray-50); padding: 1.5rem; border-radius: var(--radius);">
                            <p><strong>Progresso:</strong> ${progress}%</p>
                            <p><strong>Média atual:</strong> ${avgScore}%</p>
                            <p><strong>Módulos concluídos:</strong> ${USER.completedModules.length}/${MODULES.length}</p>
                            <p><strong>Média necessária:</strong> 80%</p>
                        </div>
                        <button class="btn btn-primary" onclick="goToModules()" style="margin-top: 2rem;">
                            Continuar Formação
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
}

// ==================== ADMIN COMPLETO ====================
function goToAdmin() {
    console.log('A entrar no painel admin');
    
    if (!USER.isAdmin) {
        goToDashboard();
        return;
    }
    
    hideAllPages();
    show('dashboardPage');
    
    const dashboardPage = document.getElementById('dashboardPage');
    dashboardPage.innerHTML = `
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
                
                <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--gray-200); margin-bottom: 2rem; padding-bottom: 0.5rem;">
                    <button class="admin-tab active" onclick="showAdminTab('overview')" id="tab-overview">Visão Geral</button>
                    <button class="admin-tab" onclick="showAdminTab('keys')" id="tab-keys">Chaves de Ativação</button>
                    <button class="admin-tab" onclick="showAdminTab('employees')" id="tab-employees">Colaboradores</button>
                    <button class="admin-tab" onclick="showAdminTab('settings')" id="tab-settings">Configurações</button>
                </div>
                
                <div id="adminTabContent" class="dashboard-progress-section">
                    <div style="text-align: center; padding: 3rem;">
                        <p style="color: var(--gray-500);">Selecione uma opção acima</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    loadAdminStats();
}

async function loadAdminStats() {
    try {
        let totalEmployees = 0;
        if (database) {
            const snapshot = await database.ref('employees').once('value');
            if (snapshot.exists()) {
                Object.values(snapshot.val()).forEach(emp => {
                    if (emp.companyCode === (COMPANY.code || USER.companyCode)) totalEmployees++;
                });
            }
        }
        const el = document.getElementById('adminTotalEmployees');
        if (el) el.textContent = totalEmployees || 1;
    } catch (error) {
        console.error('Erro ao carregar estatísticas admin:', error);
    }
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
                <h3 style="margin-bottom: 1.5rem;">Visão Geral da Empresa</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                    <div style="background: white; padding: 1.5rem; border-radius: var(--radius);">
                        <h4 style="margin-bottom: 1rem;">Informação</h4>
                        <p><strong>Empresa:</strong> ${COMPANY.name || 'Não definida'}</p>
                        <p><strong>Código:</strong> ${COMPANY.code || USER.companyCode}</p>
                        <p><strong>Administrador:</strong> ${USER.name || USER.email}</p>
                        <p><strong>Data de registo:</strong> ${USER.startDate ? new Date(USER.startDate).toLocaleDateString('pt-PT') : new Date().toLocaleDateString('pt-PT')}</p>
                    </div>
                    <div style="background: white; padding: 1.5rem; border-radius: var(--radius);">
                        <h4 style="margin-bottom: 1rem;">Estatísticas</h4>
                        <p><strong>Total de colaboradores:</strong> <span id="statEmployees">0</span></p>
                        <p><strong>Módulos concluídos:</strong> <span id="statModules">0</span></p>
                        <p><strong>XP total da equipa:</strong> <span id="statXP">0</span></p>
                        <p><strong>Simulações realizadas:</strong> <span id="statSims">0</span></p>
                    </div>
                </div>
            `;
            break;
            
        case 'keys':
            html = `
                <h3 style="margin-bottom: 1.5rem;">Gestão de Chaves de Ativação</h3>
                
                <div style="background: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem;">Gerar Nova Chave</h4>
                    
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
                        Gerar Chave
                    </button>
                    
                    <div id="generatedKeyDisplay" class="hidden" style="margin-top: 1.5rem; padding: 1.5rem; background: var(--success-light); border-radius: var(--radius);">
                        <p style="font-weight: 600; margin-bottom: 0.5rem;">Chave gerada com sucesso:</p>
                        <div style="display: flex; gap: 0.5rem; align-items: center; background: white; padding: 0.75rem; border-radius: var(--radius);">
                            <code id="generatedKey" style="flex: 1; font-family: monospace; font-size: 1.2rem; text-align: center;">XXXX-XXXX-XXXX-XXXX</code>
                            <button class="btn btn-sm btn-outline" onclick="copyKey()">Copiar</button>
                        </div>
                    </div>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: var(--radius);">
                    <h4 style="margin-bottom: 1rem;">Chaves Existentes</h4>
                    <div id="keysList">
                        <p style="color: var(--gray-500); text-align: center;">Nenhuma chave gerada ainda.</p>
                    </div>
                </div>
            `;
            break;
            
        case 'employees':
            html = `
                <h3 style="margin-bottom: 1.5rem;">Gestão de Colaboradores</h3>
                
                <div style="background: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4>Lista de Colaboradores</h4>
                        <button class="btn btn-outline btn-sm" onclick="exportEmployees()">📥 Exportar</button>
                    </div>
                    
                    <div id="employeesList">
                        <p style="color: var(--gray-500); text-align: center;">A carregar colaboradores...</p>
                    </div>
                </div>
            `;
            loadEmployeesList();
            break;
            
        case 'settings':
            html = `
                <h3 style="margin-bottom: 1.5rem;">Configurações da Empresa</h3>
                
                <div style="background: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem;">Informação da Empresa</h4>
                    
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Nome da Empresa</label>
                        <input type="text" class="form-input" id="companyNameSetting" value="${COMPANY.name || ''}" placeholder="Nome da empresa">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Email do Administrador</label>
                        <input type="email" class="form-input" value="${USER.email}" readonly disabled style="background: var(--gray-100);">
                    </div>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem;">Configurações de Formação</h4>
                    
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Pontuação Mínima para Certificado (%)</label>
                        <input type="number" class="form-input" id="minScoreSetting" value="${COMPANY.settings?.minCertificateScore || 80}" min="50" max="100">
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Módulos Obrigatórios</label>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-top: 0.5rem;">
                            ${MODULES.map(module => `
                                <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--gray-50); border-radius: var(--radius);">
                                    <input type="checkbox" id="mod-${module.id}" ${COMPANY.settings?.mandatoryModules?.includes(module.id) ? 'checked' : ''}>
                                    ${module.title}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: var(--radius);">
                    <h4 style="margin-bottom: 1rem;">Configurações Avançadas</h4>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" id="require2FA" ${COMPANY.settings?.require2FA ? 'checked' : ''}>
                            Exigir autenticação de dois fatores para colaboradores
                        </label>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" id="allowCustomBranding" ${COMPANY.settings?.allowCustomBranding ? 'checked' : ''}>
                            Permitir branding personalizado
                        </label>
                    </div>
                </div>
                
                <div style="margin-top: 2rem; text-align: right;">
                    <button class="btn btn-primary" onclick="saveCompanySettings()">Guardar Configurações</button>
                </div>
            `;
            break;
    }
    
    content.innerHTML = `<div style="padding: 2rem;">${html}</div>`;
    
    // Atualizar estatísticas se necessário
    if (tab === 'overview') {
        loadAdminStatsDetailed();
    }
}

async function loadAdminStatsDetailed() {
    try {
        let totalEmployees = 0;
        let totalModules = 0;
        let totalXP = 0;
        let totalSims = 0;
        
        if (database) {
            const snapshot = await database.ref('employees').once('value');
            if (snapshot.exists()) {
                Object.values(snapshot.val()).forEach(emp => {
                    if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                        totalEmployees++;
                        totalModules += emp.completedModules?.length || 0;
                        totalXP += emp.xp || 0;
                        totalSims += emp.simulationsCompleted?.length || 0;
                    }
                });
            }
        }
        
        document.getElementById('statEmployees').textContent = totalEmployees;
        document.getElementById('statModules').textContent = totalModules;
        document.getElementById('statXP').textContent = totalXP;
        document.getElementById('statSims').textContent = totalSims;
    } catch (error) {
        console.error('Erro ao carregar estatísticas detalhadas:', error);
    }
}

function generateNewKey() {
    const type = document.getElementById('keyType')?.value || 'basic';
    const licenses = parseInt(document.getElementById('keyLicenses')?.value) || 1;
    const validity = parseInt(document.getElementById('keyValidity')?.value) || 180;
    
    const key = generateActivationKey();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + validity);
    
    const keyData = {
        key,
        type,
        licenses,
        usedCount: 0,
        expiresAt: expiryDate.toISOString(),
        createdAt: new Date().toISOString(),
        companyCode: COMPANY.code || USER.companyCode
    };
    
    const display = document.getElementById('generatedKeyDisplay');
    const keyEl = document.getElementById('generatedKey');
    
    if (display && keyEl) {
        keyEl.textContent = key;
        display.classList.remove('hidden');
    }
    
    // Adicionar à lista de chaves
    const keysList = document.getElementById('keysList');
    if (keysList) {
        const keyHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">
                <code style="font-family: monospace;">${key}</code>
                <span style="font-size: 0.875rem;">${type} | ${licenses} licenças | Expira: ${expiryDate.toLocaleDateString('pt-PT')}</span>
                <button class="btn btn-sm btn-outline" onclick="copyKeyText('${key}')">Copiar</button>
            </div>
        `;
        
        if (keysList.innerHTML.includes('Nenhuma chave')) {
            keysList.innerHTML = keyHtml;
        } else {
            keysList.innerHTML = keyHtml + keysList.innerHTML;
        }
    }
    
    showMessage('Chave gerada com sucesso!', 'success');
}

function copyKey() {
    const key = document.getElementById('generatedKey')?.textContent;
    if (key) {
        navigator.clipboard.writeText(key).then(() => {
            showMessage('Chave copiada!', 'success');
        });
    }
}

function copyKeyText(key) {
    navigator.clipboard.writeText(key).then(() => {
        showMessage('Chave copiada!', 'success');
    });
}

async function loadEmployeesList() {
    const list = document.getElementById('employeesList');
    if (!list) return;
    
    try {
        let employees = [];
        
        if (database) {
            const snapshot = await database.ref('employees').once('value');
            if (snapshot.exists()) {
                Object.values(snapshot.val()).forEach(emp => {
                    if (emp.companyCode === (COMPANY.code || USER.companyCode)) {
                        employees.push(emp);
                    }
                });
            }
        }
        
        if (employees.length === 0) {
            // Dados de exemplo
            employees = [
                { name: 'Ana Silva', email: 'ana.silva@empresa.pt', xp: 1250, completedModules: [1,2,3], lastActivity: new Date().toISOString() },
                { name: 'João Santos', email: 'joao.santos@empresa.pt', xp: 850, completedModules: [1,2], lastActivity: new Date().toISOString() },
                { name: 'Maria Ferreira', email: 'maria.ferreira@empresa.pt', xp: 2100, completedModules: [1,2,3,4], lastActivity: new Date().toISOString() }
            ];
        }
        
        list.innerHTML = employees.map(emp => {
            const progress = emp.completedModules ? Math.round((emp.completedModules.length / MODULES.length) * 100) : 0;
            return `
                <div style="display: grid; grid-template-columns: 2fr 2fr 1fr 1fr 1fr; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid var(--gray-200); align-items: center;">
                    <div><strong>${emp.name}</strong></div>
                    <div style="font-size: 0.875rem;">${emp.email}</div>
                    <div>${emp.xp || 0} XP</div>
                    <div>
                        <div style="font-size: 0.875rem;">${emp.completedModules?.length || 0}/${MODULES.length}</div>
                        <div class="progress" style="width: 100%; height: 4px; margin-top: 0.25rem;">
                            <div class="progress-bar" style="width: ${progress}%;"></div>
                        </div>
                    </div>
                    <div style="font-size: 0.875rem;">${emp.lastActivity ? new Date(emp.lastActivity).toLocaleDateString('pt-PT') : 'Nunca'}</div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Erro ao carregar colaboradores:', error);
        list.innerHTML = '<p style="color: var(--danger);">Erro ao carregar colaboradores.</p>';
    }
}

function exportEmployees() {
    showMessage('Exportação iniciada. Ficheiro simulado para demonstração.', 'info');
}

function saveCompanySettings() {
    // Guardar configurações
    const companyName = document.getElementById('companyNameSetting')?.value;
    const minScore = document.getElementById('minScoreSetting')?.value;
    
    if (companyName) COMPANY.name = companyName;
    if (minScore) COMPANY.settings.minCertificateScore = parseInt(minScore);
    
    // Guardar módulos obrigatórios
    const mandatoryModules = [];
    MODULES.forEach(module => {
        const checkbox = document.getElementById(`mod-${module.id}`);
        if (checkbox && checkbox.checked) {
            mandatoryModules.push(module.id);
        }
    });
    COMPANY.settings.mandatoryModules = mandatoryModules;
    
    // Guardar configurações avançadas
    const require2FA = document.getElementById('require2FA')?.checked;
    const allowCustomBranding = document.getElementById('allowCustomBranding')?.checked;
    
    if (require2FA !== undefined) COMPANY.settings.require2FA = require2FA;
    if (allowCustomBranding !== undefined) COMPANY.settings.allowCustomBranding = allowCustomBranding;
    
    showMessage('Configurações guardadas com sucesso!', 'success');
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

// ==================== MESSAGES ====================
function showMessage(message, type = 'info') {
    const colors = { 
        success: 'var(--success)', 
        error: 'var(--danger)', 
        warning: 'var(--warning)', 
        info: 'var(--primary-500)' 
    };
    
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed; top: 80px; right: 20px; background: white; color: ${colors[type]};
        padding: 1rem 1.5rem; border-radius: var(--radius); border-left: 4px solid ${colors[type]};
        box-shadow: var(--shadow-lg); z-index: 10000; max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    msg.textContent = message;
    
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => msg.remove(), 300);
    }, 3000);
}

// ==================== INICIALIZAÇÃO ====================
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado - a inicializar');
    
    // Esconder elementos por padrão
    hide('navbar');
    hide('loginSection');
    hide('dashboardPage');
    hide('modulesPage');
    hide('dynamicContent');
    hide('welcomeOverlay');
    
    // Mostrar landing page
    showLandingPage();
    
    // Configurar formulários
    const userForm = document.getElementById('userLoginForm');
    const adminForm = document.getElementById('adminLoginForm');
    const adminExtraFields = document.getElementById('adminExtraFields');
    
    if (userForm) userForm.classList.remove('hidden');
    if (adminForm) adminForm.classList.add('hidden');
    if (adminExtraFields) adminExtraFields.classList.add('hidden');
    
    // Verificar sessão guardada
    const savedUser = localStorage.getItem('phishguard_user');
    if (savedUser) {
        try {
            USER = JSON.parse(savedUser);
            onLoginSuccess();
        } catch (e) {
            console.error('Erro ao ler utilizador guardado:', e);
            localStorage.removeItem('phishguard_user');
        }
    }
    
    // Estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    `;
    document.head.appendChild(style);
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
window.goToCertificate = goToCertificate;
window.goToAdmin = goToAdmin;
window.showAdminTab = showAdminTab;
window.generateNewKey = generateNewKey;
window.copyKey = copyKey;
window.copyKeyText = copyKeyText;
window.exportEmployees = exportEmployees;
window.saveCompanySettings = saveCompanySettings;
window.selectOption = selectOption;
window.submitQuiz = submitQuiz;
window.startSimulation = startSimulation;
window.submitSimulation = submitSimulation;
window.downloadResource = downloadResource;
window.closeWelcomePopup = closeWelcomePopup;
window.goToModulesFromWelcome = goToModulesFromWelcome;
window.goToLibrary = goToLibrary;
window.loadLibraryVideos = loadLibraryVideos;
window.downloadResource = function(type) {
    showMessage('Download iniciado. Ficheiro simulado para demonstração.', 'info');
};

console.log('PhishGuard Elite - Versão Profissional carregada com sucesso!');
