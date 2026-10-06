export type SecaoPrivacidade = {
  titulo: string;
  paragrafos: string[];
};

// Dados confirmados pela cliente em 2026-10-06: responsável, contatos de
// privacidade, quem acessa o WhatsApp e a guarda sem prazo fixo. O resto
// descreve a arquitetura real do site (sem servidor próprio, sem banco de
// dados, sem login). Ao mudar o que o site coleta, atualize aqui e a data.
export const PRIVACIDADE_ATUALIZADA_EM = "6 de outubro de 2026";

export const CONTATO_PRIVACIDADE = {
  email: "gestaoedivertido@gmail.com",
  whatsapp: "(81) 99331-2424",
  whatsappDigitos: "5581993312424",
};

export const SECOES_PRIVACIDADE: SecaoPrivacidade[] = [
  {
    titulo: "Quem é responsável pelos seus dados",
    paragrafos: [
      "Este site é do Edivertido Salão Inclusivo, salão e barbearia na Rua do Cupim, 53, Graças, Recife, PE. O responsável pelo tratamento dos dados é Ednark Teles da Silva, CPF ***.256.844-**.",
      "Para qualquer assunto de privacidade, fale com a gente pelo e-mail gestaoedivertido@gmail.com ou pelo WhatsApp (81) 99331-2424.",
    ],
  },
  {
    titulo: "Que dados o site pede",
    paragrafos: [
      "O formulário do site pergunta o nome de quem vai ser atendido e se a pessoa tem alguma sensibilidade sensorial. Se você quiser, também pode informar idade aproximada, diagnóstico, o que costuma incomodar e o que ajuda a acalmar.",
      "Para enviar o perfil sensorial completo, pedimos também o seu nome e o seu WhatsApp. Esses são os únicos campos obrigatórios dessa etapa.",
      "Diagnóstico e perfil sensorial são dados sensíveis de saúde. Eles só são enviados se você preencher, e servem para uma coisa só: preparar o atendimento antes da visita.",
    ],
  },
  {
    titulo: "Como esses dados chegam até a gente",
    paragrafos: [
      "O formulário de atendimento não guarda nada no site. Ele monta uma mensagem com o que você preencheu e abre o WhatsApp com essa mensagem pronta, no seu aparelho.",
      "Nada é enviado sozinho. A mensagem só chega ao salão se você tocar em enviar dentro do WhatsApp. A partir daí, a conversa também segue as regras de privacidade do próprio WhatsApp.",
    ],
  },
  {
    titulo: "Quem tem acesso",
    paragrafos: [
      "As mensagens são lidas pela equipe do salão que cuida do agendamento e do atendimento. Usamos as informações para marcar o horário e preparar o ambiente e a equipe para aquela pessoa.",
      "Não vendemos nem repassamos seus dados a terceiros.",
    ],
  },
  {
    titulo: "Por quanto tempo guardamos",
    paragrafos: [
      "As conversas e os perfis sensoriais ficam guardados no WhatsApp do salão sem prazo fixo de exclusão, para que a equipe já conheça as necessidades da pessoa nas próximas visitas.",
      "Você pode pedir a exclusão a qualquer momento, pelo e-mail ou pelo WhatsApp acima, e a gente apaga.",
    ],
  },
  {
    titulo: "Crianças e adolescentes",
    paragrafos: [
      "Boa parte de quem atendemos é criança ou adolescente. Os dados delas devem ser enviados pela mãe, pelo pai ou pelo responsável legal, e são usados só para preparar o atendimento.",
    ],
  },
  {
    titulo: "Fotos e vídeos",
    paragrafos: [
      "As fotos de atendimentos que aparecem neste site e nas redes sociais do salão são publicadas com autorização da própria pessoa ou do responsável legal.",
      "Quem autorizou pode mudar de ideia. Peça pelo e-mail ou pelo WhatsApp acima e a gente retira a imagem.",
    ],
  },
  {
    titulo: "Autorização de uso de imagem",
    paragrafos: [
      "Quem autoriza o uso de imagem preenche um termo em edivertido.com.br/autorizacao. Nele pedimos o nome de quem aparece nas imagens, o nome, o CPF e o WhatsApp de quem assina, as escolhas feitas e a assinatura desenhada na tela.",
      "Diferente do formulário de atendimento, esse termo é enviado e guardado: fica registrado no serviço de formulários da Netlify, que hospeda o site, e chega por e-mail à gestão do salão. Guardamos enquanto a autorização valer e pelo tempo necessário para comprovar que ela existiu.",
    ],
  },
  {
    titulo: "Cookies e medição de anúncios",
    paragrafos: [
      "Hoje este site não usa cookies de rastreamento nem ferramentas de publicidade.",
      "Vamos passar a usar ferramentas de medição de anúncios, como o Pixel da Meta, para saber se a nossa divulgação está funcionando. Quando isso acontecer, elas só serão ativadas depois que você aceitar, em um aviso que aparece na primeira visita, e esta página será atualizada.",
      "O site é hospedado na Netlify, que registra dados técnicos de acesso, como endereço IP e tipo de navegador, para manter o serviço funcionando e seguro.",
    ],
  },
  {
    titulo: "Links para outros serviços",
    paragrafos: [
      "Os botões de WhatsApp e de como chegar abrem serviços de outras empresas, o WhatsApp e o Google Maps. O que você faz por lá segue as políticas de privacidade delas.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      "Pela Lei Geral de Proteção de Dados, você pode pedir para saber quais dados seus temos, corrigir uma informação, apagar o que foi enviado ou retirar um consentimento que deu.",
      "É só pedir pelo e-mail gestaoedivertido@gmail.com ou pelo WhatsApp (81) 99331-2424. Se achar que o seu pedido não foi atendido, você também pode procurar a Autoridade Nacional de Proteção de Dados, a ANPD.",
    ],
  },
  {
    titulo: "Mudanças nesta política",
    paragrafos: [
      "Quando o site passar a coletar algo novo ou a usar uma ferramenta nova, esta página é atualizada e a data no topo muda.",
    ],
  },
];
