const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
    /* Buscamos o token no header `Authorization` */
  const token = req.headers.authorization;

    /* Caso o token não exista */
  if (!token) {
    const err = new Error('Token not found');
    err.statusCode = 401;
    /* Enviamos o erro para ser tratado pelo middleware de erro */
    return next(err);
  }

  /* Realizamos uma tentativa de validar o token */
  try {
    /* Pedimos para que a bilioteca de JWT valide o token */
    const payload = jwt.verify(token, JWT_SECRET);

    /* Caso não ocorra nenhum erro, significa que o token é válido e podemos continuar
    Armazenamos os dados da pessoa no objeto de request */
    req.user = payload;
    return next();
  } catch (err) {
    /* Caso haja algum erro ao validar o token, adicionamos o status 401 a esse erro */
    err.statusCode = 401;
    /* E enviamos o erro para ser processador pelo middleware de erro. */
    return next(err);   
  }
};
