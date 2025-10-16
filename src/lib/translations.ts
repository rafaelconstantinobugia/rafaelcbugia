import { Locale } from './i18n';

export type TranslationKey = keyof typeof translations.home;

interface Translations {
  [key: string]: {
    [K in Locale]: string;
  };
}

export const translations = {
  // Common
  loading: {
    'pt-PT': 'A carregar...',
    'en': 'Loading...',
    'es': 'Cargando...',
  },
  
  // Navigation
  nav: {
    home: {
      'pt-PT': 'Início',
      'en': 'Home',
      'es': 'Inicio',
    },
    bio: {
      'pt-PT': 'Bio',
      'en': 'Bio',
      'es': 'Bio',
    },
    projects: {
      'pt-PT': 'Projectos',
      'en': 'Projects',
      'es': 'Proyectos',
    },
    media: {
      'pt-PT': 'Media',
      'en': 'Media',
      'es': 'Media',
    },
    contact: {
      'pt-PT': 'Contacto',
      'en': 'Contact',
      'es': 'Contacto',
    },
    kitdigital: {
      'pt-PT': 'Kit Digital',
      'en': 'Digital Kit',
      'es': 'Kit Digital',
    },
  },

  // Home Page
  home: {
    title: {
      'pt-PT': 'Empreendedor e Estratega Digital',
      'en': 'Entrepreneur and Digital Strategist',
      'es': 'Emprendedor y Estratega Digital',
    },
    description: {
      'pt-PT': 'Construo sistemas digitais simples que funcionam no mundo real. Empreendedor na Costa de Prata. Método SPRINT, Silver Coast Sitters, Celinda\'s Eco Retreat.',
      'en': 'I build simple digital systems that work in the real world. Entrepreneur on the Silver Coast. SPRINT Method, Silver Coast Sitters, Celinda\'s Eco Retreat.',
      'es': 'Construyo sistemas digitales simples que funcionan en el mundo real. Emprendedor en la Costa de Plata. Método SPRINT, Silver Coast Sitters, Celinda\'s Eco Retreat.',
    },
    hero_subtitle: {
      'pt-PT': 'Empreendedor e estratega digital na Costa de Prata.',
      'en': 'Entrepreneur and digital strategist on the Silver Coast.',
      'es': 'Emprendedor y estratega digital en la Costa de Plata.',
    },
    hero_tagline: {
      'pt-PT': 'Construo sistemas digitais simples que funcionam no mundo real. Resultados rápidos, impacto real.',
      'en': 'I build simple digital systems that work in the real world. Fast results, real impact.',
      'es': 'Construyo sistemas digitales simples que funcionan en el mundo real. Resultados rápidos, impacto real.',
    },
    cta_projects: {
      'pt-PT': 'Ver projectos',
      'en': 'View projects',
      'es': 'Ver proyectos',
    },
    cta_contact: {
      'pt-PT': 'Contacto',
      'en': 'Contact',
      'es': 'Contacto',
    },
    what_i_do: {
      'pt-PT': 'O que faço',
      'en': 'What I do',
      'es': 'Lo que hago',
    },
    service_automation_title: {
      'pt-PT': 'Automações Inteligentes',
      'en': 'Smart Automations',
      'es': 'Automatizaciones Inteligentes',
    },
    service_automation_subtitle: {
      'pt-PT': 'Eficiência operacional',
      'en': 'Operational efficiency',
      'es': 'Eficiencia operacional',
    },
    service_automation_desc: {
      'pt-PT': 'Sistemas que trabalham por si, libertando tempo para o que realmente importa.',
      'en': 'Systems that work for you, freeing time for what really matters.',
      'es': 'Sistemas que trabajan por ti, liberando tiempo para lo que realmente importa.',
    },
    service_strategy_title: {
      'pt-PT': 'Estratégia Digital',
      'en': 'Digital Strategy',
      'es': 'Estrategia Digital',
    },
    service_strategy_subtitle: {
      'pt-PT': 'Crescimento sustentável',
      'en': 'Sustainable growth',
      'es': 'Crecimiento sostenible',
    },
    service_strategy_desc: {
      'pt-PT': 'Planos práticos baseados em dados reais e execução no terreno.',
      'en': 'Practical plans based on real data and field execution.',
      'es': 'Planes prácticos basados en datos reales y ejecución en el terreno.',
    },
    service_funnels_title: {
      'pt-PT': 'Funis de Conversão',
      'en': 'Conversion Funnels',
      'es': 'Embudos de Conversión',
    },
    service_funnels_subtitle: {
      'pt-PT': 'Resultados medíveis',
      'en': 'Measurable results',
      'es': 'Resultados medibles',
    },
    service_funnels_desc: {
      'pt-PT': 'Do primeiro contacto à conversão, sistemas optimizados para performance.',
      'en': 'From first contact to conversion, systems optimized for performance.',
      'es': 'Del primer contacto a la conversión, sistemas optimizados para el rendimiento.',
    },
    learn_more: {
      'pt-PT': 'Saber mais',
      'en': 'Learn more',
      'es': 'Saber más',
    },
    highlights: {
      'pt-PT': 'Destaques',
      'en': 'Highlights',
      'es': 'Destacados',
    },
    proof_1: {
      'pt-PT': 'Execução prática com ferramentas acessíveis',
      'en': 'Practical execution with accessible tools',
      'es': 'Ejecución práctica con herramientas accesibles',
    },
    proof_2: {
      'pt-PT': 'Sistemas duplicáveis e mensuráveis',
      'en': 'Replicable and measurable systems',
      'es': 'Sistemas duplicables y medibles',
    },
    proof_3: {
      'pt-PT': 'Conteúdo público regular (Reels / Carrosséis)',
      'en': 'Regular public content (Reels / Carousels)',
      'es': 'Contenido público regular (Reels / Carruseles)',
    },
    kitdigital_cta_title: {
      'pt-PT': 'Precisa de um sistema digital para o seu negócio?',
      'en': 'Need a digital system for your business?',
      'es': '¿Necesita un sistema digital para su negocio?',
    },
    kitdigital_cta_desc: {
      'pt-PT': 'Veja o Kit Digital — uma oferta completa para negócios que querem crescer com tecnologia prática.',
      'en': 'Check out the Digital Kit — a complete offering for businesses that want to grow with practical technology.',
      'es': 'Consulte el Kit Digital — una oferta completa para negocios que quieren crecer con tecnología práctica.',
    },
    kitdigital_cta_button: {
      'pt-PT': 'Conhecer o Kit Digital',
      'en': 'Discover the Digital Kit',
      'es': 'Conocer el Kit Digital',
    },
    newsletter_title: {
      'pt-PT': 'Fique atualizado',
      'en': 'Stay updated',
      'es': 'Manténgase actualizado',
    },
    newsletter_desc: {
      'pt-PT': 'Receba insights sobre tecnologia, operações e estratégia digital. Sem spam, apenas conteúdo útil.',
      'en': 'Receive insights on technology, operations and digital strategy. No spam, just useful content.',
      'es': 'Reciba información sobre tecnología, operaciones y estrategia digital. Sin spam, solo contenido útil.',
    },
  },

  // Projects Page
  projects: {
    title: {
      'pt-PT': 'Projectos',
      'en': 'Projects',
      'es': 'Proyectos',
    },
    seo_title: {
      'pt-PT': 'Projectos — Método SPRINT, Silver Coast Sitters, Celinda\'s',
      'en': 'Projects — SPRINT Method, Silver Coast Sitters, Celinda\'s',
      'es': 'Proyectos — Método SPRINT, Silver Coast Sitters, Celinda\'s',
    },
    description: {
      'pt-PT': 'Descubra os projectos que estou a desenvolver: Método SPRINT, Silver Coast Sitters, Celinda\'s Eco Retreat, 1VAU e mais.',
      'en': 'Discover the projects I\'m developing: SPRINT Method, Silver Coast Sitters, Celinda\'s Eco Retreat, 1VAU and more.',
      'es': 'Descubra los proyectos que estoy desarrollando: Método SPRINT, Silver Coast Sitters, Celinda\'s Eco Retreat, 1VAU y más.',
    },
    heading: {
      'pt-PT': 'Projectos',
      'en': 'Projects',
      'es': 'Proyectos',
    },
    intro: {
      'pt-PT': 'Sistemas digitais que resolvem problemas reais. Cada projecto é construído com foco em resultados medíveis.',
      'en': 'Digital systems that solve real problems. Each project is built with a focus on measurable results.',
      'es': 'Sistemas digitales que resuelven problemas reales. Cada proyecto está construido con enfoque en resultados medibles.',
    },
    visit_project: {
      'pt-PT': 'Visitar projecto',
      'en': 'Visit project',
      'es': 'Visitar proyecto',
    },
    how_i_work: {
      'pt-PT': 'Como trabalho',
      'en': 'How I work',
      'es': 'Cómo trabajo',
    },
    how_i_work_default: {
      'pt-PT': 'Trabalho com foco em execução prática e resultados medíveis. Cada projeto começa com uma análise clara do problema, seguida de implementação rápida e iteração baseada em dados reais.',
      'en': 'I work with a focus on practical execution and measurable results. Each project starts with a clear problem analysis, followed by rapid implementation and iteration based on real data.',
      'es': 'Trabajo con enfoque en ejecución práctica y resultados medibles. Cada proyecto comienza con un análisis claro del problema, seguido de implementación rápida e iteración basada en datos reales.',
    },
    loading: {
      'pt-PT': 'A carregar...',
      'en': 'Loading...',
      'es': 'Cargando...',
    },
    visit: {
      'pt-PT': 'Visitar projecto',
      'en': 'Visit project',
      'es': 'Visitar proyecto',
    },
    how_i_work_title: {
      'pt-PT': 'Como trabalho',
      'en': 'How I work',
      'es': 'Cómo trabajo',
    },
    no_projects: {
      'pt-PT': 'Nenhum projecto disponível no momento.',
      'en': 'No projects available at the moment.',
      'es': 'No hay proyectos disponibles en este momento.',
    },
  },

  // Bio Page
  bio: {
    title: {
      'pt-PT': 'Bio',
      'en': 'Bio',
      'es': 'Bio',
    },
    seo_title: {
      'pt-PT': 'Biografia — Rafael Constantino Bugia',
      'en': 'Biography — Rafael Constantino Bugia',
      'es': 'Biografía — Rafael Constantino Bugia',
    },
    description: {
      'pt-PT': 'Percurso de Rafael Constantino Bugia: de farmacêutico a empreendedor digital. Construtor de sistemas práticos na Costa de Prata.',
      'en': 'Rafael Constantino Bugia\'s journey: from pharmacist to digital entrepreneur. Builder of practical systems on the Silver Coast.',
      'es': 'Trayectoria de Rafael Constantino Bugia: de farmacéutico a emprendedor digital. Constructor de sistemas prácticos en la Costa de Plata.',
    },
    heading: {
      'pt-PT': 'Bio',
      'en': 'Bio',
      'es': 'Bio',
    },
    timeline_title: {
      'pt-PT': 'Percurso',
      'en': 'Journey',
      'es': 'Trayectoria',
    },
    cta_title: {
      'pt-PT': 'Veja os projectos em acção',
      'en': 'See the projects in action',
      'es': 'Vea los proyectos en acción',
    },
    cta_description: {
      'pt-PT': 'Conheça os sistemas digitais que estou a desenvolver e os resultados que estão a gerar.',
      'en': 'Discover the digital systems I\'m building and the results they\'re generating.',
      'es': 'Conozca los sistemas digitales que estoy desarrollando y los resultados que están generando.',
    },
    cta_button: {
      'pt-PT': 'Explorar projectos',
      'en': 'Explore projects',
      'es': 'Explorar proyectos',
    },
    loading: {
      'pt-PT': 'A carregar...',
      'en': 'Loading...',
      'es': 'Cargando...',
    },
  },

  // Media Page
  media: {
    title: {
      'pt-PT': 'Media — Artigos e Imprensa',
      'en': 'Media — Articles and Press',
      'es': 'Media — Artículos y Prensa',
    },
    description: {
      'pt-PT': 'Artigos, entrevistas e aparições na imprensa. Press kit oficial para jornalistas.',
      'en': 'Articles, interviews and press appearances. Official press kit for journalists.',
      'es': 'Artículos, entrevistas y apariciones en prensa. Kit de prensa oficial para periodistas.',
    },
    heading: {
      'pt-PT': 'Media',
      'en': 'Media',
      'es': 'Media',
    },
    intro: {
      'pt-PT': 'Artigos, entrevistas e aparições na imprensa.',
      'en': 'Articles, interviews and press appearances.',
      'es': 'Artículos, entrevistas y apariciones en prensa.',
    },
    read_article: {
      'pt-PT': 'Ler artigo',
      'en': 'Read article',
      'es': 'Leer artículo',
    },
    press_kit_title: {
      'pt-PT': 'Press Kit',
      'en': 'Press Kit',
      'es': 'Press Kit',
    },
    press_kit_subtitle: {
      'pt-PT': 'Material oficial para imprensa',
      'en': 'Official press material',
      'es': 'Material oficial para prensa',
    },
    press_kit_bio_label: {
      'pt-PT': 'Bio oficial:',
      'en': 'Official bio:',
      'es': 'Bio oficial:',
    },
    press_kit_download: {
      'pt-PT': 'Descarregar Bio e Foto',
      'en': 'Download Bio and Photo',
      'es': 'Descargar Bio y Foto',
    },
    press_kit_contact_title: {
      'pt-PT': 'Pedidos de imprensa',
      'en': 'Press inquiries',
      'es': 'Consultas de prensa',
    },
    press_kit_contact_desc: {
      'pt-PT': 'Para entrevistas ou colaborações, contacte através do formulário.',
      'en': 'For interviews or collaborations, contact via the form.',
      'es': 'Para entrevistas o colaboraciones, contacte a través del formulario.',
    },
    press_kit_contact_button: {
      'pt-PT': 'Contactar',
      'en': 'Contact',
      'es': 'Contactar',
    },
    no_articles: {
      'pt-PT': 'Nenhum artigo disponível no momento.',
      'en': 'No articles available at the moment.',
      'es': 'No hay artículos disponibles en este momento.',
    },
  },

  // Contact Page
  contact: {
    title: {
      'pt-PT': 'Contacto',
      'en': 'Contact',
      'es': 'Contacto',
    },
    seo_title: {
      'pt-PT': 'Contacto — Rafael Constantino Bugia',
      'en': 'Contact — Rafael Constantino Bugia',
      'es': 'Contacto — Rafael Constantino Bugia',
    },
    description: {
      'pt-PT': 'Entre em contacto para discutir o seu projecto. Respondo normalmente em 24 horas.',
      'en': 'Get in touch to discuss your project. I typically respond within 24 hours.',
      'es': 'Póngase en contacto para discutir su proyecto. Normalmente respondo en 24 horas.',
    },
    heading: {
      'pt-PT': 'Contacto',
      'en': 'Contact',
      'es': 'Contacto',
    },
    intro: {
      'pt-PT': 'Vamos conversar sobre o seu projecto. Respondo normalmente em 24 horas.',
      'en': 'Let\'s talk about your project. I typically respond within 24 hours.',
      'es': 'Hablemos de su proyecto. Normalmente respondo en 24 horas.',
    },
    form_name: {
      'pt-PT': 'Nome',
      'en': 'Name',
      'es': 'Nombre',
    },
    form_email: {
      'pt-PT': 'Email',
      'en': 'Email',
      'es': 'Correo',
    },
    form_subject: {
      'pt-PT': 'Assunto',
      'en': 'Subject',
      'es': 'Asunto',
    },
    form_message: {
      'pt-PT': 'Mensagem',
      'en': 'Message',
      'es': 'Mensaje',
    },
    form_name_placeholder: {
      'pt-PT': 'O seu nome',
      'en': 'Your name',
      'es': 'Su nombre',
    },
    form_email_placeholder: {
      'pt-PT': 'seu@email.com',
      'en': 'your@email.com',
      'es': 'su@email.com',
    },
    form_subject_placeholder: {
      'pt-PT': 'Como posso ajudar?',
      'en': 'How can I help?',
      'es': '¿Cómo puedo ayudar?',
    },
    form_message_placeholder: {
      'pt-PT': 'Conte-me sobre o seu projecto...',
      'en': 'Tell me about your project...',
      'es': 'Cuénteme sobre su proyecto...',
    },
    form_gdpr: {
      'pt-PT': 'Concordo que os meus dados sejam utilizados para responder ao meu pedido, de acordo com a',
      'en': 'I agree that my data will be used to respond to my request, in accordance with the',
      'es': 'Acepto que mis datos se utilicen para responder a mi solicitud, de acuerdo con la',
    },
    form_gdpr_link: {
      'pt-PT': 'política de privacidade',
      'en': 'privacy policy',
      'es': 'política de privacidad',
    },
    form_gdpr_rights: {
      'pt-PT': '. Posso exercer os meus direitos (acesso, retificação, eliminação) a qualquer momento.',
      'en': '. I can exercise my rights (access, rectification, deletion) at any time.',
      'es': '. Puedo ejercer mis derechos (acceso, rectificación, eliminación) en cualquier momento.',
    },
    form_submit: {
      'pt-PT': 'Enviar mensagem',
      'en': 'Send message',
      'es': 'Enviar mensaje',
    },
    form_submitting: {
      'pt-PT': 'A enviar...',
      'en': 'Sending...',
      'es': 'Enviando...',
    },
    form_success: {
      'pt-PT': 'Mensagem enviada com sucesso! Entrarei em contacto em breve.',
      'en': 'Message sent successfully! I\'ll be in touch soon.',
      'es': '¡Mensaje enviado con éxito! Me pondré en contacto pronto.',
    },
    form_error: {
      'pt-PT': 'Erro ao enviar mensagem. Tente novamente ou use o email directo.',
      'en': 'Error sending message. Please try again or use direct email.',
      'es': 'Error al enviar mensaje. Inténtelo de nuevo o use el correo directo.',
    },
    direct_email_label: {
      'pt-PT': 'Ou contacte directamente:',
      'en': 'Or contact directly:',
      'es': 'O contacte directamente:',
    },
  },

  // Newsletter
  newsletter: {
    email_placeholder: {
      'pt-PT': 'seu@email.com',
      'en': 'your@email.com',
      'es': 'su@email.com',
    },
    subscribe: {
      'pt-PT': 'Subscrever',
      'en': 'Subscribe',
      'es': 'Suscribir',
    },
    subscribing: {
      'pt-PT': 'A subscrever...',
      'en': 'Subscribing...',
      'es': 'Suscribiendo...',
    },
    gdpr: {
      'pt-PT': 'Ao subscrever, aceito a',
      'en': 'By subscribing, I accept the',
      'es': 'Al suscribirme, acepto la',
    },
    gdpr_link: {
      'pt-PT': 'política de privacidade',
      'en': 'privacy policy',
      'es': 'política de privacidad',
    },
    success: {
      'pt-PT': 'Subscrição confirmada! Obrigado.',
      'en': 'Subscription confirmed! Thank you.',
      'es': '¡Suscripción confirmada! Gracias.',
    },
    error: {
      'pt-PT': 'Erro ao subscrever. Tente novamente.',
      'en': 'Error subscribing. Please try again.',
      'es': 'Error al suscribirse. Inténtelo de nuevo.',
    },
  },

  // Footer
  footer: {
    privacy: {
      'pt-PT': 'Política de Privacidade',
      'en': 'Privacy Policy',
      'es': 'Política de Privacidad',
    },
    terms: {
      'pt-PT': 'Termos e Condições',
      'en': 'Terms and Conditions',
      'es': 'Términos y Condiciones',
    },
    cookies: {
      'pt-PT': 'Política de Cookies',
      'en': 'Cookie Policy',
      'es': 'Política de Cookies',
    },
    legal: {
      'pt-PT': 'Aviso Legal',
      'en': 'Legal Notice',
      'es': 'Aviso Legal',
    },
    manage_cookies: {
      'pt-PT': 'Gerir Cookies',
      'en': 'Manage Cookies',
      'es': 'Gestionar Cookies',
    },
    rights: {
      'pt-PT': 'Todos os direitos reservados.',
      'en': 'All rights reserved.',
      'es': 'Todos los derechos reservados.',
    },
    copyright: {
      'pt-PT': `© ${new Date().getFullYear()} Rafael Constantino Bugia. Todos os direitos reservados.`,
      'en': `© ${new Date().getFullYear()} Rafael Constantino Bugia. All rights reserved.`,
      'es': `© ${new Date().getFullYear()} Rafael Constantino Bugia. Todos los derechos reservados.`,
    },
    email: {
      'pt-PT': 'contacto@rafaelcbugia.com',
      'en': 'contact@rafaelcbugia.com',
      'es': 'contacto@rafaelcbugia.com',
    },
    handle: {
      'pt-PT': '@rafaelcbugia',
      'en': '@rafaelcbugia',
      'es': '@rafaelcbugia',
    },
    domainNote: {
      'pt-PT': 'Este site substitui rafaelconstantinobugia.pt',
      'en': 'This site replaces rafaelconstantinobugia.pt',
      'es': 'Este sitio sustituye rafaelconstantinobugia.pt',
    },
  },

  testimonials: {
    title: {
      'pt-PT': 'O que dizem sobre mim',
      'en': 'What they say about me',
      'es': 'Lo que dicen de mí',
    },
  },
} as const;

// Helper function to get translation
export function t(key: string, locale: Locale): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value[k];
    if (!value) return key;
  }
  
  return value[locale] || value['pt-PT'] || key;
}
