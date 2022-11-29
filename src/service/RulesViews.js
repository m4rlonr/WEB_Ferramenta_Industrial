const validaNome = [
  (v) => !!v || "Nome é necessário",
  (v) => (v && v.length <= 30) || "Name must be less than 30 caracteres",
];

const emailRules = [
  (v) => !!v || "E-mail é necessário",
  (v) =>
    !v ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "E-mail não é válido",
];

const telefoneRules = [
  (v) => !!v || "Telefone é necessário.",
  (v) =>
    v.length > 10 ||
    "Telefone não válido, deve conter 11 caracteres sendo necessário DDD + telefone",
  (v) =>
    v.length < 12 ||
    "Telefone não válido, excede 11 caracteres sendo apenas necessário DDD + telefone",
];

const textoLongo = [
  (v) => !!v || "Campo é necessário",
  (v) => v.length <= 200 || "Nome não pode exceder 200 caracteres",
];

const textoCurto = [
  (v) => !!v || "Campo é necessário",
  (v) => v.length <= 30 || "Nome não pode exceder 30 caracteres",
];

export { validaNome, emailRules, telefoneRules, textoLongo, textoCurto };
