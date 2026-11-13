export function validarId(id) {
    const valor = String(id);
    return /^[1-9]\d*$/.test(valor) && Number.isSafeInteger(Number(valor));
}
