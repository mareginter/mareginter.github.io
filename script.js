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
  hasSeenWelcome: false
};

var COMPANY = {
  code: '',
  name: '',
  adminEmail: '',
  adminName: '',
  employees: []
};

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
      {q:'O que fazer ao receber email suspeito?',opts:['Clicar em todos os links','Encaminhar para amigos','Reportar ao TI','Responder com dados pessoais'],correct:2},
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

// MÓDULOS PREMIUM (só para quem completou os 5 módulos com 4/5 ou mais)
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
      {q:'PGP/GPG são usados para:',opts:['Encriptação de emails','Jogos','Compressão','Anti-spam'],correct:0}
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
  {id:'prem3',name:'🛡️ Incident Commander',desc:'Completou módulo Resposta a Incidentes',check:function(){return USER.scores['prem3'] !== undefined}}
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
  },
  {
    id: 'lib5',
    title: '🔒 Proteção Contra Ransomware',
    category: 'Ameaças Avançadas',
    content: `
      <h4>O Que é Ransomware?</h4>
      <p>Malware que <strong>encripta seus ficheiros</strong> e exige pagamento (resgate) para desbloquear.</p>
      
      <h4 style="margin-top:1.5rem">Como se Proteger</h4>
      <p><strong>1. Backups Regulares</strong></p>
      <p>• Backup automático diário</p>
      <p>• Guardar cópias offline (disco externo desconectado)</p>
      <p>• Testar restauração periodicamente</p>
      <p>• Regra 3-2-1: 3 cópias, 2 meios diferentes, 1 offsite</p>
      
      <p style="margin-top:1rem"><strong>2. Software Atualizado</strong></p>
      <p>• Sistema operativo sempre atualizado</p>
      <p>• Antivírus com proteção anti-ransomware</p>
      <p>• Patches de segurança instalados</p>
      
      <p style="margin-top:1rem"><strong>3. Comportamento Seguro</strong></p>
      <p>• Não abrir anexos de emails desconhecidos</p>
      <p>• Desconfiar de links suspeitos</p>
      <p>• Não executar ficheiros .exe duvidosos</p>
      
      <h4 style="margin-top:1.5rem">Se For Vítima</h4>
      <p>🚨 <strong>PASSOS IMEDIATOS:</strong></p>
      <p>1. Desconectar da rede IMEDIATAMENTE</p>
      <p>2. NÃO desligar o computador</p>
      <p>3. Contactar TI/Segurança urgentemente</p>
      <p>4. NÃO pagar o resgate (não garante recuperação)</p>
      <p>5. Reportar às autoridades</p>
    `
  },
  {
    id: 'lib6',
    title: '☁️ Segurança na Cloud',
    category: 'Cloud Computing',
    content: `
      <h4>Boas Práticas em Serviços Cloud</h4>
      
      <p><strong>1. Controlo de Acesso</strong></p>
      <p>• Autenticação forte (MFA obrigatório)</p>
      <p>• Princípio do menor privilégio</p>
      <p>• Rever permissões regularmente</p>
      <p>• Remover acessos de ex-colaboradores</p>
      
      <p style="margin-top:1rem"><strong>2. Partilha de Ficheiros</strong></p>
      <p>✅ Links com expiração definida</p>
      <p>✅ Proteção por senha para dados sensíveis</p>
      <p>✅ Partilha apenas com pessoas específicas</p>
      <p>❌ Evitar links públicos permanentes</p>
      
      <p style="margin-top:1rem"><strong>3. Sincronização</strong></p>
      <p>• Verificar quais pastas sincronizam</p>
      <p>• Não sincronizar dados altamente sensíveis</p>
      <p>• Atenção a versões de ficheiros</p>
      <p>• Usar encriptação adicional quando necessário</p>
    `
  },
  {
    id: 'lib7',
    title: '🚀 Engenharia Social: Técnicas e Defesas',
    category: 'Ameaças Avançadas',
    content: `
      <h4>O Que é Engenharia Social?</h4>
      <p>Manipulação psicológica para obter acesso a informações confidenciais.</p>
      
      <h4 style="margin-top:1.5rem">Técnicas Comuns</h4>
      <p><strong>📞 Vishing (Voice Phishing):</strong></p>
      <p>• Chamadas falsas fingindo ser suporte técnico ou autoridade</p>
      <p>• Pedem credenciais ou ações imediatas</p>
      
      <p><strong>🎭 Pretexting:</strong></p>
      <p>• Criar cenário falso para ganhar confiança</p>
      <p>• Ex: "Sou do departamento de TI, preciso do seu login"</p>
      
      <p><strong>👥 Tailgating:</strong></p>
      <p>• Seguir alguém para aceder área física restrita</p>
      <p>• "Esqueci-me do cartão, pode segurar a porta?"</p>
      
      <p><strong>🔄 Quid Pro Quo:</strong></p>
      <p>• Oferecer algo em troca de informação</p>
      <p>• "Dou-lhe um prémio se me der os seus dados"</p>
      
      <h4 style="margin-top:1.5rem">Como se Defender</h4>
      <p>✅ <strong>Verifique sempre a identidade</strong> - Ligue para o número oficial</p>
      <p>✅ <strong>Nunca dê informações por telefone</strong> a quem liga para si</p>
      <p>✅ <strong>Política de "nunca abrir portas"</strong> a desconhecidos</p>
      <p>✅ <strong>Formação regular</strong> em consciencialização</p>
      <p>✅ <strong>Reporte tentativas</strong> ao departamento de segurança</p>
    `
  },
  {
    id: 'lib8',
    title: '🔐 Criptografia para Profissionais',
    category: 'Tecnologia',
    content: `
      <h4>Fundamentos de Criptografia</h4>
      <p><strong>Dois Tipos Principais:</strong></p>
      
      <p><strong>1. Criptografia Simétrica</strong></p>
      <p>• Mesma chave para encriptar e decifrar</p>
      <p>• Exemplos: AES-256, 3DES</p>
      <p>• Rápida, usada para grandes volumes de dados</p>
      
      <p><strong>2. Criptografia Assimétrica</strong></p>
      <p>• Par de chaves: pública (encripta) e privada (decifra)</p>
      <p>• Exemplos: RSA, ECC</p>
      <p>• Usada para SSL/TLS, assinaturas digitais</p>
      
      <h4 style="margin-top:1.5rem">Aplicações Práticas</h4>
      <p><strong>📧 Email Seguro (PGP/GPG):</strong></p>
      <p>• Encriptação end-to-end de emails</p>
      <p>• Assinaturas digitais para autenticidade</p>
      
      <p><strong>🌐 HTTPS/SSL:</strong></p>
      <p>• Protege comunicação entre browser e servidor</p>
      <p>• Verifique sempre o cadeado verde</p>
      
      <p><strong>💾 Encriptação de Disco:</strong></p>
      <p>• BitLocker (Windows), FileVault (macOS)</p>
      <p>• Protege dados se dispositivo for roubado</p>
      
      <p><strong>📱 Mensagens:</strong></p>
      <p>• Signal, WhatsApp (end-to-end)</p>
      <p>• Protege conversas de interceptação</p>
    `
  },
  {
    id: 'lib9',
    title: '🛡️ Resposta a Incidentes de Segurança',
    category: 'Procedimentos',
    content: `
      <h4>Plano de Resposta a Incidentes</h4>
      
      <p><strong>Fase 1: Preparação</strong></p>
      <p>✅ Equipa designada com funções definidas</p>
      <p>✅ Contactos de emergência atualizados</p>
      <p>✅ Ferramentas de análise disponíveis</p>
      <p>✅ Planos de comunicação preparados</p>
      
      <p><strong>Fase 2: Deteção e Análise</strong></p>
      <p>🔍 Monitorizar alertas de segurança</p>
      <p>🔍 Analisar logs e eventos suspeitos</p>
      <p>🔍 Determinar alcance e impacto</p>
      <p>🔍 Classificar severidade (Baixa, Média, Alta, Crítica)</p>
      
      <p><strong>Fase 3: Contenção e Erradicação</strong></p>
      <p>🛡️ Isolar sistemas afetados da rede</p>
      <p>🛡️ Desativar contas comprometidas</p>
      <p>🛡️ Remover malware/backdoors</p>
      <p>🛡️ Reforçar segurança em pontos fracos</p>
      
      <p><strong>Fase 4: Recuperação</strong></p>
      <p>🔄 Restaurar sistemas a partir de backups limpos</p>
      <p>🔄 Verificar que ameaça foi totalmente removida</p>
      <p>🔄 Monitorizar para recorrência</p>
      <p>🔄 Restaurar operações normais gradualmente</p>
      
      <p><strong>Fase 5: Lições Aprendidas</strong></p>
      <p>📝 Documentar cronologia do incidente</p>
      <p>📝 Identificar lacunas no processo</p>
      <p>📝 Melhorar políticas e procedimentos</p>
      <p>📝 Partilhar aprendizagens (sem expor dados sensíveis)</p>
      
      <h4 style="margin-top:1.5rem">Comunicação Durante Incidente</h4>
      <p><strong>Interna:</strong></p>
      <p>• Apenas para pessoas com necessidade de saber</p>
      <p>• Canais seguros (não email comprometido)</p>
      
      <p><strong>Externa:</strong></p>
      <p>• Coordenar com relações públicas/jurídico</p>
      <p>• Transparência controlada</p>
      <p>• Cumprir obrigações legais (RGPD, etc.)</p>
    `
  }
];

var CURRENT_MODULE = null;
var TOTAL_MODULES = 5;
var TOTAL_PREMIUM_MODULES = 3;

// FUNÇÃO PARA VERIFICAR ACESSO PREMIUM
function hasPremiumAccess() {
  // Verifica se completou os 5 módulos básicos com 4/5 ou mais
  var completedBasic = Object.keys(USER.scores).filter(function(k) {
    return k.startsWith('mod') && !k.startsWith('prem');
  }).length;
  
  if (completedBasic < TOTAL_MODULES) return false;
  
  // Verifica se tem média de 4/5 ou mais
  var totalScore = 0;
  var totalQuestions = 0;
  
  for (var modId in USER.scores) {
    if (modId.startsWith('mod') && !modId.startsWith('prem')) {
      totalScore += USER.scores[modId] || 0;
      totalQuestions += 5; // Cada módulo tem 5 questões
    }
  }
  
  var average = (totalScore / totalQuestions) * 5; // Converte para escala 0-5
  return average >= 4;
}

// LOGIN
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
      var savedAdmin = localStorage.getItem('admin_' + email);
      if(!savedAdmin) {
        adminExtraFields.style.display = 'block';
      } else {
        adminExtraFields.style.display = 'none';
      }
    }
  }
}

document.getElementById('adminEmail').addEventListener('blur', function() {
  var email = this.value.trim();
  var adminExtraFields = document.getElementById('adminExtraFields');
  
  if(email && document.getElementById('adminLogin').style.display !== 'none') {
    var savedAdmin = localStorage.getItem('admin_' + email);
    if(!savedAdmin) {
      adminExtraFields.style.display = 'block';
    } else {
      adminExtraFields.style.display = 'none';
    }
  }
});

function doLogin() {
  var name = document.getElementById('userName').value.trim();
  var email = document.getElementById('userEmail').value.trim();
  var code = document.getElementById('companyCode').value.trim().toUpperCase();
  
  if(!name || !email) {
    alert('Preencha nome e email');
    return;
  }
  
  USER.id = 'user_' + Date.now();
  USER.name = name;
  USER.email = email;
  USER.isAdmin = false;
  USER.companyCode = code || 'INDIVIDUAL';
  
  if(code) {
    loadCompanyData(code);
  } else {
    COMPANY.name = 'Formação Individual';
  }
  
  loadUserData();
  
  // Se é primeiro acesso, mostra popup de boas-vindas
  if(!USER.hasSeenWelcome) {
    showWelcomePopup();
    USER.hasSeenWelcome = true;
    saveData();
  }
  
  checkBadges();
  startApp();
}

function doAdminLogin() {
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
  
  var savedAdmin = localStorage.getItem('admin_' + email);
  
  if(savedAdmin) {
    var adminData = JSON.parse(savedAdmin);
    
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
    
    loadCompanyEmployees();
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
    
    localStorage.setItem('admin_' + email, JSON.stringify(adminData));
    localStorage.setItem('company_' + companyCode, JSON.stringify(COMPANY));
    
    startApp();
    alert('✅ Admin criado!\n\nCódigo: ' + companyCode);
  }
  
  saveData();
}

function showWelcomePopup() {
  document.getElementById('welcomeOverlay').classList.remove('hidden');
  document.getElementById('welcomePopup').classList.remove('hidden');
}

function closeWelcomePopup() {
  document.getElementById('welcomeOverlay').classList.add('hidden');
  document.getElementById('welcomePopup').classList.add('hidden');
}

function generateCompanyCode() {
  return 'EMP-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function loadCompanyData(code) {
  var companyData = localStorage.getItem('company_' + code);
  
  if(companyData) {
    COMPANY = JSON.parse(companyData);
    
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
      
      localStorage.setItem('company_' + COMPANY.code, JSON.stringify(COMPANY));
    }
  }
}

function loadUserData() {
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
    
    // Se não tem data de início, define agora
    if(!USER.startDate) {
      USER.startDate = new Date().toISOString();
    }
  } else {
    // Primeiro acesso
    USER.startDate = new Date().toISOString();
  }
}

function saveData() {
  // Verifica se completou todos os módulos básicos
  var completedBasic = Object.keys(USER.scores).filter(function(k) {
    return k.startsWith('mod') && !k.startsWith('prem');
  }).length;
  
  if(completedBasic === TOTAL_MODULES && !USER.completionDate) {
    USER.completionDate = new Date().toISOString();
  }
  
  localStorage.setItem('user_' + USER.email, JSON.stringify(USER));
  
  if(USER.companyCode && USER.companyCode !== 'INDIVIDUAL') {
    var companyData = localStorage.getItem('company_' + USER.companyCode);
    
    if(companyData) {
      var company = JSON.parse(companyData);
      
      if(!company.employees) {
        company.employees = [];
      }
      
      var empIndex = company.employees.findIndex(function(e) { 
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
      
      if(empIndex >= 0) {
        company.employees[empIndex] = {
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
      } else {
        company.employees.push({
          id: USER.id,
          name: USER.name,
          email: USER.email,
          xp: USER.xp,
          completed: 0,
          badges: 0,
          simulations: 0,
          status: userStatus,
          startDate: USER.startDate,
          completionDate: null,
          daysToComplete: null,
          averageScore: 0,
          isPremium: false,
          joined: new Date().toISOString()
        });
      }
      
      localStorage.setItem('company_' + USER.companyCode, JSON.stringify(company));
    }
  }
}

function loadCompanyEmployees() {
  if(!USER.companyCode) return;
  
  var companyData = localStorage.getItem('company_' + USER.companyCode);
  
  if(companyData) {
    COMPANY = JSON.parse(companyData);
    
    if(!COMPANY.employees) {
      COMPANY.employees = [];
    }
  }
}

function checkBadges() {
  var unlocked = false;
  
  BADGES.forEach(function(badge) {
    if(!USER.badges.includes(badge.id) && badge.check()) {
      USER.badges.push(badge.id);
      unlocked = true;
      showBadgeUnlock(badge);
    }
  });
  
  if(unlocked) {
    saveData();
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

// NAVEGAÇÃO
function startApp() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('navbar').style.display = 'flex';
  
  if(USER.isAdmin) {
    document.getElementById('btnDash').style.display = 'none';
    document.getElementById('btnMods').style.display = 'none';
    document.getElementById('btnSim').style.display = 'none';
    document.getElementById('btnBadges').style.display = 'none';
    document.getElementById('btnLib').style.display = 'none';
    document.getElementById('btnCert').style.display = 'none';
    document.getElementById('btnAdmin').style.display = 'none';
    
    goToAdmin();
  } else {
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

function logout() {
  if(!confirm('Sair? Progresso guardado.')) {
    return;
  }
  
  saveData();
  window.location.reload();
}

// DASHBOARD
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

// MÓDULOS
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

function submitQuiz() {
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
  
  saveData();
  checkBadges();
  showXP('+' + xpEarned + ' XP');
  
  if(pct >= 80) {
    confetti();
  }
}

// SIMULADOR
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

function checkEmail(emailId, userSaysPhishing) {
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
  saveData();
  checkBadges();
  
  document.getElementById('simScore').textContent = USER.simScore;
  document.getElementById('simXP').textContent = USER.simXP;
  
  setTimeout(function() {
    if(USER.simCompleted.length === PHISHING_EMAILS.length) {
      renderSimulator();
    }
  }, 3000);
}

function resetSimulator() {
  if(!confirm('Recomeçar simulador? Isto irá reiniciar o seu progresso no simulador.')) {
    return;
  }
  USER.simCompleted = [];
  saveData();
  renderSimulator();
}

// CONQUISTAS
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

// BIBLIOTECA
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

// CERTIFICADO
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

// DOWNLOAD DO CERTIFICADO
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

// ADMIN
function updateAdminDashboard() {
  document.getElementById('adminWelcome').textContent = 
    'Empresa: ' + COMPANY.name + ' | Código: ' + COMPANY.code;
  
  loadCompanyEmployees();
  
  var employees = COMPANY.employees || [];
  var total = employees.length;
  
  // Atualiza dados dos colaboradores
  employees.forEach(function(emp) {
    var userData = localStorage.getItem('user_' + emp.email);
    if(userData) {
      var user = JSON.parse(userData);
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
  });
  
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

function renderModuleStats(employees) {
  var html = '';
  
  if(employees.length === 0) {
    html = '<p style="text-align:center;color:#64748b;padding:2rem">Sem dados disponíveis</p>';
  } else {
    MODULES.forEach(function(mod) {
      var completed = employees.filter(function(e) {
        var userData = localStorage.getItem('user_' + e.email);
        if(!userData) return false;
        var user = JSON.parse(userData);
        return user.scores && user.scores[mod.id] !== undefined;
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

function copyInviteLink() {
  var inviteUrl = window.location.origin + window.location.pathname + '?company=' + COMPANY.code;
  
  navigator.clipboard.writeText(inviteUrl).then(function() {
    showXP('✓ Link copiado!');
  }).catch(function() {
    alert('Link: ' + inviteUrl);
  });
}

// UTILITÁRIOS
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

// INICIALIZAÇÃO
window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);
  var code = urlParams.get('company');
  
  if(code) {
    document.getElementById('companyCode').value = code.toUpperCase();
    showLoginType('user');
  }
};

console.log('✓ Academia Anti-Phishing Elite | Mareginter - Sistema Completo com Certificado 🎓');