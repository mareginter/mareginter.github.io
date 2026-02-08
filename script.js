// CONFIGURAÇÃO FIREBASE
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

// Inicializar Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado');
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
}
const database = firebase.database();



// DADOS GLOBAIS
var USER = {
    id: '',
    name: '',
    email: '',
    isAdmin: false,
    companyCode: '',
    xp: 0,
    scores: {},
    badges: [],
    simulations: 0,
    simScore: 0,
    simXP: 0,
    simCompleted: [],
    startDate: null,
    completionDate: null,
    hasSeenWelcome: false,
    activationKey: '',
    keyType: 'basic'
};

var COMPANY = {
    code: '',
    name: '',
    adminEmail: '',
    adminName: '',
    employees: []
};

/*
// SISTEMA DE CHAVES DE ATIVAÇÃO
var ACTIVATION_SYSTEM = {
    // Configuração: permite acesso sem chave? true = sim, false = não
    requireKey: false,
    
    // Chaves padrão para teste
    defaultKeys: {
        'ELITE-2024-ABC123': { valid: true, used: false, type: 'full' },
        'PREMIUM-XYZ789': { valid: true, used: false, type: 'premium' },
        'BASIC-2024-DEF456': { valid: true, used: false, type: 'basic' },
        'TEST-1234': { valid: true, used: false, type: 'basic' }
    }
};
*/

// ==================== DADOS DOS MÓDULOS ====================

// MÓDULOS BÁSICOS
var MODULES = [
    {
        id: 'mod1',
        title: '🎯 Introdução ao Phishing',
        desc: 'Conceitos essenciais de segurança',
        xp: 100,
        questions: [
            {q:'O que é phishing?',opts:['Técnica de pesca','Ataque via email fraudulento','Software antivírus','Tipo de firewall'],correct:1},
            {q:'Qual o principal objetivo do phishing?',opts:['Melhorar segurança','Roubar informações sensíveis','Acelerar a internet','Criar backups'],correct:1},
            {q:'Como identificar um email suspeito?',opts:['Confiar sempre','Verificar remetente e links','Ignorar sempre','Clicar imediatamente'],correct:1},
            {q:'O que fazer ao receber email suspeito?',opts:['Clicar em todos os links','Encaminhar para amigos','Reportar á Ciber Segurança','Responder com dados pessoais'],correct:2},
            {q:'Phishing pode ocorrer via:',opts:['Apenas email','Email, SMS e redes sociais','Só telefone','Apenas websites'],correct:1}
        ]
    },
    {
        id: 'mod2',
        title: '🔍 Análise de URLs Suspeitos',
        desc: 'Identificar links maliciosos',
        xp: 150,
        questions: [
            {q:'URL seguro começa com:',opts:['http://','https://','ftp://','ssh://'],correct:1},
            {q:'O domínio "paypa1.com" (1 em vez de l):',opts:['É totalmente seguro','É phishing claro','É site legítimo','É normal'],correct:1},
            {q:'Ao passar o mouse sobre um link:',opts:['Clicar imediatamente','Ver o URL de destino','Ignorar','Copiar para todos'],correct:1},
            {q:'Link encurtado (bit.ly, tinyurl):',opts:['Sempre seguro','Requer cautela extra','Nunca funciona','É obrigatório usar'],correct:1},
            {q:'Em "microsoft.phishing.com":',opts:['Site oficial Microsoft','Domínio real é phishing.com','É seguro','É normal'],correct:1}
        ]
    },
    {
        id: 'mod3',
        title: '🛡️ Proteção de Dados Pessoais',
        desc: 'Segurança de informações',
        xp: 150,
        questions: [
            {q:'Senha forte deve ter:',opts:['4 caracteres simples','12+ caracteres mistos','Só letras','Só números'],correct:1},
            {q:'Reutilizar mesma senha em vários sites:',opts:['É prático e seguro','Aumenta o risco significativamente','É obrigatório','Não faz diferença'],correct:1},
            {q:'Autenticação de dois fatores (2FA):',opts:['Complica sem necessidade','Adiciona segurança crucial','É opcional e desnecessária','Só para bancos'],correct:1},
            {q:'Partilhar senha com colegas:',opts:['É normal em empresas','Viola política de segurança','Acelera o trabalho','É recomendado'],correct:1},
            {q:'Ao sair da mesa de trabalho:',opts:['Deixar tudo aberto','Bloquear o computador','Desligar a internet','Apagar tudo'],correct:1}
        ]
    },
    {
        id: 'mod4',
        title: '🔒 Ransomware e Malware',
        desc: 'Proteção contra ameaças avançadas',
        difficulty: 'advanced',
        xp: 200,
        questions: [
            {q:'O que é ransomware?',opts:['Antivírus gratuito','Malware que encripta ficheiros e pede resgate','Ferramenta de backup','Sistema operativo'],correct:1},
            {q:'Principal forma de infeção por ransomware:',opts:['Atualização do sistema','Email com anexo malicioso ou link','Comprar software legal','Desligar o computador'],correct:1},
            {q:'Se for vítima de ransomware, deve:',opts:['Pagar o resgate imediatamente','Desligar rede, reportar TI, NÃO pagar','Apagar o computador','Formatar sem fazer backup'],correct:1},
            {q:'Melhor proteção contra ransomware:',opts:['Não usar computador','Backups regulares offline + software atualizado','Pagar antecipadamente','Confiar em tudo'],correct:1},
            {q:'Extensões de ficheiro suspeitas:',opts:['.pdf e .docx','.exe, .scr, .bat','.jpg e .png','.mp3 e .mp4'],correct:1}
        ]
    },
    {
        id: 'mod5',
        title: '☁️ Segurança na Cloud',
        desc: 'Boas práticas em serviços cloud',
        difficulty: 'advanced',
        xp: 200,
        questions: [
            {q:'Armazenamento em cloud é:',opts:['100% inseguro sempre','Seguro se bem configurado','Apenas para empresas grandes','Proibido por lei'],correct:1},
            {q:'Ao partilhar ficheiros na cloud:',opts:['Partilhar com todos sempre','Definir permissões específicas','Senha deve ser "123456"','Não há controlos'],correct:1},
            {q:'Links de partilha pública devem:',opts:['Durar para sempre','Ter expiração e senha quando sensível','Ser partilhados em redes sociais','Nunca ser usados'],correct:1},
            {q:'Sincronização automática:',opts:['É sempre má ideia','Útil mas verificar o que sincroniza','Deve incluir tudo sem exceção','Não existe'],correct:1},
            {q:'Ao sair da empresa:',opts:['Manter acesso a tudo','Remover acessos e transferir dados','Apagar conta da empresa','Partilhar senha com substituto'],correct:1}
        ]
    }
];

// MÓDULOS PREMIUM - CORRIGIDO
var PREMIUM_MODULES = [
    {
        id: 'prem1',
        title: '🚀 Engenharia Social Avançada',
        desc: 'Técnicas psicológicas usadas por hackers',
        xp: 300,
        isPremium: true,
        questions: [
            {q:'O que é "pretexting"?',opts:['Técnica de programação','Criar cenário falso para obter informações','Método de backup','Tipo de firewall'],correct:1},
            {q:'"Vishing" refere-se a:',opts:['Phishing por email','Phishing por telefone','Phishing por redes sociais','Phishing por SMS'],correct:1},
            {q:'"Quid pro quo" em ataques significa:',opts:['Oferecer algo em troca de informação','Ataque aleatório','Uso de força bruta','Encriptação de dados'],correct:0},
            {q:'Como prevenir ataques de engenharia social?',opts:['Confiar em todos','Verificação rigorosa de identidades','Compartilhar menos','Não usar tecnologia'],correct:1},
            {q:'"Tailgating" é:',opts:['Seguir alguém para aceder área restrita','Tipo de vírus','Método de senha','Forma de backup'],correct:0}
        ]
    },
    {
        id: 'prem2',
        title: '🔐 Criptografia e Segurança de Dados',
        desc: 'Proteção avançada de informações sensíveis',
        xp: 350,
        isPremium: true,
        questions: [
            {q:'AES-256 é um algoritmo de:',opts:['Compressão','Criptografia','Antivírus','Firewall'],correct:1},
            {q:'Chave pública vs. privada:',opts:['São iguais','Pública encripta, privada decifra','Privada encripta, pública decifra','Não relacionadas'],correct:1},
            {q:'O que é um certificado SSL/TLS?',opts:['Antivírus','Certificado digital que autentica websites','Software de backup','Tipo de senha'],correct:1},
            {q:'"End-to-end encryption" significa:',opts:['Dados só são decifrados nos extremos','Encriptação parcial','Sem encriptação','Encriptação fraca'],correct:0},
            {q:'PGP/GPG são usados para:',opts:['Encriptação de emails','Jogos','Compression','Anti-spam'],correct:0}
        ]
    },
    {
        id: 'prem3',
        title: '🛡️ Resposta a Incidentes de Segurança',
        desc: 'Procedimentos para lidar com violações',
        xp: 400,
        isPremium: true,
        questions: [
            {q:'Primeiro passo após detetar violação:',opts:['Esconder o problema','Isolar sistemas afetados','Continuar normalmente','Apagar tudo'],correct:1},
            {q:'"Forensics digitais" envolve:',opts:['Recuperar e analisar evidências digitais','Criar websites','Programação','Design gráfico'],correct:0},
            {q:'Plano de resposta a incidentes deve incluir:',opts:['Apenas TI','Equipa multidisciplinar com funções definidas','Só administradores','Ninguém'],correct:1},
            {q:'"Lessons learned" após incidente:',opts:['Ignorar o acontecido','Documentar para melhorar processos futuros','Culpar alguém','Esquecer tudo'],correct:1},
            {q:'Comunicação durante incidente deve ser:',opts:['Interna e controlada','Pública imediatamente','Somente oral','Inexistente'],correct:0}
        ]
    },
    // NOVO MÓDULO STORYTELLING - CORRIGIDO
    {
        id: 'prem4',
        title: '📖 Histórias Reais de Phishing',
        desc: '5 casos reais que aconteceram e como poderiam ter sido evitados',
        xp: 350,
        isPremium: true,
        stories: true,
        cases: [
            {
                id: 'case1',
                title: 'CEO Fraud - A Fraude do CEO',
                company: 'Empresa Multinacional (2015)',
                scenario: 'O CFO recebeu um email urgente do "CEO" (email hackeado) pedindo transferência urgente de €500.000 para um fornecedor "crítico". O email parecia legítimo, com tom e estilo conhecidos.',
                whatHappened: 'O CFO, pressionado pela urgência, autorizou a transferência sem verificar por telefone. O dinheiro foi para uma conta fraudulenta na Ásia e nunca mais foi recuperado.',
                redFlags: [
                    'Urgência excessiva ("em 2 horas")',
                    'Pedido de transferência fora dos canais normais',
                    'Email solicitando confidencialidade total',
                    'Valor anormalmente alto para transação única'
                ],
                prevention: [
                    'Política de verificação por telefone para grandes transferências',
                    'Limites de autorização por nível hierárquico',
                    'Treino específico para departamento financeiro',
                    'Sistema de aprovação dupla para transações acima de certo valor'
                ],
                question: 'Qual a medida MAIS eficaz para prevenir este tipo de ataque?',
                opts: [
                    'Ignorar todos os emails do CEO',
                    'Implementar verificação obrigatória por telefone/vídeo para transações grandes',
                    'Limitar o acesso à internet do departamento financeiro',
                    'Usar apenas email interno'
                ],
                correct: 1,
                source: 'Relatório FBI IC3 2016'
            },
            {
                id: 'case2',
                title: 'Ataque à Cadeia de Fornecimento',
                company: 'Fabricante Automóvel (2020)',
                scenario: 'Um fornecedor de peças foi comprometido. Os hackers enviaram emails de phishing para funcionários do fabricante, parecendo vir do fornecedor legítimo, com faturas alteradas.',
                whatHappened: 'Os funcionários pagaram as faturas falsas para contas controladas pelos hackers. Perda total: €2.3 milhões antes da deteção.',
                redFlags: [
                    'Número de conta bancária alterado de repente',
                    'Email do fornecedor com pequenos erros no domínio',
                    'Pressão para pagamento rápido devido a "problemas bancários"',
                    'Falta de resposta rápida quando questionado por telefone'
                ],
                prevention: [
                    'Lista verificada de contas bancárias por fornecedor',
                    'Política de verificação para qualquer alteração de dados bancários',
                    'Treino específico para departamento de compras',
                    'Sistema de alerta para alterações em dados de fornecedores'
                ],
                question: 'Como validar uma mudança de conta bancária de fornecedor?',
                opts: [
                    'Confiar no email se tiver assinatura digital',
                    'Ligar para número no email recebido',
                    'Contactar através de canal conhecido previamente (telefone guardado)',
                    'Perguntar a outro colega'
                ],
                correct: 2,
                source: 'Relatório Europol 2021'
            },
            {
                id: 'case3',
                title: 'Phishing de Credenciais de VPN',
                company: 'Empresa de Saúde (2019)',
                scenario: 'Durante a pandemia, funcionários receberam email aparentando ser do departamento de TI, pedindo para "atualizar credenciais de VPN" devido a "atualização de segurança".',
                whatHappened: 'Múltiplos funcionários introduziram suas credenciais no site falso. Hackers acederam à rede interna, roubaram dados de pacientes e instalaram ransomware.',
                redFlags: [
                    'URL do site de login diferente do habitual',
                    'Faltava o certificado SSL válido',
                    'Email genérico ("Prezado colaborador") em vez de nome pessoal',
                    'Design ligeiramente diferente do portal legítimo'
                ],
                prevention: [
                    'Autenticação multi-fator obrigatória para VPN',
                    'Treino específico sobre phishing de credenciais',
                    'Portal único de acesso com bookmarks oficiais',
                    'Monitorização de logins suspeitos'
                ],
                question: 'Qual é o melhor método para evitar phishing de credenciais?',
                opts: [
                    'Mudar senhas todas as semanas',
                    'Implementar autenticação multi-fator (MFA)',
                    'Usar senhas muito complexas',
                    'Não aceder a links em emails'
                ],
                correct: 1,
                source: 'Departamento de Saúde EUA, 2020'
            },
            {
                id: 'case4',
                title: 'Business Email Compromise - Caso Imobiliário',
                company: 'Agência Imobiliária (2021)',
                scenario: 'Cliente a comprar casa recebeu email do "advogado" com instruções para transferir sinal de €85.000. O email do advogado tinha sido hackeado dias antes.',
                whatHappened: 'O cliente transferiu o dinheiro para conta fraudulenta. Só descobriu no dia da escritura quando o advogado real perguntou sobre o pagamento.',
                redFlags: [
                    'Email sobre pagamento sem referência a detalhes específicos discutidos',
                    'Conta bancária em banco diferente do habitual',
                    'Assinatura de email incompleta',
                    'Tom mais impessoal que o normal'
                ],
                prevention: [
                    'Verificação telefónica para confirmação de dados bancários',
                    'Uso de frases de código previamente combinadas',
                    'Comunicação através de plataforma segura com verificação de identidade',
                    'Educação dos clientes sobre estes riscos'
                ],
                question: 'Que medida poderia ter prevenido esta fraude?',
                opts: [
                    'Usar apenas transferências bancárias',
                    'Estabelecer frase de código com clientes para confirmar mudanças',
                    'Não discutir negócios por email',
                    'Pedir cópia do cartão de cidadão'
                ],
                correct: 1,
                source: 'APAV - Associação Portuguesa de Apoio à Vítima'
            },
            {
                id: 'case5',
                title: 'W-2 Phishing - Dados Fiscais',
                company: 'Escola Pública (2018)',
                scenario: 'Email aparentando vir do diretor para assistente administrativo: "Preciso dos W-2 de todos os funcionários para revisão urgente. Envie hoje."',
                whatHappened: 'A assistente enviou os formulários W-2 (com números de segurança social, salários, endereços) de 2.000 funcionários. Dados usados para fraude fiscal em larga escala.',
                redFlags: [
                    'Pedido fora do ciclo normal (W-2 normalmente em Janeiro)',
                    'Email enviado fora de horas',
                    'Tom mais direto que o estilo habitual do diretor',
                    'Pedido para ignorar procedimentos normais'
                ],
                prevention: [
                    'Política clara sobre partilha de dados sensíveis',
                    'Verificação obrigatória para pedidos de dados confidenciais',
                    'Treino específico para funcionários com acesso a dados pessoais',
                    'Classificação e proteção de dados por sensibilidade'
                ],
                question: 'Como lidar com pedido urgente de dados sensíveis?',
                opts: [
                    'Obedecer imediatamente por ser superior hierárquico',
                    'Verificar através de canal secundário (telefone, presencial)',
                    'Enviar mas pedir confirmação depois',
                    'Pedir autorização por escrito'
                ],
                correct: 1,
                source: 'IRS Alert SA-2018-2'
            }
        ]
    }
];

var BADGES = [
    {id:'first_login',name:'🎯 Primeiro Passo',desc:'Fez primeiro login',check:function(){return true}},
    {id:'mod1',name:'📚 Iniciante',desc:'Completou módulo 1',check:function(){return USER.scores['mod1'] !== undefined}},
    {id:'mod2',name:'🔍 Analista',desc:'Completou módulo 2',check:function(){return USER.scores['mod2'] !== undefined}},
    {id:'mod3',name:'🛡️ Protetor',desc:'Completou módulo 3',check:function(){return USER.scores['mod3'] !== undefined}},
    {id:'mod4',name:'🔒 Defensor',desc:'Completou módulo Ransomware',check:function(){return USER.scores['mod4'] !== undefined}},
    {id:'mod5',name:'☁️ Cloud Expert',desc:'Completou módulo Cloud',check:function(){return USER.scores['mod5'] !== undefined}},
    {id:'all_mods',name:'🎓 Mestre Elite',desc:'Completou TODOS os módulos',check:function(){return Object.keys(USER.scores).filter(k => k.startsWith('mod') && !k.startsWith('prem')).length === 5}},
    {id:'perfect',name:'💯 Perfeccionista',desc:'100% num módulo',check:function(){for(var k in USER.scores){if(USER.scores[k]===5)return true}return false}},
    {id:'sim5',name:'🎮 Simulador Pro',desc:'5 simulações corretas',check:function(){return USER.simScore >= 5}},
    {id:'xp500',name:'⭐ 500 XP',desc:'Alcançou 500 XP',check:function(){return USER.xp >= 500}},
    {id:'xp1000',name:'💫 1000 XP',desc:'Alcançou 1000 XP',check:function(){return USER.xp >= 1000}},
    {id:'xp2000',name:'🚀 2000 XP',desc:'Alcançou 2000 XP',check:function(){return USER.xp >= 2000}},
    {id:'advanced',name:'🚀 Avançado',desc:'Completou módulos avançados',check:function(){return USER.scores['mod4'] !== undefined && USER.scores['mod5'] !== undefined}},
    {id:'premium_access',name:'⭐ Premium',desc:'Desbloqueou módulos premium',check:function(){return hasPremiumAccess()}},
    {id:'prem1',name:'🧠 Engenheiro Social',desc:'Completou módulo Engenharia Social',check:function(){return USER.scores['prem1'] !== undefined}},
    {id:'prem2',name:'🔐 Criptógrafo',desc:'Completou módulo Criptografia',check:function(){return USER.scores['prem2'] !== undefined}},
    {id:'prem3',name:'🛡️ Incident Commander',desc:'Completou módulo Resposta a Incidentes',check:function(){return USER.scores['prem3'] !== undefined}},
    {id:'story_master',name:'📖 Mestre das Histórias',desc:'Completou todos os casos reais de phishing',check:function(){
        var storyModule = PREMIUM_MODULES.find(m => m.stories);
        if(!storyModule) return false;
        return storyModule.cases.every(c => USER.scores[c.id] !== undefined);
    }}
];

var PHISHING_EMAILS = [
    {
        id: 'em1',
        from: 'suporte@banc0-segur0.com',
        subject: 'URGENTE: Confirmação de Conta',
        body: 'Prezado cliente,\n\nDetectamos atividade suspeita na sua conta.\nClique aqui para verificar: http://banco-verificacao.tk\n\nEquipa de Segurança',
        isPhishing: true,
        xp: 50,
        explanation: 'Phishing! Domínio suspeito (0 em vez de o), urgência excessiva, link .tk duvidoso.'
    },
    {
        id: 'em2',
        from: 'rh@suaempresa.pt',
        subject: 'Atualização de Dados RH',
        body: 'Olá,\n\nPor favor atualize seus dados no portal interno:\nhttps://portal.suaempresa.pt/rh\n\nObrigado,\nRecursos Humanos',
        isPhishing: false,
        xp: 50,
        explanation: 'Legítimo! Domínio correto, HTTPS, contexto apropriado.'
    },
    {
        id: 'em3',
        from: 'noreply@paypa1-secure.com',
        subject: 'Verificação de Pagamento',
        body: 'Sua conta PayPal precisa de verificação.\nClique: bit.ly/pp-verify-2024',
        isPhishing: true,
        xp: 50,
        explanation: 'Phishing! "1" em vez de "l", link encurtado suspeito.'
    },
    {
        id: 'em4',
        from: 'admin@microsoft.com',
        subject: 'Licença Office 365',
        body: 'Sua licença expira em breve.\nRenovar: https://office.microsoft.com/renew',
        isPhishing: false,
        xp: 50,
        explanation: 'Legítimo! Domínio oficial Microsoft, HTTPS, URL consistente.'
    },
    {
        id: 'em5',
        from: 'financas@empresa-phishing.net',
        subject: 'Fatura em Atraso - URGENTE',
        body: 'Dívida de €5.000! Pague em 24h ou processo legal.\nClique: http://pagamento-urgente.xyz',
        isPhishing: true,
        xp: 50,
        explanation: 'Phishing! Ameaças, urgência extrema, domínio .xyz suspeito.'
    },
    {
        id: 'em6',
        from: 'ti@suaempresa.pt',
        subject: 'Atualização de Segurança',
        body: 'Instalação de nova ferramenta de segurança.\nBaixe: https://suaempresa.pt/tools/security.exe',
        isPhishing: false,
        xp: 50,
        explanation: 'Legítimo! Email de TI interno, domínio correto da empresa.'
    },
    {
        id: 'em7',
        from: 'secure@go0gle.com',
        subject: 'Atividade Suspeita Detectada',
        body: 'Alguém tentou acessar sua conta Google.\nVerifique: http://google-security.ru',
        isPhishing: true,
        xp: 50,
        explanation: 'Phishing! "0" em vez de "o" no Google, domínio .ru russo suspeito.'
    },
    {
        id: 'em8',
        from: 'covid-update@health-gov.net',
        subject: 'Nova Variante COVID - Teste Obrigatório',
        body: 'Teste obrigatório para todos.\nAgendar: http://covid-test-urgente.tk\nTraga cartão de crédito.',
        isPhishing: true,
        xp: 50,
        explanation: 'Phishing! Explora medo do COVID, pede cartão de crédito, domínio .tk.'
    }
];

var LIBRARY = [
    {
        id: 'lib1',
        title: '📘 Guia Completo de Segurança Digital',
        category: 'Guias',
        content: `
            <h4>Princípios Fundamentais</h4>
            <p>1. <strong>Nunca confie cegamente</strong> - Verifique sempre a autenticidade</p>
            <p>2. <strong>Proteja suas credenciais</strong> - Senhas únicas e fortes em cada serviço</p>
            <p>3. <strong>Mantenha sistemas atualizados</strong> - Patches de segurança são cruciais</p>
            <p>4. <strong>Cuidado com Wi-Fi público</strong> - Use VPN quando necessário</p>
            <p>5. <strong>Backup regular</strong> - Proteja-se contra ransomware</p>
            <h4 style="margin-top:1.5rem">Checklist Diário</h4>
            <p>✅ Bloquear ecrã ao sair da mesa</p>
            <p>✅ Verificar remetente antes de abrir anexos</p>
            <p>✅ Não clicar em links suspeitos</p>
            <p>✅ Reportar atividades suspeitas</p>
        `
    },
    {
        id: 'lib2',
        title: '🔍 Como Analisar Emails Suspeitos',
        category: 'Tutoriais',
        content: `
            <h4>Sinais de Alerta Críticos</h4>
            <p><strong>🚩 Remetente:</strong></p>
            <p>• Email de domínio estranho (ex: paypa1.com)</p>
            <p>• Erros de digitação no domínio</p>
            <p>• Domínio gratuito em contexto corporativo</p>
            
            <p style="margin-top:1rem"><strong>🚩 Conteúdo:</strong></p>
            <p>• Urgência excessiva ("ÚLTIMO DIA!")</p>
            <p>• Ameaças ("Conta será bloqueada")</p>
            <p>• Pedidos de informação sensível</p>
            <p>• Erros gramaticais graves</p>
            
            <p style="margin-top:1rem"><strong>🚩 Links e Anexos:</strong></p>
            <p>• URLs que não correspondem ao texto</p>
            <p>• Anexos inesperados (.exe, .zip, .scr)</p>
            <p>• Links encurtados sem contexto</p>
        `
    },
    {
        id: 'lib3',
        title: '🛡️ Melhores Práticas de Passwords',
        category: 'Segurança',
        content: `
            <h4>Criação de Senha Forte</h4>
            <p><strong>✅ Faça:</strong></p>
            <p>• Mínimo 12 caracteres</p>
            <p>• Misture maiúsculas, minúsculas, números e símbolos</p>
            <p>• Use frases longas transformadas</p>
            <p>• Senha única para cada serviço</p>
            <p>• Use gestor de senhas confiável</p>
            
            <p style="margin-top:1rem"><strong>❌ Não Faça:</strong></p>
            <p>• Usar informações pessoais</p>
            <p>• Sequências óbvias (123456, qwerty)</p>
            <p>• Palavras de dicionário</p>
            <p>• Reutilizar senhas</p>
            
            <h4 style="margin-top:1.5rem">Autenticação Multi-Fator (MFA)</h4>
            <p>⚡ <strong>Ative MFA em todos os serviços críticos!</strong></p>
            <p>• SMS - Código por mensagem</p>
            <p>• App Autenticador - Google/Microsoft Authenticator</p>
            <p>• Biometria - Impressão digital, reconhecimento facial</p>
        `
    },
    {
        id: 'lib4',
        title: '📱 Segurança em Dispositivos Móveis',
        category: 'Dispositivos',
        content: `
            <h4>Proteção de Smartphones e Tablets</h4>
            <p><strong>Configurações Essenciais:</strong></p>
            <p>🔐 Bloqueio de ecrã com PIN/biometria</p>
            <p>🔄 Atualizações automáticas ativadas</p>
            <p>📍 Localização remota habilitada</p>
            <p>🔒 Encriptação de dispositivo ativa</p>
            
            <p style="margin-top:1rem"><strong>Apps e Downloads:</strong></p>
            <p>✅ Apenas lojas oficiais (Google Play, App Store)</p>
            <p>✅ Verificar permissões solicitadas</p>
            <p>✅ Ler avaliações e classificações</p>
            <p>❌ Evitar apps de fontes desconhecidas</p>
            
            <p style="margin-top:1rem"><strong>Redes:</strong></p>
            <p>📶 Cuidado com Wi-Fi público</p>
            <p>🔐 Use VPN em redes não confiáveis</p>
            <p>📴 Desative Bluetooth quando não usar</p>
        `
    }
];

var TOTAL_MODULES = 5;
var TOTAL_PREMIUM_MODULES = 3;
var CURRENT_MODULE = null;

// ==================== SISTEMA DE CHAVES DE ATIVAÇÃO ====================

// Função para verificar chave de ativação
async function checkActivationKey(key) {
    try {
        var keyRef = database.ref('activationKeys/' + key);
        var snapshot = await keyRef.once('value');
        
        if (snapshot.exists()) {
            var keyData = snapshot.val();
            
            // Verificar se a chave expirou
            if (keyData.expirationDate) {
                var expirationDate = new Date(keyData.expirationDate);
                var now = new Date();
                
                if (now > expirationDate) {
                    console.log('❌ Chave expirada:', key);
                    keyData.valid = false;
                    
                    // Atualizar no Firebase
                    await keyRef.update({ valid: false });
                    
                    return {
                        valid: false,
                        expired: true,
                        message: 'Chave expirada'
                    };
                }
            }
            
            return {
                valid: keyData.valid === true,
                used: keyData.used === true,
                type: keyData.type || 'basic',
                maxUses: keyData.maxUses || 1,
                usedCount: keyData.usedCount || 0,
                daysValid: keyData.daysValid || 30,
                expirationDate: keyData.expirationDate,
                created: keyData.created
            };
        }
        return { valid: false }; // Não encontrada no Firebase
    } catch (error) {
        console.error('Erro ao verificar chave:', error);
        return { valid: false };
    }
}

// Função para marcar chave como usada
async function markKeyAsUsed(key, userEmail) {
    try {
        var keyRef = database.ref('activationKeys/' + key);
        var snapshot = await keyRef.once('value');
        
        if (snapshot.exists()) {
            var keyData = snapshot.val();
            keyData.used = true;
            keyData.usedBy = userEmail;
            keyData.usedDate = new Date().toISOString();
            keyData.usedCount = (keyData.usedCount || 0) + 1;
            
            await keyRef.set(keyData);
            console.log('✅ Chave marcada como usada por:', userEmail);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Erro ao marcar chave:', error);
        return false;
    }
}

// Função para gerar nova chave (para admin)
async function generateActivationKey(type = 'basic', maxUses = 1, daysValid = 30) {
    var prefix = '';
    switch(type) {
        case 'premium': prefix = 'PREMIUM-'; break;
        case 'full': prefix = 'ELITE-'; break;
        default: prefix = 'BASIC-';
    }
    
    var key = prefix + Date.now().toString(36).toUpperCase() + '-' + 
              Math.random().toString(36).substr(2, 4).toUpperCase();
    
    // Calcular data de expiração
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysValid);
    
    var keyData = {
        key: key,
        type: type,
        valid: true,
        used: false,
        maxUses: maxUses,
        usedCount: 0,
        daysValid: daysValid,
        expirationDate: expirationDate.toISOString(),
        created: new Date().toISOString(),
        createdBy: USER.email
    };
    
    try {
        await database.ref('activationKeys/' + key).set(keyData);
        console.log('✅ Nova chave gerada:', key);
        return { key: key, data: keyData };
    } catch (error) {
        console.error('Erro ao gerar chave:', error);
        return null;
    }
}

// Função para verificar se permite acesso sem chave
function allowAccessWithoutKey() {
    return !ACTIVATION_SYSTEM.requireKey;
}

// ==================== FUNÇÕES FIREBASE ====================

async function saveDataToFirebase() {
    try {
        if (!USER.id || !USER.email) {
            console.error('Usuário não está logado corretamente');
            return;
        }

        // Verifica se completou todos os módulos básicos
        var completedBasic = Object.keys(USER.scores).filter(function(k) {
            return k.startsWith('mod') && !k.startsWith('prem');
        }).length;
        
        if(completedBasic === TOTAL_MODULES && !USER.completionDate) {
            USER.completionDate = new Date().toISOString();
        }

        // Salva usuário
        await database.ref('users/' + USER.id).set(USER);
        
        // Salva empresa se houver código
        if(USER.companyCode && USER.companyCode !== 'INDIVIDUAL') {
            var companyRef = database.ref('companies/' + USER.companyCode);
            var companySnapshot = await companyRef.once('value');
            var companyData = companySnapshot.val();
            
            if(companyData) {
                if(!companyData.employees) {
                    companyData.employees = [];
                }
                
                var empIndex = companyData.employees.findIndex(function(e) { 
                    return e.email === USER.email; 
                });
                
                var userStatus = 'not-started';
                if(completedBasic === TOTAL_MODULES) {
                    userStatus = 'completed';
                } else if(completedBasic > 0) {
                    userStatus = 'in-progress';
                }
                
                var isPremium = hasPremiumAccess();
                var avgScore = 0;
                var totalScore = 0;
                
                for(var modId in USER.scores) {
                    if(modId.startsWith('mod') && !modId.startsWith('prem')) {
                        totalScore += USER.scores[modId] || 0;
                    }
                }
                
                if(completedBasic > 0) {
                    avgScore = (totalScore / completedBasic).toFixed(1);
                }
                
                var daysToComplete = null;
                if(USER.startDate && USER.completionDate) {
                    var start = new Date(USER.startDate);
                    var end = new Date(USER.completionDate);
                    daysToComplete = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                }
                
                var employeeData = {
                    id: USER.id,
                    name: USER.name,
                    email: USER.email,
                    xp: USER.xp,
                    completed: completedBasic,
                    badges: USER.badges.length,
                    simulations: USER.simScore,
                    status: userStatus,
                    startDate: USER.startDate,
                    completionDate: USER.completionDate,
                    daysToComplete: daysToComplete,
                    averageScore: avgScore,
                    isPremium: isPremium,
                    lastActive: new Date().toISOString()
                };
                
                if(empIndex >= 0) {
                    companyData.employees[empIndex] = employeeData;
                } else {
                    employeeData.joined = new Date().toISOString();
                    companyData.employees.push(employeeData);
                }
                
                await companyRef.set(companyData);
            } else {
                // Se não existe empresa, cria uma nova
                var newCompany = {
                    code: USER.companyCode,
                    name: COMPANY.name || 'Nova Empresa',
                    adminEmail: USER.isAdmin ? USER.email : '',
                    adminName: USER.isAdmin ? USER.name : '',
                    employees: [{
                        id: USER.id,
                        name: USER.name,
                        email: USER.email,
                        xp: USER.xp,
                        completed: completedBasic,
                        badges: USER.badges.length,
                        simulations: USER.simScore,
                        status: completedBasic > 0 ? 'in-progress' : 'not-started',
                        startDate: USER.startDate,
                        completionDate: USER.completionDate,
                        joined: new Date().toISOString(),
                        lastActive: new Date().toISOString()
                    }]
                };
                await companyRef.set(newCompany);
            }
        }
        
        console.log('✅ Dados salvos no Firebase');
    } catch (error) {
        console.error('❌ Erro ao salvar no Firebase:', error);
        // Fallback para localStorage
        saveToLocalStorage();
    }
}

async function loadDataFromFirebase() {
    try {
        if (!USER.id) return;

        // Carrega dados do usuário
        var userSnapshot = await database.ref('users/' + USER.id).once('value');
        if (userSnapshot.exists()) {
            var data = userSnapshot.val();
            USER.xp = data.xp || 0;
            USER.scores = data.scores || {};
            USER.badges = data.badges || [];
            USER.simulations = data.simulations || 0;
            USER.simScore = data.simScore || 0;
            USER.simXP = data.simXP || 0;
            USER.simCompleted = data.simCompleted || [];
            USER.startDate = data.startDate || new Date().toISOString();
            USER.completionDate = data.completionDate;
            USER.hasSeenWelcome = data.hasSeenWelcome || false;
            
            if(!USER.startDate) {
                USER.startDate = new Date().toISOString();
            }
        }
        
        // Carrega dados da empresa
        if(USER.companyCode && USER.companyCode !== 'INDIVIDUAL') {
            var companySnapshot = await database.ref('companies/' + USER.companyCode).once('value');
            if (companySnapshot.exists()) {
                COMPANY = companySnapshot.val();
            }
        }
        
        console.log('✅ Dados carregados do Firebase');
    } catch (error) {
        console.error('❌ Erro ao carregar do Firebase:', error);
        // Fallback para localStorage
        loadFromLocalStorage();
    }
}

function saveToLocalStorage() {
    // Fallback para localStorage
    localStorage.setItem('user_' + USER.email, JSON.stringify(USER));
    if(USER.companyCode && USER.companyCode !== 'INDIVIDUAL') {
        localStorage.setItem('company_' + USER.companyCode, JSON.stringify(COMPANY));
    }
}

function loadFromLocalStorage() {
    var saved = localStorage.getItem('user_' + USER.email);
    if(saved) {
        var data = JSON.parse(saved);
        USER.xp = data.xp || 0;
        USER.scores = data.scores || {};
        USER.badges = data.badges || [];
        USER.simulations = data.simulations || 0;
        USER.simScore = data.simScore || 0;
        USER.simXP = data.simXP || 0;
        USER.simCompleted = data.simCompleted || [];
        USER.startDate = data.startDate || new Date().toISOString();
        USER.completionDate = data.completionDate;
        USER.hasSeenWelcome = data.hasSeenWelcome || false;
        
        if(!USER.startDate) {
            USER.startDate = new Date().toISOString();
        }
    }
}

// ==================== FUNÇÕES DE LOGIN ====================

function showLoginType(type) {
    var adminExtraFields = document.getElementById('adminExtraFields');
    
    if(type === 'user') {
        document.getElementById('userLogin').style.display = 'block';
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('btnLoginUser').style.background = '#3b82f6';
        document.getElementById('btnLoginAdmin').style.background = '#64748b';
    } else {
        document.getElementById('userLogin').style.display = 'none';
        document.getElementById('adminLogin').style.display = 'block';
        document.getElementById('btnLoginUser').style.background = '#64748b';
        document.getElementById('btnLoginAdmin').style.background = '#8b5cf6';
        
        var email = document.getElementById('adminEmail').value.trim();
        if(email) {
            checkAdminExists(email);
        }
    }
}

async function checkAdminExists(email) {
    try {
        var adminExtraFields = document.getElementById('adminExtraFields');
        var adminSnapshot = await database.ref('admins/' + email.replace(/\./g, '_')).once('value');
        
        if(!adminSnapshot.exists()) {
            adminExtraFields.style.display = 'block';
        } else {
            adminExtraFields.style.display = 'none';
        }
    } catch (error) {
        console.error('Erro ao verificar admin:', error);
    }
}

document.getElementById('adminEmail').addEventListener('blur', function() {
    var email = this.value.trim();
    if(email && document.getElementById('adminLogin').style.display !== 'none') {
        checkAdminExists(email);
    }
});

async function doLogin() {
    var name = document.getElementById('userName').value.trim();
    var email = document.getElementById('userEmail').value.trim();
    var code = document.getElementById('companyCode').value.trim().toUpperCase();
    var activationKey = document.getElementById('activationKey').value.trim().toUpperCase();
    
    if(!name || !email) {
        alert('Preencha nome e email');
        return;
    }
    
    // VERIFICAÇÃO DE USUÁRIO EXISTENTE
    // Primeiro verifica se já existe no Firebase
    try {
        var userEmailKey = email.replace(/[.#$[\]]/g, '_');
        var userSnapshot = await database.ref('users').orderByChild('email').equalTo(email).once('value');
        
        if(userSnapshot.exists()) {
            // Usuário já existe, carrega dados
            var users = userSnapshot.val();
            var userId = Object.keys(users)[0];
            var userData = users[userId];
            
            console.log('✅ Usuário encontrado:', userData.name);
            
            // Atualiza objeto USER com dados do Firebase
            USER.id = userId;
            USER.name = userData.name;
            USER.email = userData.email;
            USER.isAdmin = userData.isAdmin || false;
            USER.companyCode = userData.companyCode || 'INDIVIDUAL';
            USER.xp = userData.xp || 0;
            USER.scores = userData.scores || {};
            USER.badges = userData.badges || [];
            USER.simulations = userData.simulations || 0;
            USER.simScore = userData.simScore || 0;
            USER.simXP = userData.simXP || 0;
            USER.simCompleted = userData.simCompleted || [];
            USER.startDate = userData.startDate || new Date().toISOString();
            USER.completionDate = userData.completionDate;
            USER.hasSeenWelcome = userData.hasSeenWelcome || false;
            USER.activationKey = userData.activationKey || activationKey || null;
            USER.keyType = userData.keyType || 'basic';
            
            // Se já tinha chave, não precisa pedir novamente
            if(userData.activationKey && !activationKey) {
                console.log('🔑 Usando chave guardada:', userData.activationKey);
                activationKey = userData.activationKey;
            }
            
            // Pular verificação de chave se já tem uma válida
            if(userData.activationKey && userData.keyType) {
                console.log('✅ Usuário já tem chave válida guardada');
                
                if(code) {
                    await loadCompanyData(code);
                } else {
                    COMPANY.name = 'Formação Individual';
                }
                
                await loadDataFromFirebase();
                
                // Se é primeiro acesso, mostra popup
                if(!USER.hasSeenWelcome) {
                    showWelcomePopup();
                    USER.hasSeenWelcome = true;
                    await saveDataToFirebase();
                }
                
                checkBadges();
                localStorage.setItem('last_user_email', email);
                startApp();
                return;
            }
        }
    } catch (error) {
        console.error('Erro ao verificar usuário existente:', error);
    }
    
    // CÓDIGO EXISTENTE PARA NOVOS USUÁRIOS (mantenha o que já tem)
    // Verificar chave de ativação (se fornecida)
    var keyValid = true;
    var keyType = 'basic';
    
    if (activationKey) {
        var keyCheck = await checkActivationKey(activationKey);
        
        if (!keyCheck.valid) {
            alert('❌ Chave de ativação inválida!');
            return;
        }
        
        if (keyCheck.used && keyCheck.usedCount >= keyCheck.maxUses) {
            alert('⚠️ Esta chave já foi utilizada o número máximo de vezes!');
            return;
        }
        
        keyType = keyCheck.type;
        keyValid = true;
        
        console.log('🔑 Chave válida. Tipo:', keyType);
    } else {
        // Sem chave, verifica se permite acesso básico
        if (!allowAccessWithoutKey()) {
            alert('🔑 É necessária uma chave de ativação para aceder ao sistema!');
            return;
        }
        console.log('⚠️ Acesso sem chave (modo básico)');
    }
    
    USER.id = 'user_' + Date.now();
    USER.name = name;
    USER.email = email;
    USER.isAdmin = false;
    USER.companyCode = code || 'INDIVIDUAL';
    USER.activationKey = activationKey || null;
    USER.keyType = keyType;
    
    console.log('👤 Usuário configurado:', USER.name, 'Tipo chave:', USER.keyType);
    
    if(activationKey && keyValid) {
        await markKeyAsUsed(activationKey, email);
    }
    
    if(code) {
        await loadCompanyData(code);
    } else {
        COMPANY.name = 'Formação Individual';
    }
    
    await loadDataFromFirebase();
    
    // Se é primeiro acesso, mostra popup
    if(!USER.hasSeenWelcome) {
        showWelcomePopup();
        USER.hasSeenWelcome = true;
        await saveDataToFirebase();
    }
    
    checkBadges();
    startApp();
}

async function doAdminLogin() {
    var email = document.getElementById('adminEmail').value.trim();
    var pass = document.getElementById('adminPass').value;
    var name = document.getElementById('adminName').value.trim();
    var companyName = document.getElementById('companyName').value.trim();
    
    if(!email || !pass) {
        alert('Email e senha obrigatórios');
        return;
    }
    
    if(pass.length < 6) {
        alert('Senha mínimo 6 caracteres');
        return;
    }
    
    var adminKey = email.replace(/\./g, '_');
    
    try {
        var adminSnapshot = await database.ref('admins/' + adminKey).once('value');
        
        if(adminSnapshot.exists()) {
            var adminData = adminSnapshot.val();
            
            if(adminData.password !== pass) {
                alert('❌ Senha incorreta');
                return;
            }
            
            USER.id = adminData.id;
            USER.name = adminData.name;
            USER.email = email;
            USER.isAdmin = true;
            USER.companyCode = adminData.companyCode;
            
            COMPANY.code = adminData.companyCode;
            COMPANY.name = adminData.companyName;
            COMPANY.adminEmail = email;
            COMPANY.adminName = adminData.name;
            
            await loadCompanyEmployees();
            startApp();
            
        } else {
            if(!name || !companyName) {
                alert('⚠️ Primeira vez? Preencha Nome e Empresa');
                document.getElementById('adminExtraFields').style.display = 'block';
                return;
            }
            
            var companyCode = generateCompanyCode();
            
            USER.id = 'admin_' + Date.now();
            USER.name = name;
            USER.email = email;
            USER.isAdmin = true;
            USER.companyCode = companyCode;
            
            COMPANY.code = companyCode;
            COMPANY.name = companyName;
            COMPANY.adminEmail = email;
            COMPANY.adminName = name;
            COMPANY.employees = [];
            
            var adminData = {
                id: USER.id,
                name: name,
                password: pass,
                companyCode: companyCode,
                companyName: companyName,
                created: new Date().toISOString()
            };
            
            // Salva admin no Firebase
            await database.ref('admins/' + adminKey).set(adminData);
            
            // Salva empresa no Firebase
            await database.ref('companies/' + companyCode).set(COMPANY);
            
            startApp();
            alert('✅ Admin criado!\n\nCódigo da Empresa: ' + companyCode);
        }
        
        await saveDataToFirebase();
    } catch (error) {
        console.error('Erro no login admin:', error);
        alert('Erro ao fazer login: ' + error.message);
    }
}

function generateCompanyCode() {
    return 'EMP-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// ==================== FUNÇÕES DE ACESSO PREMIUM ====================

function hasPremiumAccess() {
    // Se tiver chave premium ou elite
    if (USER.keyType === 'premium' || USER.keyType === 'full') {
        console.log('⭐ Acesso premium via chave:', USER.keyType);
        return true;
    }
    
    // Verifica se completou os 5 módulos básicos com 4/5 ou mais
    var completedBasic = Object.keys(USER.scores).filter(function(k) {
        return k.startsWith('mod') && !k.startsWith('prem');
    }).length;
    
    if (completedBasic < TOTAL_MODULES) return false;
    
    var totalScore = 0;
    var totalQuestions = 0;
    
    for (var modId in USER.scores) {
        if (modId.startsWith('mod') && !modId.startsWith('prem')) {
            totalScore += USER.scores[modId] || 0;
            totalQuestions += 5;
        }
    }
    
    var average = (totalScore / totalQuestions) * 5;
    return average >= 4;
}

function hasEliteAccess() {
    return USER.keyType === 'full';
}

// ==================== FUNÇÕES DE NAVEGAÇÃO ====================

function startApp() {
    console.log('🚀 Iniciando app... isAdmin:', USER.isAdmin);
    
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('navbar').style.display = 'flex';
    
    if(USER.isAdmin) {
        console.log('👑 Modo Administrador ativado');
        // Para admin: MOSTRAR apenas botão Admin
        document.getElementById('btnDash').style.display = 'inline-block';
        document.getElementById('btnMods').style.display = 'inline-block';
        document.getElementById('btnSim').style.display = 'inline-block';
        document.getElementById('btnBadges').style.display = 'inline-block';
        document.getElementById('btnLib').style.display = 'inline-block';
        document.getElementById('btnCert').style.display = 'inline-block';
        document.getElementById('btnAdmin').style.display = 'inline-block';
        
        goToAdmin(); // Ir direto para o painel admin
    } else {
        console.log('👤 Modo Colaborador ativado');
        document.getElementById('btnAdmin').style.display = 'none';
        goToDash();
    }
}

function showPage(pageId) {
    var pages = ['dashboardPage','modulesPage','quizPage','simulatorPage','badgesPage','libraryPage','certificatePage','adminPage'];
    pages.forEach(function(p) {
        document.getElementById(p).classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

function goToDash() {
    showPage('dashboardPage');
    updateDashboard();
}

function goToMods() {
    showPage('modulesPage');
    renderModules();
}

function goToSimulator() {
    showPage('simulatorPage');
    renderSimulator();
}

function goToBadges() {
    showPage('badgesPage');
    renderBadges();
}

function goToLibrary() {
    showPage('libraryPage');
    renderLibrary();
}

function goToCert() {
    showPage('certificatePage');
    
    // Atualizar informações no certificado
    document.getElementById('certName').textContent = USER.name;
    document.getElementById('certEmail').textContent = USER.email;
    document.getElementById('certCompany').textContent = COMPANY.name;
    document.getElementById('certXP').textContent = USER.xp;
    document.getElementById('certBadges').textContent = USER.badges.length;
    
    var completionDate = USER.completionDate ? 
        new Date(USER.completionDate).toLocaleDateString('pt-PT') : 
        new Date().toLocaleDateString('pt-PT');
    document.getElementById('certDate').textContent = completionDate;
    
    setTimeout(function() {
        generateCertificate();
    }, 100);
}

function goToAdmin() {
    if(!USER.isAdmin) {
        alert('Acesso apenas para administradores');
        return;
    }
    
    showPage('adminPage');
    updateAdminDashboard();
}

async function logout() {
    if(!confirm('Sair? Progresso guardado.')) {
        return;
    }
    
    await saveDataToFirebase();
    window.location.reload();
}

// ==================== FUNÇÕES DE DASHBOARD ====================

function updateDashboard() {
    document.getElementById('dashName').textContent = USER.name;
    document.getElementById('dashCompany').textContent = COMPANY.name;
    document.getElementById('dashXP').textContent = USER.xp;
    
    var completed = Object.keys(USER.scores).filter(function(k) {
        return k.startsWith('mod') && !k.startsWith('prem');
    }).length;
    
    document.getElementById('dashMods').textContent = completed;
    document.getElementById('dashBadges').textContent = USER.badges.length;
    document.getElementById('dashSims').textContent = USER.simScore;
    
    var progress = Math.round((completed / TOTAL_MODULES) * 100);
    document.getElementById('dashProgress').style.width = progress + '%';
    document.getElementById('dashProgressPct').textContent = progress;
    
    // Mostrar botão do certificado quando completar os 5 módulos básicos
    if(completed === TOTAL_MODULES) {
        document.getElementById('btnCert').style.display = 'inline-block';
    } else {
        document.getElementById('btnCert').style.display = 'none';
    }
}

// ==================== FUNÇÕES DE MÓDULOS ====================
function renderModules() {
    console.log('🔄 renderModules() chamado. USER:', USER.name, 'Premium access:', hasPremiumAccess());
    
    // ... resto do código ...
}
function renderModules() {
    var html = '';
    
    // Módulos básicos
    MODULES.forEach(function(mod) {
        var completed = USER.scores[mod.id] !== undefined;
        var score = USER.scores[mod.id] || 0;
        var diffClass = mod.difficulty === 'advanced' ? ' advanced' : '';
        
        html += '<div class="module ' + (completed ? 'completed' : '') + diffClass + '">';
        html += '<h3>' + mod.title + '</h3>';
        html += '<p style="color:#64748b;margin:0.5rem 0">' + mod.desc + '</p>';
        if(mod.difficulty === 'advanced') {
            html += '<p style="color:#f59e0b;font-weight:700;margin:0.5rem 0">⚡ Nível Avançado</p>';
        }
        html += '<p style="margin:0.5rem 0"><strong>💎 XP:</strong> ' + mod.xp + '</p>';
        
        if(completed) {
            html += '<p style="color:#10b981;font-weight:700">✓ Concluído: ' + score + '/5</p>';
            html += '<button onclick="startModule(\'' + mod.id + '\')">🔄 Refazer</button>';
        } else {
            html += '<button onclick="startModule(\'' + mod.id + '\')">▶ Iniciar</button>';
        }
        
        html += '</div>';
    });
    
    document.getElementById('modulesList').innerHTML = html;
    
    // Verifica se mostra módulos premium
    var premiumSection = document.getElementById('premiumModulesSection');
    var premiumList = document.getElementById('premiumModulesList');
    
    if(hasPremiumAccess()) {
        premiumSection.style.display = 'block';
        
        var premiumHtml = '';
        PREMIUM_MODULES.forEach(function(mod) {
            var completed = USER.scores[mod.id] !== undefined;
            var score = USER.scores[mod.id] || 0;
            
            premiumHtml += '<div class="module premium ' + (completed ? 'completed' : '') + '">';
            premiumHtml += '<h3>' + mod.title + '</h3>';
            premiumHtml += '<p style="color:#64748b;margin:0.5rem 0">' + mod.desc + '</p>';
            premiumHtml += '<p style="color:#8b5cf6;font-weight:700;margin:0.5rem 0">⭐ Conteúdo Premium</p>';
            premiumHtml += '<p style="margin:0.5rem 0"><strong>💎 XP:</strong> ' + mod.xp + '</p>';
            
            if(completed) {
                premiumHtml += '<p style="color:#10b981;font-weight:700">✓ Concluído: ' + score + '/5</p>';
                premiumHtml += '<button onclick="startModule(\'' + mod.id + '\', true)">🔄 Refazer</button>';
            } else {
                premiumHtml += '<button onclick="startModule(\'' + mod.id + '\', true)" style="background:#8b5cf6">⭐ Iniciar Módulo Premium</button>';
            }
            
            premiumHtml += '</div>';
        });
        
        premiumList.innerHTML = premiumHtml;
    } else {
        premiumSection.style.display = 'none';
    }
}

function startModule(modId, isPremium) {
    var module;
    
    if(isPremium) {
        module = PREMIUM_MODULES.find(function(m) { return m.id === modId; });
        if(!module) {
            // Procura nos módulos normais
            module = MODULES.find(function(m) { return m.id === modId; });
        }
    } else {
        module = MODULES.find(function(m) { return m.id === modId; });
        if(!module) {
            // Procura nos módulos premium
            module = PREMIUM_MODULES.find(function(m) { return m.id === modId; });
        }
    }
    
    CURRENT_MODULE = module;
    
    if(!CURRENT_MODULE) return;
    
    // VERIFICA SE É MÓDULO DE STORYTELLING
    if(CURRENT_MODULE.stories) {
        renderStoryModule();
        return;
    }

    var html = '<button onclick="goToMods()" style="background:#64748b;margin-bottom:1rem">← Voltar aos Módulos</button>';
    html += '<h2>' + CURRENT_MODULE.title;
    if(CURRENT_MODULE.isPremium) {
        html += ' <span style="background:#8b5cf6;color:white;padding:0.25rem 0.75rem;border-radius:20px;font-size:0.85rem">⭐ Premium</span>';
    }
    html += '</h2>';
    html += '<p style="color:#64748b;margin-bottom:2rem">' + CURRENT_MODULE.desc + '</p>';
    
    CURRENT_MODULE.questions.forEach(function(q, i) {
        html += '<div style="background:#f8fafc;padding:1.5rem;margin:1rem 0;border-radius:8px" id="q' + i + '">';
        html += '<h4 style="margin-bottom:1rem">' + (i + 1) + '. ' + q.q + '</h4>';
        
        q.opts.forEach(function(opt, j) {
            html += '<label style="display:block;margin:0.5rem 0;padding:0.5rem;border-radius:6px;cursor:pointer;transition:background 0.3s"><input type="radio" name="q' + i + '" value="' + j + '"> ' + opt + '</label>';
        });
        
        html += '</div>';
    });
    
    html += '<div style="text-align:center;margin-top:2rem">';
    html += '<button onclick="submitQuiz()">✓ Submeter Respostas</button>';
    html += '</div>';
    html += '<div id="quizResult"></div>';
    
    document.getElementById('quizContent').innerHTML = html;
    showPage('quizPage');
}

async function submitQuiz() {
    if(!CURRENT_MODULE) return;
    
    var score = 0;
    var total = CURRENT_MODULE.questions.length;
    
    CURRENT_MODULE.questions.forEach(function(q, i) {
        var selected = document.querySelector('input[name="q' + i + '"]:checked');
        var qDiv = document.getElementById('q' + i);
        
        if(selected && parseInt(selected.value) === q.correct) {
            score++;
            qDiv.style.background = '#f0fdf4';
            qDiv.style.border = '2px solid #10b981';
        } else {
            qDiv.style.background = '#fef2f2';
            qDiv.style.border = '2px solid #ef4444';
        }
    });
    
    USER.scores[CURRENT_MODULE.id] = score;
    
    var xpEarned = Math.round((score / total) * CURRENT_MODULE.xp);
    USER.xp += xpEarned;
    
    var pct = Math.round((score / total) * 100);
    var resultHtml = '<div style="margin-top:2rem;padding:1.5rem;border-radius:8px;text-align:center;' +
        'background:' + (pct >= 80 ? '#d1fae5' : '#fee2e2') + ';' +
        'color:' + (pct >= 80 ? '#065f46' : '#991b1b') + '">';
    resultHtml += '<h3>' + (pct >= 80 ? '🎉 Parabéns! Passou!' : '📚 Continue estudando!') + '</h3>';
    resultHtml += '<p style="font-size:1.2rem;margin:1rem 0">' + score + '/' + total + ' (' + pct + '%)</p>';
    resultHtml += '<p style="font-size:1.1rem">+' + xpEarned + ' XP</p>';
    resultHtml += '<button onclick="goToMods()" style="margin-top:1rem">← Voltar aos Módulos</button>';
    resultHtml += '</div>';
    
    document.getElementById('quizResult').innerHTML = resultHtml;
    
    await saveDataToFirebase();
    checkBadges();
    showXP('+' + xpEarned + ' XP');
    
    if(pct >= 80) {
        confetti();
    }
}

// ==================== FUNÇÕES DE SIMULADOR ====================

function renderSimulator() {
    document.getElementById('simScore').textContent = USER.simScore;
    document.getElementById('simXP').textContent = USER.simXP;
    
    var html = '';
    
    for(var i = 0; i < PHISHING_EMAILS.length; i++) {
        var email = PHISHING_EMAILS[i];
        if(USER.simCompleted.includes(email.id)) continue;
        
        html += '<div class="simulator-email" id="sim_' + email.id + '">';
        html += '<div class="email-header">';
        html += '<div><strong>De:</strong> ' + email.from + '</div>';
        html += '<div><strong>Assunto:</strong> ' + email.subject + '</div>';
        html += '</div>';
        html += '<div style="white-space:pre-wrap">' + email.body + '</div>';
        html += '<div class="simulator-actions" id="actions_' + email.id + '">';
        html += '<button onclick="checkEmail(\'' + email.id + '\', true)" style="background:#ef4444">🚨 É Phishing</button>';
        html += '<button onclick="checkEmail(\'' + email.id + '\', false)" style="background:#10b981">✅ É Legítimo</button>';
        html += '</div>';
        html += '<div id="result_' + email.id + '" style="display:none;margin-top:1rem;padding:1rem;border-radius:8px"></div>';
        html += '</div>';
    }
    
    if(html === '') {
        html = '<div style="text-align:center;padding:3rem;background:#f0fdf4;border-radius:12px">';
        html += '<div style="font-size:4rem">🏆</div>';
        html += '<h2 style="color:#065f46">Completou Todas as Simulações!</h2>';
        html += '<p style="color:#047857;margin-top:1rem">Score Final: ' + USER.simScore + '/' + PHISHING_EMAILS.length + '</p>';
        html += '<p style="color:#047857">XP Total Ganho: ' + USER.simXP + '</p>';
        html += '<button onclick="resetSimulator()" style="margin-top:1rem">🔄 Recomeçar Simulador</button>';
        html += '</div>';
    }
    
    document.getElementById('simulatorContent').innerHTML = html;
}

async function checkEmail(emailId, userSaysPhishing) {
    var email = PHISHING_EMAILS.find(function(e) { return e.id === emailId; });
    if(!email) return;
    
    var correct = (email.isPhishing === userSaysPhishing);
    var emailDiv = document.getElementById('sim_' + emailId);
    var actionsDiv = document.getElementById('actions_' + emailId);
    var resultDiv = document.getElementById('result_' + emailId);
    
    actionsDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    if(correct) {
        emailDiv.classList.add('correct');
        resultDiv.style.background = '#f0fdf4';
        resultDiv.innerHTML = '<strong style="color:#065f46">✓ CORRETO! +' + email.xp + ' XP</strong><p style="color:#047857;margin-top:0.5rem">' + email.explanation + '</p>';
        USER.simScore++;
        USER.simXP += email.xp;
        USER.xp += email.xp;
        showXP('+' + email.xp + ' XP');
        confetti();
    } else {
        emailDiv.classList.add('incorrect');
        resultDiv.style.background = '#fef2f2';
        resultDiv.innerHTML = '<strong style="color:#991b1b">✗ INCORRETO</strong><p style="color:#b91c1c;margin-top:0.5rem">' + email.explanation + '</p>';
    }
    
    USER.simCompleted.push(emailId);
    await saveDataToFirebase();
    checkBadges();
    
    document.getElementById('simScore').textContent = USER.simScore;
    document.getElementById('simXP').textContent = USER.simXP;
    
    setTimeout(function() {
        if(USER.simCompleted.length === PHISHING_EMAILS.length) {
            renderSimulator();
        }
    }, 3000);
}

async function resetSimulator() {
    if(!confirm('Recomeçar simulador? Isto irá reiniciar o seu progresso no simulador.')) {
        return;
    }
    USER.simCompleted = [];
    await saveDataToFirebase();
    renderSimulator();
}

// ==================== FUNÇÕES DE CONQUISTAS ====================

function renderBadges() {
    document.getElementById('badgesUnlocked').textContent = USER.badges.length + '/' + BADGES.length;
    document.getElementById('badgesXP').textContent = USER.xp;
    
    var html = '';
    
    BADGES.forEach(function(badge) {
        var unlocked = USER.badges.includes(badge.id);
        
        html += '<div class="badge-card ' + (unlocked ? 'unlocked' : 'locked') + (badge.id.startsWith('prem') ? ' premium' : '') + '">';
        html += '<div class="badge-icon">' + badge.name.split(' ')[0] + '</div>';
        html += '<div class="badge-info">';
        html += '<h4>' + badge.name + '</h4>';
        html += '<p style="color:#64748b;font-size:0.9rem">' + badge.desc + '</p>';
        if(unlocked) {
            html += '<p style="color:#10b981;font-weight:700;margin-top:0.5rem">✓ Desbloqueado!</p>';
        } else {
            html += '<p style="color:#64748b;font-size:0.85rem;margin-top:0.5rem">🔒 Bloqueado</p>';
        }
        html += '</div>';
        html += '</div>';
    });
    
    document.getElementById('badgesList').innerHTML = html;
}

// ==================== FUNÇÕES DE BIBLIOTECA ====================

function renderLibrary() {
    var html = '';
    
    LIBRARY.forEach(function(r) {
        html += '<div class="resource-card" onclick="toggleResource(\'' + r.id + '\')" id="res_' + r.id + '">';
        html += '<div style="display:flex;justify-content:space-between">';
        html += '<h4>' + r.title + '</h4>';
        html += '<span id="arrow_' + r.id + '">▼</span>';
        html += '</div>';
        html += '<p style="font-size:0.9rem;color:#64748b;margin-top:0.5rem">📂 ' + r.category + '</p>';
        html += '<div class="resource-content" id="content_' + r.id + '">' + r.content + '</div>';
        html += '</div>';
    });
    
    document.getElementById('libraryContent').innerHTML = html;
}

function toggleResource(id) {
    var content = document.getElementById('content_' + id);
    var arrow = document.getElementById('arrow_' + id);
    var card = document.getElementById('res_' + id);
    
    if(content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.textContent = '▼';
        card.classList.remove('expanded');
    } else {
        content.classList.add('show');
        arrow.textContent = '▲';
        card.classList.add('expanded');
    }
}

// ==================== FUNÇÕES DE CERTIFICADO ====================

function generateCertificate() {
    var canvas = document.getElementById('certCanvas');
    var ctx = canvas.getContext('2d');
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Borda externa
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 16;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // Borda interna
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
    
    // Título
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 CERTIFICADO PROFISSIONAL', canvas.width / 2, 150);
    
    // Sub-título
    ctx.font = '28px Arial';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Certifica-se que', canvas.width / 2, 220);
    
    // Nome do colaborador
    ctx.font = 'bold 56px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(USER.name.toUpperCase(), canvas.width / 2, 310);
    
    // Email
    ctx.font = '24px Arial';
    ctx.fillStyle = '#64748b';
    ctx.fillText(USER.email, canvas.width / 2, 360);
    
    // Empresa
    if(COMPANY.name && COMPANY.name !== 'Formação Individual') {
        ctx.fillText(COMPANY.name, canvas.width / 2, 395);
    }
    
    // Texto de conclusão
    ctx.font = '26px Arial';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('concluiu com distinção a formação completa', canvas.width / 2, 460);
    
    // Nome da academia
    ctx.font = 'bold 38px Arial';
    ctx.fillStyle = '#10b981';
    ctx.fillText('Academia Anti-Phishing Elite | Mareginter', canvas.width / 2, 530);
    
    // Caixa de informações
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(200, 580, canvas.width - 400, 200);
    
    // Borda da caixa de informações
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(200, 580, canvas.width - 400, 200);
    
    // Informações dentro da caixa
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'left';
    
    // Calcular estatísticas
    var completedBasic = 0;
    var totalScoreBasic = 0;
    var completedPremium = 0;
    var totalScorePremium = 0;
    
    for(var k in USER.scores) {
        if(k.startsWith('mod') && !k.startsWith('prem')) {
            completedBasic++;
            totalScoreBasic += USER.scores[k] || 0;
        } else if(k.startsWith('prem')) {
            completedPremium++;
            totalScorePremium += USER.scores[k] || 0;
        }
    }
    
    var completionDate = USER.completionDate ? 
        new Date(USER.completionDate).toLocaleDateString('pt-PT') : 
        new Date().toLocaleDateString('pt-PT');
    
    // Escrever informações
    ctx.fillText('Data de Emissão: ' + completionDate, 240, 635);
    ctx.fillText('Módulos Básicos Concluídos: ' + completedBasic + '/5', 240, 675);
    ctx.fillText('Pontuação Média: ' + (completedBasic > 0 ? (totalScoreBasic / completedBasic).toFixed(1) + '/5' : '0/5'), 240, 715);
    
    if(completedPremium > 0) {
        ctx.fillText('Módulos Premium Concluídos: ' + completedPremium + '/3', 240, 755);
    }
    
    // XP e badges
    ctx.fillText('XP Total: ' + USER.xp + ' | Badges: ' + USER.badges.length, canvas.width / 2 - 200, 795);
    
    // Rodapé
    ctx.textAlign = 'center';
    ctx.font = '18px Arial';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('ID do Certificado: CERT-' + USER.id.substr(-8).toUpperCase(), canvas.width / 2, 820);
    ctx.fillText('Academia Anti-Phishing Elite - 2026 | Formação em Segurança Digital', canvas.width / 2, 850);
    
    // Adicionar selo
    ctx.beginPath();
    ctx.arc(canvas.width - 100, 100, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981';
    ctx.fill();
    ctx.strokeStyle = '#065f46';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✓', canvas.width - 100, 100);
}

function downloadCert() {
    var canvas = document.getElementById('certCanvas');
    var link = document.createElement('a');
    var filename = 'Certificado_AntiPhishing_' + 
        USER.name.replace(/\s+/g, '_') + '_' + 
        new Date().toISOString().split('T')[0] + '.png';
    
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    showXP('✓ Certificado descarregado!');
}

// ==================== FUNÇÕES DE ADMINISTRAÇÃO ====================

async function updateAdminDashboard() {
    console.log('📊 Atualizando painel admin...');
    
    document.getElementById('adminWelcome').textContent = 
        'Empresa: ' + COMPANY.name + ' | Código: ' + COMPANY.code;
    
    await loadCompanyEmployees();
    
    var employees = COMPANY.employees || [];
    var total = employees.length;
     var storyModule = PREMIUM_MODULES.find(m => m.stories);
    var storyStats = { total: 0, completed: 0 };
    
    if(storyModule) {
        employees.forEach(function(emp) {
            var userStoryCases = 0;
            var userCompletedStoryCases = 0;
            
            storyModule.cases.forEach(function(caseStudy) {
                if(emp.scores && emp.scores[caseStudy.id] !== undefined) {
                    userCompletedStoryCases++;
                }
                userStoryCases++;
            });
            
            storyStats.total += userStoryCases;
            storyStats.completed += userCompletedStoryCases;
        });
    }

    // Atualiza dados dos colaboradores
    for (var i = 0; i < employees.length; i++) {
        var emp = employees[i];
        try {
            var userSnapshot = await database.ref('users/' + emp.id).once('value');
            if(userSnapshot.exists()) {
                var user = userSnapshot.val();
                emp.xp = user.xp || 0;
                
                // Conta módulos básicos concluídos
                var completedBasic = Object.keys(user.scores || {}).filter(function(k) {
                    return k.startsWith('mod') && !k.startsWith('prem');
                }).length;
                
                emp.completed = completedBasic;
                emp.badges = (user.badges || []).length;
                emp.simulations = user.simScore || 0;
                emp.startDate = user.startDate;
                emp.completionDate = user.completionDate;
                
                // Calcula dias para completar
                if(emp.startDate && emp.completionDate) {
                    var start = new Date(emp.startDate);
                    var end = new Date(emp.completionDate);
                    emp.daysToComplete = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                }
                
                // Calcula média de scores
                var totalScore = 0;
                for(var modId in user.scores) {
                    if(modId.startsWith('mod') && !modId.startsWith('prem')) {
                        totalScore += user.scores[modId] || 0;
                    }
                }
                emp.averageScore = completedBasic > 0 ? (totalScore / completedBasic).toFixed(1) : 0;
                
                // Verifica se é premium
                var hasPremium = false;
                if(completedBasic === TOTAL_MODULES) {
                    var avg = (totalScore / completedBasic);
                    hasPremium = avg >= 4;
                }
                emp.isPremium = hasPremium;
                
                // Status
                if(completedBasic === TOTAL_MODULES) {
                    emp.status = 'completed';
                } else if(completedBasic > 0) {
                    emp.status = 'in-progress';
                } else {
                    emp.status = 'not-started';
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', emp.email, error);
        }
    }
    
    var completed = employees.filter(function(e) { return e.completed === TOTAL_MODULES; }).length;
    var inProgress = employees.filter(function(e) { return e.completed > 0 && e.completed < TOTAL_MODULES; }).length;
    var notStarted = employees.filter(function(e) { return !e.completed || e.completed === 0; }).length;
    var premiumUsers = employees.filter(function(e) { return e.isPremium; }).length;
    
    document.getElementById('metricTotalUsers').textContent = total;
    document.getElementById('metricCompleted').textContent = completed;
    document.getElementById('metricInProgress').textContent = inProgress;
    document.getElementById('metricNotStarted').textContent = notStarted;
    document.getElementById('metricPremiumUsers').textContent = premiumUsers;
    
    var completedPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    var progressPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;
    var notStartedPct = total > 0 ? Math.round((notStarted / total) * 100) : 0;
    var premiumPct = total > 0 ? Math.round((premiumUsers / total) * 100) : 0;
    
    document.getElementById('metricCompletedPct').textContent = completedPct + '%';
    document.getElementById('metricProgressPct').textContent = progressPct + '%';
    document.getElementById('metricNotStartedPct').textContent = notStartedPct + '%';
    document.getElementById('metricPremiumPct').textContent = premiumPct + '%';
    
    document.getElementById('metricCompletionRate').textContent = completedPct + '%';
    document.getElementById('metricCompletionBar').style.width = completedPct + '%';
    
    var totalXP = employees.reduce(function(sum, e) { return sum + (e.xp || 0); }, 0);
    var avgXP = total > 0 ? Math.round(totalXP / total) : 0;
    document.getElementById('metricAvgXP').textContent = avgXP;
    
    var totalBadges = employees.reduce(function(sum, e) { return sum + (e.badges || 0); }, 0);
    document.getElementById('metricTotalBadges').textContent = totalBadges;
    
    var totalSims = employees.reduce(function(sum, e) { return sum + (e.simulations || 0); }, 0);
    var avgSims = total > 0 ? (totalSims / total).toFixed(1) : 0;
    document.getElementById('metricTotalSims').textContent = totalSims;
    document.getElementById('metricSimsAvg').textContent = avgSims + ' por user';
    
    // Calcula dias médios para conclusão
    var completedUsers = employees.filter(function(e) { return e.daysToComplete; });
    var avgDays = completedUsers.length > 0 ? 
        Math.round(completedUsers.reduce(function(sum, e) { return sum + e.daysToComplete; }, 0) / completedUsers.length) : 0;
    document.getElementById('metricAvgDays').textContent = avgDays;
    
    // Calcula taxa de aprovação (média >= 4)
    var usersWithScores = employees.filter(function(e) { return e.averageScore > 0; });
    var passRate = usersWithScores.length > 0 ? 
        Math.round((usersWithScores.filter(function(e) { return e.averageScore >= 4; }).length / usersWithScores.length) * 100) : 0;
    document.getElementById('metricPassRate').textContent = passRate + '%';
    
    // Atividade recente (últimos 7 dias)
    var sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    var activeUsers = employees.filter(function(e) {
        if(!e.lastActive) return false;
        return new Date(e.lastActive) >= sevenDaysAgo;
    }).length;
    document.getElementById('metricActive7d').textContent = activeUsers;
    
    var thisMonth = new Date().getMonth();
    var newUsers = employees.filter(function(e) {
        if(!e.joined) return false;
        return new Date(e.joined).getMonth() === thisMonth;
    }).length;
    document.getElementById('metricUsersTrend').textContent = '+' + newUsers + ' este mês';
    
    renderModuleStats(employees);
    renderAdminTimeline(employees);
    renderAdminRanking(employees);
    renderEmployeeList(employees);
    renderDetailedStats(employees);
    
    var inviteUrl = window.location.origin + window.location.pathname + '?company=' + COMPANY.code;
    document.getElementById('inviteLink').textContent = inviteUrl;
}

function renderStoryModule() {
    if(!CURRENT_MODULE || !CURRENT_MODULE.stories) return;
    
    var html = '<button onclick="goToMods()" style="background:#64748b;margin-bottom:1rem">← Voltar aos Módulos</button>';
    html += '<h2>' + CURRENT_MODULE.title;
    html += ' <span style="background:#8b5cf6;color:white;padding:0.25rem 0.75rem;border-radius:20px;font-size:0.85rem">📖 Storytelling</span>';
    html += '</h2>';
    html += '<p style="color:#64748b;margin-bottom:2rem">' + CURRENT_MODULE.desc + '</p>';
    
    // Indicador de progresso
    var completedStories = CURRENT_MODULE.cases.filter(function(c) {
        return USER.scores[c.id] !== undefined;
    }).length;
    
    html += '<div style="background:#f0fdf4;padding:1rem;border-radius:8px;margin-bottom:2rem;text-align:center">';
    html += '<p><strong>Progresso:</strong> ' + completedStories + '/' + CURRENT_MODULE.cases.length + ' casos completados</p>';
    html += '<div class="progress-bar" style="height:10px;margin:0.5rem 0">';
    html += '<div class="progress-fill" style="width:' + ((completedStories / CURRENT_MODULE.cases.length) * 100) + '%"></div>';
    html += '</div>';
    html += '</div>';
    
    // Lista de casos
    CURRENT_MODULE.cases.forEach(function(caseStudy, index) {
        var isCompleted = USER.scores[caseStudy.id] !== undefined;
        var score = USER.scores[caseStudy.id] || 0;
        
        html += '<div class="module ' + (isCompleted ? 'completed' : '') + '" style="margin-bottom:2rem;cursor:pointer" onclick="openStoryCase(' + index + ')">';
        html += '<h3>📋 Caso ' + (index + 1) + ': ' + caseStudy.title + '</h3>';
        html += '<p style="color:#64748b;margin:0.5rem 0"><strong>Empresa:</strong> ' + caseStudy.company + '</p>';
        html += '<p style="color:#64748b;margin:0.5rem 0">' + caseStudy.scenario.substring(0, 150) + '...</p>';
        
        if(isCompleted) {
            html += '<p style="color:#10b981;font-weight:700;margin-top:0.5rem">✓ Completado: ' + score + '/1</p>';
        } else {
            html += '<p style="color:#64748b;font-size:0.9rem;margin-top:0.5rem">▶ Clique para estudar este caso</p>';
        }
        
        html += '</div>';
    });
    
    document.getElementById('quizContent').innerHTML = html;
    showPage('quizPage');
}

function openStoryCase(caseIndex) {
    if(!CURRENT_MODULE || !CURRENT_MODULE.cases || !CURRENT_MODULE.cases[caseIndex]) return;
    
    var caseStudy = CURRENT_MODULE.cases[caseIndex];
    var isCompleted = USER.scores[caseStudy.id] !== undefined;
    
    var html = '<button onclick="renderStoryModule()" style="background:#64748b;margin-bottom:1rem">← Voltar aos Casos</button>';
    html += '<div class="module" style="border-left-color:#8b5cf6">';
    html += '<h2>📖 ' + caseStudy.title + '</h2>';
    html += '<p style="color:#64748b;margin-bottom:1rem"><strong>Empresa:</strong> ' + caseStudy.company + '</p>';
    
    // Cenário
    html += '<div style="background:#f8fafc;padding:1.5rem;border-radius:8px;margin:1rem 0">';
    html += '<h4 style="color:#3b82f6;margin-bottom:0.5rem">🎭 O CENÁRIO</h4>';
    html += '<p style="white-space:pre-wrap;line-height:1.6">' + caseStudy.scenario + '</p>';
    html += '</div>';
    
    // O que aconteceu
    html += '<div style="background:#fef2f2;padding:1.5rem;border-radius:8px;margin:1rem 0">';
    html += '<h4 style="color:#ef4444;margin-bottom:0.5rem">💥 O QUE ACONTECEU NA REALIDADE</h4>';
    html += '<p style="white-space:pre-wrap;line-height:1.6">' + caseStudy.whatHappened + '</p>';
    html += '</div>';
    
    // Bandeiras vermelhas
    html += '<div style="background:#fffbeb;padding:1.5rem;border-radius:8px;margin:1rem 0">';
    html += '<h4 style="color:#d97706;margin-bottom:0.5rem">🚩 BANDEIRAS VERMELHAS QUE FORAM IGNORADAS</h4>';
    html += '<ul style="margin-left:1.5rem;line-height:1.8">';
    caseStudy.redFlags.forEach(function(flag) {
        html += '<li>' + flag + '</li>';
    });
    html += '</ul>';
    html += '</div>';
    
    // Medidas de prevenção
    html += '<div style="background:#f0fdf4;padding:1.5rem;border-radius:8px;margin:1rem 0">';
    html += '<h4 style="color:#10b981;margin-bottom:0.5rem">🛡️ COMO PODERIA TER SIDO PREVENIDO</h4>';
    html += '<ul style="margin-left:1.5rem;line-height:1.8">';
    caseStudy.prevention.forEach(function(prevent) {
        html += '<li>' + prevent + '</li>';
    });
    html += '</ul>';
    html += '</div>';
    
    // Fonte
    html += '<div style="background:#f1f5f9;padding:1rem;border-radius:6px;margin:1rem 0;text-align:center">';
    html += '<p style="color:#64748b;font-size:0.9rem"><strong>Fonte:</strong> ' + caseStudy.source + '</p>';
    html += '</div>';
    
    // Quiz se não completou
    if(!isCompleted) {
        html += '<div style="background:#e0e7ff;padding:1.5rem;border-radius:8px;margin:2rem 0">';
        html += '<h4 style="color:#4f46e5;margin-bottom:1rem">🧠 TESTE SEU APRENDIZADO</h4>';
        html += '<p style="margin-bottom:1rem"><strong>' + caseStudy.question + '</strong></p>';
        
        caseStudy.opts.forEach(function(opt, j) {
            html += '<label style="display:block;margin:0.5rem 0;padding:0.75rem;background:#fff;border-radius:6px;cursor:pointer;transition:background 0.3s">';
            html += '<input type="radio" name="storyCase" value="' + j + '"> ' + opt + '</label>';
        });
        
        html += '<div style="text-align:center;margin-top:1.5rem">';
        html += '<button onclick="submitStoryCase(' + caseIndex + ')">✓ Verificar Resposta</button>';
        html += '</div>';
        html += '</div>';
    } else {
        html += '<div style="background:#d1fae5;padding:1.5rem;border-radius:8px;margin:2rem 0;text-align:center">';
        html += '<h4 style="color:#065f46">✅ CASO JÁ ESTUDADO</h4>';
        html += '<p style="color:#047857;margin-top:0.5rem">Você já completou este caso com sucesso!</p>';
        html += '<button onclick="renderStoryModule()" style="margin-top:1rem">← Voltar aos Casos</button>';
        html += '</div>';
    }
    
    html += '</div>'; // Fecha div.module
    
    document.getElementById('quizContent').innerHTML = html;
}

async function submitStoryCase(caseIndex) {
    if(!CURRENT_MODULE || !CURRENT_MODULE.cases || !CURRENT_MODULE.cases[caseIndex]) return;
    
    var caseStudy = CURRENT_MODULE.cases[caseIndex];
    var selected = document.querySelector('input[name="storyCase"]:checked');
    
    if(!selected) {
        alert('Por favor selecione uma resposta');
        return;
    }
    
    var correct = (parseInt(selected.value) === caseStudy.correct);
    var xpEarned = 70; // XP por caso estudado
    
    if(correct) {
        USER.scores[caseStudy.id] = 1; // Marca como completado com pontuação 1
        USER.xp += xpEarned;
        
        showXP('✅ Correto! +' + xpEarned + ' XP');
        confetti();
        
        // Mostra feedback
        var resultHtml = '<div style="background:#d1fae5;padding:1.5rem;border-radius:8px;margin-top:1rem;text-align:center">';
        resultHtml += '<h4 style="color:#065f46">🎉 Excelente!</h4>';
        resultHtml += '<p style="color:#047857;margin-top:0.5rem">Você identificou a melhor solução para prevenir este tipo de ataque.</p>';
        resultHtml += '<button onclick="openStoryCase(' + caseIndex + ')" style="margin-top:1rem">↻ Rever Este Caso</button>';
        resultHtml += '<button onclick="renderStoryModule()" style="background:#3b82f6;margin-top:1rem;margin-left:0.5rem">📋 Ver Todos os Casos</button>';
        resultHtml += '</div>';
        
        // Substitui a seção do quiz
        var quizSection = document.querySelector('[style*="background:#e0e7ff"]');
        if(quizSection) {
            quizSection.innerHTML = resultHtml;
        }
        
        await saveDataToFirebase();
        checkBadges();
    } else {
        var resultHtml = '<div style="background:#fef2f2;padding:1.5rem;border-radius:8px;margin-top:1rem;text-align:center">';
        resultHtml += '<h4 style="color:#991b1b">📚 Continue Estudando</h4>';
        resultHtml += '<p style="color:#b91c1c;margin-top:0.5rem">A resposta correta era: <strong>' + caseStudy.opts[caseStudy.correct] + '</strong></p>';
        resultHtml += '<button onclick="openStoryCase(' + caseIndex + ')" style="background:#ef4444;margin-top:1rem">↻ Tentar Novamente</button>';
        resultHtml += '</div>';
        
        var quizSection = document.querySelector('[style*="background:#e0e7ff"]');
        if(quizSection) {
            quizSection.innerHTML = resultHtml;
        }
    }
}

async function loadCompanyData(code) {
    try {
        var companySnapshot = await database.ref('companies/' + code).once('value');
        
        if(companySnapshot.exists()) {
            COMPANY = companySnapshot.val();
            
            if(!COMPANY.employees) {
                COMPANY.employees = [];
            }
            
            if(!COMPANY.employees.find(function(e) { return e.email === USER.email; })) {
                COMPANY.employees.push({
                    id: USER.id,
                    name: USER.name,
                    email: USER.email,
                    joined: new Date().toISOString()
                });
                
                await database.ref('companies/' + COMPANY.code).set(COMPANY);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar empresa:', error);
    }
}

async function loadCompanyEmployees() {
    if(!USER.companyCode) return;
    
    try {
        var companySnapshot = await database.ref('companies/' + USER.companyCode).once('value');
        
        if(companySnapshot.exists()) {
            COMPANY = companySnapshot.val();
            
            if(!COMPANY.employees) {
                COMPANY.employees = [];
            }
        }
    } catch (error) {
        console.error('Erro ao carregar colaboradores:', error);
    }
}

// ==================== FUNÇÕES PARA GERADOR DE CHAVES ====================

async function generateNewKey() {
    var type = document.getElementById('keyType').value;
    var maxUses = parseInt(document.getElementById('keyUses').value) || 1;
    var daysValid = parseInt(document.getElementById('keyDays').value) || 30;
    
    var result = await generateActivationKey(type, maxUses, daysValid);
    
    if (result && result.key) {
        var resultDiv = document.getElementById('newKeyResult');
        var expirationDate = new Date(result.data.expirationDate);
        var formattedDate = expirationDate.toLocaleDateString('pt-PT') + ' ' + expirationDate.toLocaleTimeString('pt-PT');
        
        resultDiv.innerHTML = '<div style="background:#d1fae5;padding:1.5rem;border-radius:12px;margin-top:1rem;border:2px solid #10b981">';
        resultDiv.innerHTML += '<h4 style="color:#065f46;margin-bottom:1rem">✅ Nova Chave Gerada!</h4>';
        resultDiv.innerHTML += '<p style="font-family:monospace;background:#fff;padding:1rem;border-radius:8px;margin:0.5rem 0;font-size:1.1rem;font-weight:bold;border:2px dashed #10b981">' + result.key + '</p>';
        resultDiv.innerHTML += '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:1rem;margin-top:1rem">';
        resultDiv.innerHTML += '<div style="background:#fff;padding:0.8rem;border-radius:6px"><strong>🔤 Tipo:</strong> ' + type + '</div>';
        resultDiv.innerHTML += '<div style="background:#fff;padding:0.8rem;border-radius:6px"><strong>👥 Utilizações:</strong> ' + maxUses + '</div>';
        resultDiv.innerHTML += '<div style="background:#fff;padding:0.8rem;border-radius:6px"><strong>📅 Validade:</strong> ' + daysValid + ' dias</div>';
        resultDiv.innerHTML += '<div style="background:#fff;padding:0.8rem;border-radius:6px"><strong>⏰ Expira em:</strong> ' + formattedDate + '</div>';
        resultDiv.innerHTML += '</div>';
        resultDiv.innerHTML += '<button onclick="copyToClipboard(\'' + result.key + '\')" style="background:#3b82f6;margin-top:1rem">📋 Copiar Chave</button>';
        resultDiv.innerHTML += '</div>';
        
        showXP('✅ Chave gerada com sucesso!');
    } else {
        alert('❌ Erro ao gerar chave!');
    }
}

async function viewAllKeys() {
    try {
        var keysSnapshot = await database.ref('activationKeys').once('value');
        var keys = keysSnapshot.val();
        
        var html = '<div style="max-height:400px;overflow-y:auto">';
        html += '<h4 style="margin-bottom:1rem">🗝️ Chaves Existentes</h4>';
        
        if (!keys) {
            html += '<p style="text-align:center;color:#64748b;padding:2rem">Nenhuma chave gerada</p>';
        } else {
            html += '<table style="width:100%;border-collapse:collapse">';
            html += '<thead><tr><th>Chave</th><th>Tipo</th><th>Utilizações</th><th>Validade</th><th>Estado</th></tr></thead>';
            html += '<tbody>';
            
            for (var key in keys) {
                var keyData = keys[key];
                var expirationDate = keyData.expirationDate ? new Date(keyData.expirationDate) : null;
                var now = new Date();
                var expired = expirationDate && now > expirationDate;
                var usedUp = keyData.usedCount >= keyData.maxUses;
                
                html += '<tr style="border-bottom:1px solid #e2e8f0">';
                html += '<td style="padding:0.5rem"><code style="font-size:0.8rem">' + key + '</code></td>';
                html += '<td style="padding:0.5rem">' + keyData.type + '</td>';
                html += '<td style="padding:0.5rem">' + (keyData.usedCount || 0) + '/' + keyData.maxUses + '</td>';
                html += '<td style="padding:0.5rem">' + (expirationDate ? expirationDate.toLocaleDateString('pt-PT') : '∞') + '</td>';
                html += '<td style="padding:0.5rem">';
                
                if (!keyData.valid || expired) {
                    html += '<span style="color:#ef4444">❌ Inválida</span>';
                } else if (usedUp) {
                    html += '<span style="color:#f59e0b">⚠️ Esgotada</span>';
                } else {
                    html += '<span style="color:#10b981">✅ Ativa</span>';
                }
                
                html += '</td>';
                html += '</tr>';
            }
            
            html += '</tbody></table>';
        }
        
        html += '</div>';
        
        // Mostrar em um popup
        var popup = document.createElement('div');
        popup.className = 'welcome-popup';
        popup.innerHTML = html + '<div style="text-align:center;margin-top:1rem"><button onclick="this.parentElement.remove()">Fechar</button></div>';
        document.body.appendChild(popup);
        
    } catch (error) {
        console.error('Erro ao listar chaves:', error);
        alert('Erro ao carregar chaves: ' + error.message);
    }
}
// ==================== FUNÇÕES UTILITÁRIAS ====================

async function checkBadges() {
    var unlocked = false;
    
    BADGES.forEach(function(badge) {
        if(!USER.badges.includes(badge.id) && badge.check()) {
            USER.badges.push(badge.id);
            unlocked = true;
            showBadgeUnlock(badge);
        }
    });
    
    if(unlocked) {
        await saveDataToFirebase();
    }
}

function showBadgeUnlock(badge) {
    setTimeout(function() {
        var div = document.createElement('div');
        div.className = 'xp-popup';
        div.style.background = badge.id.startsWith('prem') ? 
            'linear-gradient(135deg,#8b5cf6,#7c3aed)' : 
            'linear-gradient(135deg,#10b981,#059669)';
        div.innerHTML = '<div style="font-size:2rem">' + badge.name.split(' ')[0] + '</div><div>Badge Desbloqueado!</div><div style="font-size:.9rem;margin-top:.3rem">' + badge.name + '</div>';
        document.body.appendChild(div);
        confetti();
        setTimeout(function() { div.remove(); }, 2500);
    }, 500);
}

function showXP(msg) {
    var div = document.createElement('div');
    div.className = 'xp-popup';
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(function() { div.remove(); }, 2000);
}

function confetti() {
    var colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    for(var i = 0; i < 40; i++) {
        (function(index) {
            setTimeout(function() {
                var c = document.createElement('div');
                c.className = 'confetti';
                c.style.left = Math.random() * 100 + '%';
                c.style.top = '-10px';
                c.style.background = colors[Math.floor(Math.random() * colors.length)];
                document.body.appendChild(c);
                setTimeout(function() { c.remove(); }, 3000);
            }, index * 30);
        })(i);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showXP('✅ Chave copiada!');
    }).catch(function() {
        alert('Chave: ' + text);
    });
}

function copyInviteLink() {
    var inviteUrl = window.location.origin + window.location.pathname + '?company=' + COMPANY.code;
    
    navigator.clipboard.writeText(inviteUrl).then(function() {
        showXP('✓ Link copiado!');
    }).catch(function() {
        alert('Link: ' + inviteUrl);
    });
}

function showWelcomePopup() {
    document.getElementById('welcomeOverlay').classList.remove('hidden');
    document.getElementById('welcomePopup').classList.remove('hidden');
    
    // Adicionar animação de confetti
    setTimeout(function() {
        confetti();
    }, 500);
}

function closeWelcomePopup() {
    document.getElementById('welcomeOverlay').classList.add('hidden');
    document.getElementById('welcomePopup').classList.add('hidden');
}

function goToLibraryFirst() {
    closeWelcomePopup();
    setTimeout(function() {
        goToLibrary();
        showXP('📖 Boa escolha! Estuda primeiro, testa depois!');
    }, 300);
}

function goToDashboardFromWelcome() {
    closeWelcomePopup();
    setTimeout(function() {
        goToDash();
        showXP('🎉 Vamos começar! Verifica teu progresso no dashboard!');
    }, 300);
}

function showHelp() {
    showWelcomePopup();
}

// ==================== FUNÇÕES AUXILIARES DO ADMIN ====================

function renderModuleStats(employees) {
    var html = '';
    
    if(employees.length === 0) {
        html = '<p style="text-align:center;color:#64748b;padding:2rem">Sem dados disponíveis</p>';
    } else {
        MODULES.forEach(function(mod) {
            var completed = employees.filter(function(e) {
                return e.completed >= parseInt(mod.id.replace('mod', ''));
            }).length;
            
            var pct = Math.round((completed / employees.length) * 100);
            
            html += '<div class="chart-bar">';
            html += '<div class="chart-fill" style="width:' + pct + '%">' + pct + '%</div>';
            html += '</div>';
            html += '<p style="margin-bottom:1rem">' + mod.title + ' - ' + completed + '/' + employees.length + ' colaboradores</p>';
        });
    }
    
    document.getElementById('adminModuleStats').innerHTML = html;
}

function renderAdminTimeline(employees) {
    var html = '';
    
    // Ordena por data de início
    var sortedEmployees = employees.slice().sort(function(a, b) {
        return new Date(b.joined || b.startDate) - new Date(a.joined || a.startDate);
    }).slice(0, 10); // Mostra apenas os 10 mais recentes
    
    if(sortedEmployees.length === 0) {
        html = '<p style="text-align:center;color:#64748b;padding:2rem">Sem dados disponíveis</p>';
    } else {
        sortedEmployees.forEach(function(emp) {
            var startDate = emp.startDate ? new Date(emp.startDate).toLocaleDateString('pt-PT') : 'N/A';
            var completionDate = emp.completionDate ? new Date(emp.completionDate).toLocaleDateString('pt-PT') : 'Em progresso';
            var statusClass = 'status-' + emp.status;
            
            html += '<div class="timeline-item">';
            html += '<div class="timeline-date">' + startDate + '</div>';
            html += '<div class="timeline-content">';
            html += '<strong>' + emp.name + '</strong>';
            html += '<div style="margin-top:0.5rem">';
            html += '<span class="status-badge ' + statusClass + '">' + 
                (emp.status === 'completed' ? '✅ Concluído' : 
                 emp.status === 'in-progress' ? '⏳ Em progresso' : '❌ Não iniciado') + 
                '</span>';
            if(emp.isPremium) {
                html += ' <span class="status-badge status-premium">⭐ Premium</span>';
            }
            html += '</div>';
            html += '<div style="font-size:0.9rem;color:#64748b;margin-top:0.5rem">';
            html += 'Conclusão: ' + completionDate;
            if(emp.daysToComplete) {
                html += ' | ' + emp.daysToComplete + ' dias';
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
    }
    
    document.getElementById('adminTimeline').innerHTML = html;
}

function renderAdminRanking(employees) {
    employees.sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
    
    var html = '';
    
    if(employees.length === 0) {
        html = '<p style="text-align:center;color:#64748b;padding:2rem">Nenhum colaborador registado</p>';
    } else {
        employees.forEach(function(emp, idx) {
            var medal = '';
            var className = 'leaderboard-item';
            
            if(idx === 0) {
                medal = '🥇';
                className += ' gold';
            } else if(idx === 1) {
                medal = '🥈';
                className += ' silver';
            } else if(idx === 2) {
                medal = '🥉';
                className += ' bronze';
            } else {
                medal = '#' + (idx + 1);
            }
            
            html += '<div class="' + className + '">';
            html += '<div>';
            html += '<div style="font-weight:700">' + medal + ' ' + emp.name + '</div>';
            html += '<div style="font-size:0.9rem;color:#64748b">' + (emp.completed || 0) + '/' + TOTAL_MODULES + ' módulos | ' + (emp.badges || 0) + ' badges</div>';
            if(emp.isPremium) {
                html += '<span style="font-size:0.8rem;color:#8b5cf6;font-weight:600">⭐ Premium</span>';
            }
            html += '</div>';
            html += '<div style="text-align:right">';
            html += '<div style="font-size:1.5rem;font-weight:900;color:#3b82f6">' + (emp.xp || 0) + '</div>';
            html += '<div style="font-size:0.8rem;color:#64748b">XP</div>';
            html += '</div>';
            html += '</div>';
        });
    }
    
    document.getElementById('adminRanking').innerHTML = html;
}

function renderEmployeeList(employees) {
    var html = '';
    
    if(employees.length === 0) {
        html = '<p style="text-align:center;color:#64748b;padding:2rem">Nenhum colaborador registado</p>';
    } else {
        employees.forEach(function(emp) {
            var className = 'employee-row';
            if(emp.status === 'completed') {
                className += ' completed';
            }
            if(emp.isPremium) {
                className += ' premium';
            }
            
            html += '<div class="' + className + '" data-name="' + emp.name.toLowerCase() + '">';
            html += '<div>';
            html += '<div style="font-weight:700">' + emp.name + '</div>';
            html += '<div style="font-size:0.9rem;color:#64748b">' + emp.email + '</div>';
            html += '</div>';
            html += '<div style="text-align:right">';
            html += '<div style="font-size:0.9rem">' + (emp.completed || 0) + '/' + TOTAL_MODULES + ' módulos</div>';
            html += '<div style="font-size:0.9rem;color:#64748b">' + (emp.xp || 0) + ' XP | ' + (emp.simulations || 0) + ' sims</div>';
            html += '</div>';
            html += '</div>';
        });
    }
    
    document.getElementById('adminEmployees').innerHTML = html;
}

function renderDetailedStats(employees) {
    var html = '';
    
    if(employees.length === 0) {
        html = '<tr><td colspan="7" style="text-align:center;color:#64748b;padding:2rem">Nenhum colaborador registado</td></tr>';
    } else {
        employees.forEach(function(emp) {
            var startDate = emp.startDate ? new Date(emp.startDate).toLocaleDateString('pt-PT') : 'N/A';
            var completionDate = emp.completionDate ? new Date(emp.completionDate).toLocaleDateString('pt-PT') : '-';
            var duration = emp.daysToComplete ? emp.daysToComplete + ' dias' : '-';
            var avgScore = emp.averageScore > 0 ? emp.averageScore + '/5' : '-';
            
            var statusText = emp.status === 'completed' ? '✅ Concluído' : 
                             emp.status === 'in-progress' ? '⏳ Em progresso' : '❌ Não iniciado';
            var statusClass = emp.status === 'completed' ? 'status-completed' : 
                              emp.status === 'in-progress' ? 'status-in-progress' : 'status-not-started';
            
            html += '<tr>';
            html += '<td><strong>' + emp.name + '</strong><br><small style="color:#64748b">' + emp.email + '</small></td>';
            html += '<td><span class="status-badge ' + statusClass + '">' + statusText + '</span></td>';
            html += '<td>' + startDate + '</td>';
            html += '<td>' + completionDate + '</td>';
            html += '<td>' + duration + '</td>';
            html += '<td>' + avgScore + '</td>';
            html += '<td>' + (emp.isPremium ? '⭐ Sim' : '❌ Não') + '</td>';
            html += '</tr>';
        });
    }
    
    document.getElementById('adminDetailedStats').innerHTML = html;
}

function filterEmployees(term) {
    var search = term.toLowerCase();
    var rows = document.querySelectorAll('.employee-row');
    
    rows.forEach(function(row) {
        var name = row.getAttribute('data-name');
        row.style.display = name.includes(search) ? 'flex' : 'none';
    });
}

// ==================== INICIALIZAÇÃO ====================
document.getElementById('adminEmail')?.addEventListener('blur', function() {
    var email = this.value.trim();
    if(email && document.getElementById('adminLogin').style.display !== 'none') {
        checkAdminExists(email);
    }
});
window.onload = function() {
    window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('company');
    
    if(code) {
        document.getElementById('companyCode').value = code.toUpperCase();
        showLoginType('user');
    }
    
    // Tentar carregar último email usado
    var lastEmail = localStorage.getItem('last_user_email');
    if(lastEmail) {
        document.getElementById('userEmail').value = lastEmail;
    }
    
    console.log('✅ Academia Anti-Phishing Elite | Mareginter - Sistema Completo com Chaves de Ativação 🔑');
};
    var urlParams = new URLSearchParams(window.location.search);
    var code = urlParams.get('company');
    
    if(code) {
        document.getElementById('companyCode').value = code.toUpperCase();
        showLoginType('user');
    }
    
    console.log('✅ Academia Anti-Phishing Elite | Mareginter - Sistema Completo com Chaves de Ativação 🔑');
    console.log('🔑 Chaves de teste disponíveis: TEST-1234, BASIC-2024-DEF456, PREMIUM-XYZ789, ELITE-2024-ABC123');
};
