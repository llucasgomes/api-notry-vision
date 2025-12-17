import { Maquina } from "@/types/machines";

export const simulator = {
  gerarValor(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  },

  atualizarKpis(maquina: Maquina) {
    const limites = maquina.simulacao.limites;

    const producao = this.gerarValor(
      limites.producao.min,
      limites.producao.max
    );
    const temperatura = this.gerarValor(20, 60);
    const consumo = this.gerarValor(40, 220);

    maquina.kpisAtuais = {
      ...maquina.kpisAtuais,
      producao,
      temperatura,
      consumoEnergia: consumo,
      vibracao: Number((Math.random() * 5).toFixed(2)),
      velocidadeLinha: this.gerarValor(60, 90),
      pecasBoas: maquina.kpisAtuais.pecasBoas + this.gerarValor(5, 12),
      pecasRuins: maquina.kpisAtuais.pecasRuins + this.gerarValor(0, 2),
      taxaFalha: Number(
        (
          (maquina.kpisAtuais.pecasRuins / (maquina.kpisAtuais.pecasBoas + 1)) *
          100
        ).toFixed(2)
      ),
      pressao: Number((Math.random() * 20).toFixed(2)),
    };

    // ALERTAS
    if (
      temperatura > limites.temperatura.vermelho ||
      consumo > limites.consumoEnergia.vermelho
    ) {
      maquina.alerta = {
        nivel: "vermelho",
        mensagem: "Risco crítico — parar imediatamente.",
      };
    } else if (
      temperatura > limites.temperatura.amarelo ||
      consumo > limites.consumoEnergia.amarelo
    ) {
      maquina.alerta = {
        nivel: "amarelo",
        mensagem: "Atenção — parâmetros fora do normal.",
      };
    } else {
      maquina.alerta = { nivel: "verde", mensagem: null };
    }

    if (maquina.alerta.nivel !== "verde") {
      // HISTÓRICO
      maquina.historico.push({
        hora: new Date().toISOString(),
        producao,
        temperatura,
        consumoEnergia: consumo,
        alerta: maquina.alerta.nivel,
      });
    }

    maquina.ultimaAtualizacao = new Date().toISOString();
  },

  iniciar(maquina: Maquina) {
    console.log(`Simulação iniciada para: ${maquina.nome}`);
    setInterval(
      () => this.atualizarKpis(maquina),
      maquina.simulacao.intervaloAtualizacao
    );
  },

  iniciarTodas(maquinas: Maquina[]) {
    maquinas.forEach((m) => this.iniciar(m));
  },
};
