export const maquinas= [
    {
      id: "M-01",
      nome: "Extrusora A-21",
      setor: "Extrusão",
      status: "operacional",
      alerta: { nivel: "verde" as const, mensagem: null },
      kpisAtuais: {
        producao: 150,
        temperatura: 40,
        consumoEnergia: 90,
        vibracao: 2.3,
        velocidadeLinha: 70,
        pecasBoas: 400,
        pecasRuins: 10,
        taxaFalha: 2.5,
        pressao: 14.1
      },
      metas: { producaoHora: 200, temperaturaMax: 55, consumoMax: 180 },
      pecasDefeituosas: [],
      historico: [],
      simulacao: {
        intervaloAtualizacao: 4000,
        limites: {
          temperatura: { amarelo: 45, vermelho: 55 },
          consumoEnergia: { amarelo: 150, vermelho: 200 },
          producao: { min: 100, max: 300 }
        }
      },
      ultimaAtualizacao: null
    },

    {
      id: "M-02",
      nome: "Injetora B-10",
      setor: "Injeção",
      status: "operacional",
      alerta: { nivel: "verde" as const, mensagem: null },
      kpisAtuais: {
        producao: 120,
        temperatura: 38,
        consumoEnergia: 110,
        vibracao: 1.8,
        velocidadeLinha: 68,
        pecasBoas: 350,
        pecasRuins: 6,
        taxaFalha: 1.7,
        pressao: 12.5
      },
      metas: { producaoHora: 180, temperaturaMax: 50, consumoMax: 170 },
      pecasDefeituosas: [],
      historico: [],
      simulacao: {
        intervaloAtualizacao: 4500,
        limites: {
          temperatura: { amarelo: 47, vermelho: 55 },
          consumoEnergia: { amarelo: 140, vermelho: 190 },
          producao: { min: 80, max: 250 }
        }
      },
      ultimaAtualizacao: null
    },

    {
      id: "M-03",
      nome: "Montadora C-55",
      setor: "Montagem",
      status: "operacional",
      alerta: { nivel: "verde" as const, mensagem: null },
      kpisAtuais: {
        producao: 100,
        temperatura: 35,
        consumoEnergia: 80,
        vibracao: 1.3,
        velocidadeLinha: 65,
        pecasBoas: 280,
        pecasRuins: 4,
        taxaFalha: 1.4,
        pressao: 10.7
      },
      metas: { producaoHora: 160, temperaturaMax: 50, consumoMax: 160 },
      pecasDefeituosas: [],
      historico: [],
      simulacao: {
        intervaloAtualizacao: 5000,
        limites: {
          temperatura: { amarelo: 46, vermelho: 54 },
          consumoEnergia: { amarelo: 130, vermelho: 180 },
          producao: { min: 70, max: 220 }
        }
      },
      ultimaAtualizacao: null
    },

    {
      id: "M-04",
      nome: "Extrusora A-30",
      setor: "Extrusão",
      status: "operacional",
      alerta: { nivel: "verde" as const, mensagem: null },
      kpisAtuais: {
        producao: 170,
        temperatura: 42,
        consumoEnergia: 120,
        vibracao: 2.9,
        velocidadeLinha: 75,
        pecasBoas: 410,
        pecasRuins: 9,
        taxaFalha: 2.1,
        pressao: 15.0
      },
      metas: { producaoHora: 210, temperaturaMax: 55, consumoMax: 185 },
      pecasDefeituosas: [],
      historico: [],
      simulacao: {
        intervaloAtualizacao: 4500,
        limites: {
          temperatura: { amarelo: 44, vermelho: 56 },
          consumoEnergia: { amarelo: 150, vermelho: 200 },
          producao: { min: 120, max: 320 }
        }
      },
      ultimaAtualizacao: null
    },

    {
      id: "M-05",
      nome: "Injetora B-20",
      setor: "Injeção",
      status: "operacional",
      alerta: { nivel: "verde" as const, mensagem: null },
      kpisAtuais: {
        producao: 130,
        temperatura: 39,
        consumoEnergia: 100,
        vibracao: 1.7,
        velocidadeLinha: 67,
        pecasBoas: 360,
        pecasRuins: 7,
        taxaFalha: 1.9,
        pressao: 11.9
      },
      metas: { producaoHora: 185, temperaturaMax: 53, consumoMax: 175 },
      pecasDefeituosas: [],
      historico: [],
      simulacao: {
        intervaloAtualizacao: 4200,
        limites: {
          temperatura: { amarelo: 45, vermelho: 54 },
          consumoEnergia: { amarelo: 135, vermelho: 190 },
          producao: { min: 90, max: 260 }
        }
      },
      ultimaAtualizacao: null
    },

    {
      id: "M-06",
      nome: "Montadora C-70",
      setor: "Montagem",
      status: "operacional",
      alerta: { nivel: "verde" as const, mensagem: null },
      kpisAtuais: {
        producao: 95,
        temperatura: 34,
        consumoEnergia: 85,
        vibracao: 1.5,
        velocidadeLinha: 63,
        pecasBoas: 260,
        pecasRuins: 5,
        taxaFalha: 1.8,
        pressao: 9.8
      },
      metas: { producaoHora: 150, temperaturaMax: 50, consumoMax: 150 },
      pecasDefeituosas: [],
      historico: [],
      simulacao: {
        intervaloAtualizacao: 5000,
        limites: {
          temperatura: { amarelo: 46, vermelho: 55 },
          consumoEnergia: { amarelo: 125, vermelho: 170 },
          producao: { min: 60, max: 210 }
        }
      },
      ultimaAtualizacao: null
    }
  ]