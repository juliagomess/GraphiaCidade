/* tslint:disable:object-literal-sort-keys */
const ptBr = {
  APPLICATION: {
    CURRENCY: 'BRL',
    ERRORS: {
      GENERIC: 'Parece que algo não saiu bem. Tente novamente mais tarde.',
      INVALID_KEY: 'Key do i18n inválida ou inexistente.',
      INSTANCE: {
        REFRESH_TOKEN: 'Token expirado. Faça Login novamente!',
        LOGIN: 'Faça Login novamente!',
      },
      TIMEOUT: 'Verifique sua conexão. Tente novamente mais tarde.',
    },
    LANG: 'pt-BR',
  },
  COMPONENTS: {
    ADVANCED_FILTER: {
      FILTER: 'Filtrar',
      CLEAN: 'limpar',
    },
    ADVANCED_EXPORT: {
      EXPORT: 'Exportar',
      PERIOD: {
        LABEL: 'Período',
      },
      START: {
        LABEL: 'Ínicio',
      },
      END: {
        LABEL: 'Fim',
      }
    },
    SEARCH_BAR: {
      SEARCH: {
        LABEL: 'o que deseja procurar?',
      },
      STATUS: {
        LABEL: 'STATUS',
      },
      FILTERS: {
        LABEL: 'FILTROS',
      },
    },
    DATA_TABLE_ACTIONS: {
      ADD: {
        LABEL: 'Adicionar',
      },
      EDIT: {
        LABEL: 'Editar',
      },
      VIEW: {
        LABEL: 'Visualizar',
      },
      DELETE: {
        LABEL: 'Deletar',
      },
      PRINT: {
        LABEL: 'Imprimir',
      },
      OPEN: {
        LABEL: 'Abrir',
      },
      HISTORY: {
        LABEL: 'Histórico',
      },
    },
    PANEL_CONTENT_TOP_BAR: {
      PAGES: {
        DASHBOARD: {
          TITLE: 'Dashboard',
          LOGOUT: 'Sair',
        },
      },
    },
  },
  PAGES: {
    AUTH: {
      LOGIN: {
        URL: '/',
        PAGE_TITLE: 'Entrar',
        MESSAGES: {
          LOGOUT: 'Você saiu do sistema.',
          WELCOME: 'Bem vindo(a) novamente.',
          INVALID: 'Email e/ou senha incorretos.',
        },
        FORM: {
          TITLE: 'ENTRAR',
          MESSAGE:
            'Ut sit amet ultricies turpis, sed molestie eros. Praesent magna neque, elementum non semper vitae, vestibulum vitae mi.',
          EMAIL: {
            LABEL: 'E-mail',
            PLACEHOLDER: 'Seu e-mail válido',
          },
          PASSWORD: {
            LABEL: 'Senha',
            PLACEHOLDER: 'Seu senha segura',
          },
          BUTTON: {
            TEXT: 'Entrar',
          },
          BOTTOM_MESSAGE: {
            TEXT: 'Esqueceu sua senha?',
            TEXT_LINK: 'Clique aqui',
          },
        },
      },
      PASSWORD_RECOVERY: {
        URL: '/recuperar-senha',
        PAGE_TITLE: 'Recuperar senha',
        MESSAGES: {
          WELCOME: 'Bem vindo(a) novamente.',
          LOGOUT: 'Você saiu do sistema.',
          EMAIL: 'Verifique seu email',
          RECOVERY_SUCCESS: 'Senha alterada com sucesso',
        },
        FORM: {
          TITLE: 'RECUPERAR SENHA',
          MESSAGE:
            'Iremos enviar os próximos passos no e-mail abaixo para prosseguir com a recuperação de sua senha',
          EMAIL: {
            LABEL: 'E-mail',
            PLACEHOLDER: 'Seu e-mail válido',
          },
          TOKEN: {
            LABEL: 'Código de recuperação',
          },
          PASSWORD: {
            LABEL: 'Sua nova senha',
          },
          CHANGE_PASSWORD: {
            LABEL: 'Alterar senha',
          },
          BUTTON: {
            TEXT: 'Enviar e-mail',
          },
          BOTTOM_MESSAGE: {
            TEXT: 'Para voltar para o login,',
            TEXT_LINK: 'Clique aqui',
          },
        },
      },
    },
    PANEL: {
      DASHBOARD: {
        TITLE: 'DASHBOARD',

        DETAILS: {
          WELCOME: 'Seja Bem Vindo ',
          TITLE: 'Informações gerais',
          PAGE_DESCRIPTION: 'Visualize alguns dos principais indicadores',

          CARD: {
            USERS: 'Usuários',
            REPORTS: 'Ocorrências',
            REPORTS_LAST_HOUR: 'Ocorrências na última hora',
            REPORTS_LAST_24: 'Ocorrências nas últimas 24 horas',
          }
        },
      },

      ADMIN: {
        ROUTE: {
          NAME: 'ADMINISTRADORES',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/usuarios/administradores/detalhes/',
        },
        TITLE: 'ADMINISTRADORES',
        REPORT: {
          TITLE: 'Administradores',
          PAGE_TITLE: 'Administradores',
          PAGE_DESCRIPTION: 'Listagem de administradores',
          PAGE_TITLE_DETAILS: 'Detalhes',

          ADVANCED_FILTER: {
            NAME: 'Nome',
            EMAIL: 'E-mail',
          },

          TABLE: {
            NAME: {
              FIELD: 'name',
              HEADER: 'Nome',
            },
            EMAIL: {
              FIELD: 'email',
              HEADER: 'E-mail',
            },
            CREATED: {
              FIELD: 'createdAt',
              HEADER: 'Data de cadastro',
            },
            ACTIONS: {
              FIELD: 'actions',
              HEADER: 'Ações',
            },
          },
        },

        DETAILS: {
          UNDEFINED: 'Não definido',
          TITLE_ADD: 'Adicionar administrador',
          TITLE_EDIT: 'Editar administrador',
          DESCRIPTION_ADD:
            'Preencha os campos abaixo para adicionar um administrador',
          DESCRIPTION_EDIT:
            'Preencha os campos abaixo para editar um administrador',
          SUCCESS_ADD_MESSAGE: 'Administrador criado com sucesso!',
          SUCCESS_EDIT_MESSAGE: 'Administrador editado com sucesso!',
          SUCCESS_REMOVE_MESSAGE: 'Administrador removido com sucesso!',
          FORM: {
            ERROR: {
              PASSWORD: 'Verifique se as senhas são iguais e tente novamente!',
              PASSWORD_EMPTY: 'Preencha o campo senha!',
              NAME: 'Preencha o nome!',
              PHONE: 'Preencha um número de telefone!',
              EMAIL: 'Preencha o e-mail!',
            },
            TITLE: 'Detalhes do administrador',
            NAME: {
              LABEL: 'Nome completo',
            },
            EMAIL: {
              LABEL: 'E-mail válido',
            },
            DDI: {
              LABEL: 'DDI',
            },
            PHONE: {
              LABEL: 'Telefone celular válido',
            },
            PASSWORD: {
              LABEL: 'Senha segura',
            },
            PASSWORD_CONFIRMATION: {
              LABEL: 'Digite novamente a senha',
            },
            CHANGE_PASSWORD: {
              LABEL: 'Desejo alterar a senha',
            },
            BACK: {
              LABEL: 'VOLTAR',
            },
            SUBMIT: {
              LABEL: 'Salvar',
            },
          },
        },
      },

      CATEGORY: {
        ROUTE: {
          NAME: 'CATEGORIAS',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/monitoramento/categorias/detalhes/',
        },
        TITLE: 'CATEGORIAS',
        REPORT: {
          TITLE: 'Categorias',
          PAGE_TITLE: 'Categorias',
          PAGE_DESCRIPTION: 'Listagem de categorias',
          PAGE_TITLE_DETAILS: 'Detalhes',

          ADVANCED_FILTER: {
            TITLE: 'Nome',
          },

          TABLE: {
            TITLE: {
              FIELD: 'categoryName',
              HEADER: 'Título',
            },
            SUB_CATEGORIES: {
              FIELD: 'subCategories',
              HEADER: 'Subcategorias',
            },
            CREATED: {
              FIELD: 'createdAt',
              HEADER: 'Data de cadastro',
            },
            ACTIONS: {
              FIELD: 'actions',
              HEADER: 'Ações',
            },
          },
        },

        DETAILS: {
          UNDEFINED: 'Não definido',
          TITLE_ADD: 'Adicionar categoria',
          TITLE_EDIT: 'Editar categoria',
          DESCRIPTION_ADD:
            'Preencha os campos abaixo para adicionar uma categoria',
          DESCRIPTION_EDIT:
            'Preencha os campos abaixo para editar uma categoria',
          SUCCESS_ADD_MESSAGE: 'Categoria criada com sucesso!',
          SUCCESS_EDIT_MESSAGE: 'Categoria editada com sucesso!',
          SUCCESS_REMOVE_MESSAGE: 'Categoria removida com sucesso!',
          FORM: {
            ERROR: {
              TITLE: 'Preencha o título!',
              SUB_CATEGORIES: 'Preencha campo com as subcategorias!',
            },
            TITLE: 'Detalhes da categoria',
            SUBJECT: {
              LABEL: 'Título',
            },
            SUB_CATEGORIES: {
              LABEL: 'Subcategorias',
            },
            BACK: {
              LABEL: 'VOLTAR',
            },
            SUBMIT: {
              LABEL: 'Salvar',
            },
          },
        },
      },

      GEOGRAPHER: {
        ROUTE: {
          NAME: 'GEÓGRAFOS',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/usuarios/geografos/detalhes/',
        },
        TITLE: 'GEÓGRAFOS',
        REPORT: {
          TITLE: 'Geógrafos',
          PAGE_TITLE: 'Geógrafos',
          PAGE_DESCRIPTION: 'Listagem de geógrafos',
          PAGE_TITLE_DETAILS: 'Detalhes',

          ADVANCED_FILTER: {
            NAME: 'Nome',
            EMAIL: 'E-mail',
          },

          TABLE: {
            NAME: {
              FIELD: 'name',
              HEADER: 'Nome',
            },
            EMAIL: {
              FIELD: 'email',
              HEADER: 'E-mail',
            },
            CREATED: {
              FIELD: 'createdAt',
              HEADER: 'Data de cadastro',
            },
            ACTIONS: {
              FIELD: 'actions',
              HEADER: 'Ações',
            },
          },
        },

        DETAILS: {
          UNDEFINED: 'Não definido',
          TITLE_ADD: 'Adicionar geógrafo',
          TITLE_EDIT: 'Editar geógrafo',
          DESCRIPTION_ADD:
            'Preencha os campos abaixo para adicionar um geógrafo',
          DESCRIPTION_EDIT: 'Preencha os campos abaixo para editar um geógrafo',
          SUCCESS_ADD_MESSAGE: 'Geógrafo criado com sucesso!',
          SUCCESS_EDIT_MESSAGE: 'Geógrafo editado com sucesso!',
          SUCCESS_REMOVE_MESSAGE: 'Geógrafo removido com sucesso!',
          FORM: {
            ERROR: {
              PASSWORD: 'Verifique se as senhas são iguais e tente novamente!',
              PASSWORD_EMPTY: 'Preencha o campo senha!',
              NAME: 'Preencha o nome!',
              PHONE: 'Preencha um número de telefone!',
              EMAIL: 'Preencha o e-mail!',
            },
            TITLE: 'Detalhes do administrador',
            NAME: {
              LABEL: 'Nome completo',
            },
            EMAIL: {
              LABEL: 'E-mail válido',
            },
            DDI: {
              LABEL: 'DDI',
            },
            PHONE: {
              LABEL: 'Telefone celular válido',
            },
            PASSWORD: {
              LABEL: 'Senha segura',
            },
            PASSWORD_CONFIRMATION: {
              LABEL: 'Digite novamente a senha',
            },
            CHANGE_PASSWORD: {
              LABEL: 'Desejo alterar a senha',
            },
            BACK: {
              LABEL: 'VOLTAR',
            },
            SUBMIT: {
              LABEL: 'Salvar',
            },
          },
        },
      },

      USER: {
        ROUTE: {
          NAME: 'USUÁRIOS',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/usuarios/detalhes/',
        },
        TITLE: 'USUÁRIOS',
        REPORT: {
          TITLE: 'Usuários',
          PAGE_TITLE: 'Usuários',
          PAGE_DESCRIPTION: 'Listagem de usuários',
          PAGE_TITLE_DETAILS: 'Detalhes',

          ADVANCED_FILTER: {
            NAME: 'Nome',
            EMAIL: 'E-mail',
            ROLE:  'Papéis'
          },

          TABLE: {
            NAME: {
              FIELD: 'username',
              HEADER: 'Nome',
            },
            EMAIL: {
              FIELD: 'email',
              HEADER: 'E-mail',
            },
            ROLE: {
              FIELD: 'roles',
              HEADER: 'Papéis',
            },
            CREATED: {
              FIELD: 'createdAt',
              HEADER: 'Data de cadastro',
            },
            ACTIONS: {
              FIELD: 'actions',
              HEADER: 'Ações',
            },
          },
        },

        DETAILS: {
          UNDEFINED: 'Não definido',
          TITLE_ADD: 'Adicionar usuário',
          TITLE_EDIT: 'Editar usuário',
          DESCRIPTION_ADD:
            'Preencha os campos abaixo para adicionar um usuário',
          DESCRIPTION_EDIT: 'Preencha os campos abaixo para editar um usuário',
          SUCCESS_ADD_MESSAGE: 'Usuário criado com sucesso!',
          SUCCESS_EDIT_MESSAGE: 'Usuário editado com sucesso!',
          SUCCESS_REMOVE_MESSAGE: 'Usuário removido com sucesso!',
          FORM: {
            ERROR: {
              PASSWORD: 'Verifique se as senhas são iguais e tente novamente!',
              PASSWORD_EMPTY: 'Preencha o campo senha!',
              NAME: 'Preencha o nome!',
              PHONE: 'Preencha um número de telefone!',
              EMAIL: 'Preencha o e-mail!',
              ROLES: 'Preencha os papéis deste usuário!',
            },
            TITLE: 'Detalhes do usuário',
            NAME: {
              LABEL: 'Nome completo',
            },
            EMAIL: {
              LABEL: 'E-mail válido',
            },
            ROLES: {
              LABEL: 'Papéis',
            },
            PASSWORD: {
              LABEL: 'Senha segura',
            },
            PASSWORD_CONFIRMATION: {
              LABEL: 'Digite novamente a senha',
            },
            CHANGE_PASSWORD: {
              LABEL: 'Desejo alterar a senha',
            },
            BACK: {
              LABEL: 'VOLTAR',
            },
            SUBMIT: {
              LABEL: 'Salvar',
            },
          },
        },
      },

      MAP: {
        ROUTE: {
          NAME: 'MAPA',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/monitoramento/mapa',
        },
        TITLE: 'MAPA',
        REPORT: {
          TITLE: 'Mapa',
          PAGE_TITLE: 'Mapa',
          PAGE_DESCRIPTION: 'Visualização',
          PAGE_TITLE_DETAILS: 'Detalhes',

          ADVANCED_FILTER: {
            LONGITUDE: 'Longitude',
            LATITUDE: 'Latitude',
            DISTANCE: 'Distância em quilômetros',
          },
        },
      },

      OCCURRENCE: {
        ROUTE: {
          NAME: 'OCORRÊNCIAS',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/monitoramento/ocorrencias/detalhes/',
        },
        TITLE: 'OCORRÊNCIAS',
        REPORT: {
          TITLE: 'Ocorrências',
          PAGE_TITLE: 'Ocorrências',
          PAGE_DESCRIPTION: 'Listagem de ocorrências',
          PAGE_TITLE_DETAILS: 'Detalhes',

          ADVANCED_FILTER: {
            CATEGORY: 'Categoria',
            PROBLEM_TYPE: 'Tipo',
            PROFILE_TYPE: 'Perfil',
          },

          EXPORT: {
            LABEL: 'Exportar relatórios',
            FILENAME: 'Relatório de ocorrências.csv',
          },

          TABLE: {
            CATEGORY: {
              FIELD: 'category',
              HEADER: 'Categoria',
            },
            PROBLEM_TYPE: {
              FIELD: 'problemType',
              HEADER: 'Tipo',
            },
            DESCRIPTION: {
              FIELD: 'description',
              HEADER: 'Descrição'
            },
            CREATED: {
              FIELD: 'createdAt',
              HEADER: 'Data de cadastro',
            },
            ACTIONS: {
              FIELD: 'actions',
              HEADER: 'Ações',
            },
          },
        },

        DETAILS: {
          UNDEFINED: 'Não definido',
          TITLE_ADD: 'Adicionar ocorrência',
          TITLE_EDIT: 'Editar ocorrência',
          DESCRIPTION_ADD:
            'Preencha os campos abaixo para adicionar uma ocorrência',
          DESCRIPTION_EDIT:
            'Preencha os campos abaixo para editar uma ocorrência',
          SUCCESS_ADD_MESSAGE: 'Ocorrência criada com sucesso!',
          SUCCESS_EDIT_MESSAGE: 'Ocorrência editada com sucesso!',
          SUCCESS_REMOVE_MESSAGE: 'Ocorrência removida com sucesso!',
          FORM: {
            ERROR: {
              CATEGORY: 'Preencha a categoria!',
              PROBLEM_TYPE: 'Preencha o tipo do problema!',
              DESCRIPTION: 'Preencha a descrição!',
              LONGITUDE: 'Preencha a longitude!',
              LATITUDE: 'Preencha a latitude!',
            },
            TITLE: 'Detalhes do perfil',
            CATEGORY: {
              LABEL: 'Categoria',
            },
            PROBLEM_TYPE: {
              LABEL: 'Tipo do problema',
            },
            DESCRIPTION: {
              LABEL: 'Descrição',
            },
            LONGITUDE: {
              LABEL: 'Longitude',
            },
            LATITUDE: {
              LABEL: 'Latitude',
            },
            AUDIO: {
              LABEL: 'Áudio',
            },
            PHOTO: {
              LABEL: 'Imagem',
            },
            BACK: {
              LABEL: 'VOLTAR',
            },
            SUBMIT: {
              LABEL: 'Salvar',
            },
          },
        },
      },

      PROFILE: {
        ROUTE: {
          NAME: 'PERFIS',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/monitoramento/perfis/detalhes/',
        },
        TITLE: 'PERFIS',
        REPORT: {
          TITLE: 'Perfis',
          PAGE_TITLE: 'Perfis',
          PAGE_DESCRIPTION: 'Listagem de perfis',
          PAGE_TITLE_DETAILS: 'Detalhes',

          ADVANCED_FILTER: {
            TITLE: 'Nome',
          },

          TABLE: {
            TITLE: {
              FIELD: 'profileName',
              HEADER: 'Título',
            },
            AUTHOR: {
              FIELD: 'author',
              HEADER: 'Criador',
            },
            CREATED: {
              FIELD: 'createdAt',
              HEADER: 'Data de cadastro',
            },
            ACTIONS: {
              FIELD: 'actions',
              HEADER: 'Ações',
            },
          },
        },

        DETAILS: {
          UNDEFINED: 'Não definido',
          TITLE_ADD: 'Adicionar perfil',
          TITLE_EDIT: 'Editar perfil',
          DESCRIPTION_ADD: 'Preencha os campos abaixo para adicionar um perfil',
          DESCRIPTION_EDIT: 'Preencha os campos abaixo para editar um perfil',
          SUCCESS_ADD_MESSAGE: 'Perfil criado com sucesso!',
          SUCCESS_EDIT_MESSAGE: 'Perfil editado com sucesso!',
          SUCCESS_REMOVE_MESSAGE: 'Perfil removido com sucesso!',
          FORM: {
            ERROR: {
              TITLE: 'Preencha o título!',
            },
            TITLE: 'Detalhes do perfil',
            SUBJECT: {
              LABEL: 'Título',
            },
            BACK: {
              LABEL: 'VOLTAR',
            },
            SUBMIT: {
              LABEL: 'Salvar',
            },
          },
        },
      },

      NOT_FOUND: {
        TITLE: 'Erro 404',
        PAGE_DESCRIPTION:
          'Parece que não encontramos a página solicitada.\nVerifique a url digitada e tente novamente.',
      },

      CHANGE_PASSWORD: {
        ROUTE: {
          NAME: 'ALTERAR SENHA',
          REPORT: 'RELATÓRIO',
          REGISTER: 'REGISTRO',
          DETAILS: '/config/alterar-senha',
        },
        TITLE: 'ALTERAR SENHA',
        REPORT: {
          TITLE: 'Alterar Senha',
          PAGE_TITLE: 'Alterar Senha',
          PAGE_DESCRIPTION: 'Formulário de alteração de senha',
        },

        DETAILS: {
          UNDEFINED: 'Não definido',
          TITLE: 'Alterar senha',
          DESCRIPTION_ADD: 'Preencha os campos abaixo para alterar a senha',
          SUCCESS_MESSAGE: 'Senha alterada com sucesso!',
          FORM: {
            ERROR: {
              PASSWORD: 'Verifique se as senhas são iguais e tente novamente!',
              PASSWORD_EMPTY: 'Preencha o campo senha!',
              OLD_PASSWORD: 'Preencha o campo senha antiga!',
            },
            TITLE: 'Alteração de senha',
            PASSWORD: {
              LABEL: 'Senha segura',
            },
            PASSWORD_CONFIRMATION: {
              LABEL: 'Digite novamente a senha',
            },
            OLD_PASSWORD: {
              LABEL: 'Senha antiga',
            },
            SUBMIT: {
              LABEL: 'Salvar',
            },
          },
        },
      },
    },
  },

  SHARED: {
    CURRENCY_SYMBOL: 'R$',
    SELECT_SOMETHING: 'Selecione...',
    ADD_NEW: 'Adicionar',
    IMPORT_NEW: 'Importar CSV',
    SAVE: 'Salvar',
    ADD_ID: 'registro',
    CANCEL: 'Cancelar',
    DELETE: 'Deletar',
    DAY: 'Dia',
    MONTHS: {
      JANUARY: 'Jan',
      FEBRUARY: 'Fev',
      MARCH: 'Mar',
      APRIL: 'Abr',
      MAY: 'Mai',
      JUNE: 'Jun',
      JULY: 'Jul',
      AUGUST: 'Ago',
      SEPTEMBER: 'Set',
      OCTOBER: 'Out',
      NOVEMBER: 'Nov',
      DECEMBER: 'Dez',
    },
    DAYS_WEEK: {
      SUNDAY: 'D',
      MONDAY: 'S',
      TUESDAY: 'T',
      WEDNESDAY: 'Q',
      THURSDAY: 'Q',
      FRIDAY: 'S',
      SATURDAY: 'S',
    },
    DELETE_ACTION: {
      TITLE: 'Deseja realmente excluir esse item?',
      CONTENT: 'Esta ação é irreversível',
    },
    DATE_FORMAT: 'DD/MM/yyyy',
    DATETIME_FORMAT: 'dd/MM/yyyy hh:mm',
    SEND: 'Enviado',
    PENDING: 'Pendente',
    SCHEDULED: 'Agendado',
    CANCELED: 'Cancelado',
    NO_ALERTS: 'Nenhuma notificação',
    ROLES: {
      NONE: 'Nenhum',
      ADMIN: 'Administrador',
      WEB: 'Web',
      APP: 'Aplicativo',
    },
  },
};

export default ptBr;
