export const setFlash = (req, type, message, redirectTo) => {
  req.session.flash = { type, message };
  return redirectTo;
};