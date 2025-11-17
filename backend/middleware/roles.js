export const permit = (...allowed) => {
  return (req, res, next) => {
    const { role } = req.user || {};
    if (!role || !allowed.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
