import { permissions } from "../config/permissionMap.js";

export const authorize = (module, action) => {
  return (req, res, next) => {
    const role = req.user?.role;

    if (!role) {
      return res.redirect("/login");
    }

    const allowedRoles = permissions[module]?.[action];

    if (!allowedRoles || !allowedRoles.includes(role)) {
      return res.status(403).render("403", {
        error: "No tienes permisos para realizar esta acción"
      });
    }

    next();
  };
};