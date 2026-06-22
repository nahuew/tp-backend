import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";
import { validatePassword } from "../utils/validators.js";

const showLogin = (req, res) => {
  res.render("login");
};

const showSignUp = (req, res) => {
  res.render("signUp");
};

// ----------------------
// SIGN UP
// ----------------------
const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.session.flash = {
        type: "error",
        message: "Todos los campos son obligatorios"
      };
      return res.redirect("/signUp");
    }

    if (!validatePassword(password)) {
      req.session.flash = {
        type: "error",
        message: "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un caracter especial"
      };
      return res.redirect("/signUp");
    }

    const emailNormalized = email.toLowerCase().trim();

    const userFound = await User.findOne({ email: emailNormalized });

    if (userFound) {
      req.session.flash = {
        type: "error",
        message: "Email ya registrado"
      };
      return res.redirect("/signUp");
    }

    const passwordHash = await hashPassword(password);

    await User.create({
      name,
      email: emailNormalized,
      passwordHash,
      role: "user"
    });

    req.session.flash = {
      type: "success",
      message: "Usuario creado correctamente"
    };

    return res.redirect("/login");

  } catch (error) {
    console.log(error);

    req.session.flash = {
      type: "error",
      message: "Error al registrar usuario"
    };

    return res.redirect("/signUp");
  }
};

export {
  showLogin,
  showSignUp,
  userSignUp
};