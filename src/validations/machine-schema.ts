import { z } from "zod";

export const nivelAlertaSchema = z.enum(["verde", "amarelo", "vermelho"]);
export type NivelAlerta = z.infer<typeof nivelAlertaSchema>;

export const alertaSchema = z.object({
  nivel: nivelAlertaSchema,
  mensagem: z.string().nullable(),
});
export type Alerta = z.infer<typeof alertaSchema>;

export const kpisAtuaisSchema = z.object({
  producao: z.number(),
  temperatura: z.number(),
  consumoEnergia: z.number(),
  vibracao: z.number(),
  velocidadeLinha: z.number(),
  pecasBoas: z.number(),
  pecasRuins: z.number(),
  taxaFalha: z.number(),
  pressao: z.number(),
});
export type KpisAtuais = z.infer<typeof kpisAtuaisSchema>;

export const metasSchema = z.object({
  producaoHora: z.number(),
  temperaturaMax: z.number(),
  consumoMax: z.number(),
});
export type Metas = z.infer<typeof metasSchema>;

export const limitesSimulacaoSchema = z.object({
  temperatura: z.object({
    amarelo: z.number(),
    vermelho: z.number(),
  }),
  consumoEnergia: z.object({
    amarelo: z.number(),
    vermelho: z.number(),
  }),
  producao: z.object({
    min: z.number(),
    max: z.number(),
  }),
});
export type LimitesSimulacao = z.infer<typeof limitesSimulacaoSchema>;

export const configSimulacaoSchema = z.object({
  intervaloAtualizacao: z.number(),
  limites: limitesSimulacaoSchema,
});
export type ConfigSimulacao = z.infer<typeof configSimulacaoSchema>;

export const registroHistoricoSchema = z.object({
  hora: z.string(),
  producao: z.number(),
  temperatura: z.number(),
  consumoEnergia: z.number(),
  alerta: nivelAlertaSchema,
});
export type RegistroHistorico = z.infer<typeof registroHistoricoSchema>;

export const maquinaSchema = z.object({
  id: z.string(),
  nome: z.string(),
  setor: z.string(),
  status: z.string(),
  alerta: alertaSchema,
  kpisAtuais: kpisAtuaisSchema,
  metas: metasSchema,
  pecasDefeituosas: z.array(z.string()),
  historico: z.array(registroHistoricoSchema),
  simulacao: configSimulacaoSchema,
  ultimaAtualizacao: z.string().nullable(),
});
export type Maquina = z.infer<typeof maquinaSchema>;

export const maquinasSchema = z.array(maquinaSchema);
export type Maquinas = z.infer<typeof maquinasSchema>;
