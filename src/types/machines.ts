export type NivelAlerta = "verde" | "amarelo" | "vermelho";

export interface Alerta {
  nivel: NivelAlerta;
  mensagem: string | null;
}

export interface KpisAtuais {
  producao: number;
  temperatura: number;
  consumoEnergia: number;
  vibracao: number;
  velocidadeLinha: number;
  pecasBoas: number;
  pecasRuins: number;
  taxaFalha: number;
  pressao: number;
}

export interface Metas {
  producaoHora: number;
  temperaturaMax: number;
  consumoMax: number;
}

export interface LimitesSimulacao {
  temperatura: { amarelo: number; vermelho: number };
  consumoEnergia: { amarelo: number; vermelho: number };
  producao: { min: number; max: number };
}

export interface ConfigSimulacao {
  intervaloAtualizacao: number;
  limites: LimitesSimulacao;
}

export interface RegistroHistorico {
  hora: string;
  producao: number;
  temperatura: number;
  consumoEnergia: number;
  alerta: NivelAlerta;
}

export interface Maquina {
  id: string;
  nome: string;
  setor: string;
  status: string;
  alerta: Alerta;
  kpisAtuais: KpisAtuais;
  metas: Metas;
  pecasDefeituosas: string[];
  historico: RegistroHistorico[];
  simulacao: ConfigSimulacao;
  ultimaAtualizacao: string | null;
}
