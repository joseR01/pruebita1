export function convertirSegundos(segundos) {
  const unDiaEnSegundos = 86400; // 60 segundos * 60 minutos * 24 horas

  // Calcular días
  const dias = Math.floor(segundos / unDiaEnSegundos);

  // Calcular horas
  segundos %= unDiaEnSegundos;
  const horas = Math.floor(segundos / 3600); // 60 minutos * 60 segundos

  // Calcular minutos
  segundos %= 3600;
  const minutos = Math.floor(segundos / 60);

  return {
    dias,
    horas,
    minutos
  };
}

