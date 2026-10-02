// Máscara de celular brasileiro: (XX) X.XXXX-XXXX, aplicada enquanto a
// pessoa digita. Aceita colar o número em qualquer formato (com +55,
// espaços, traços): só os dígitos contam.

export const DIGITOS_CELULAR = 11;

export function somenteDigitos(valor: string): string {
  let digitos = valor.replace(/\D/g, "");
  // Colou com o código do país (+55 81 9...): descarta o 55.
  if (digitos.length > DIGITOS_CELULAR && digitos.startsWith("55")) {
    digitos = digitos.slice(2);
  }
  return digitos.slice(0, DIGITOS_CELULAR);
}

export function mascararCelular(valor: string): string {
  const d = somenteDigitos(valor);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length === 3) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2, 3)}.${d.slice(3)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)}.${d.slice(3, 7)}-${d.slice(7)}`;
}

// Apagar com backspace logo depois de um ")", "." ou "-" removeria só o
// símbolo, e a máscara o colocaria de volta: o cursor parece travado.
// Nesse caso, apaga também o dígito anterior.
export function aplicarMascaraAoDigitar(
  anterior: string,
  digitado: string,
  apagando: boolean,
): string {
  const digitosAntes = somenteDigitos(anterior);
  const digitosAgora = somenteDigitos(digitado);
  if (apagando && digitado.length < anterior.length && digitosAgora === digitosAntes) {
    return mascararCelular(digitosAntes.slice(0, -1));
  }
  return mascararCelular(digitado);
}
