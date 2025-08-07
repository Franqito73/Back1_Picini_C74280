const authorization = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado: usuario no logueado" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Prohibido: No tenés acceso a este recurso" });
    }

    next();
  };
};

const authorizeUser = (req, res, next) => {

  const user = req.user;
  const cid = req.params.cid;
 if (user.role === 'admin' || user.cartId === cid) {
    return next();
  } else {
    return res.status(403).json({ message: 'No autorizado para realizar esta compra' });
  }
};

module.exports = {authorization, authorizeUser};
