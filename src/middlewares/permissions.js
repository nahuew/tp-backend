export const canDeleteJob = (req, res, next) => {
  if (!req.user) return res.redirect("/login");

  if (req.user.role !== "admin") {
    return res.status(403).send("Solo administradores pueden eliminar");
  }

  next();
};