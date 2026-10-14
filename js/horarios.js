// Regras de horário da agenda (usado por agenda.js e pdf.js)
// Duração de cada serviço, em horas
const DURACAO_SERVICO = { 'Instalação': 2, 'Desinstalação': 1, 'Manutenção': 2 };
// Expediente: manhã 08–12h e tarde 13–17h (12h às 13h é almoço, bloqueado)
const EXPEDIENTE = [[8, 12], [13, 17]];

const duracaoServico = s => DURACAO_SERVICO[s] ?? 2;
const horaDe = h => String(h).padStart(2, '0') + ':00';
const horaInt = hhmm => parseInt(String(hhmm).slice(0, 2), 10);
// o serviço que começa em `ini` e dura `dur` horas termina dentro do mesmo turno?
const cabeNoExpediente = (ini, dur) => EXPEDIENTE.some(([a, b]) => ini >= a && ini + dur <= b);
// horários de início possíveis para o serviço (de hora em hora)
function horariosDoServico(servico) {
  const dur = duracaoServico(servico), lista = [];
  for (let h = 8; h < 17; h++) if (cabeNoExpediente(h, dur)) lista.push(horaDe(h));
  return lista;
}
// ex.: "08:00 às 10:00"
const faixaHorario = a => horaDe(horaInt(a.horario)) + ' às ' + horaDe(horaInt(a.horario) + duracaoServico(a.servico));
