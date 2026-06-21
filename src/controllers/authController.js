import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { validatePassword } from "../utils/validators.js";

const showLogin = (req, res) => {
  res.render("login", { error: null });
};

const showSignUp = (req, res) => {
  res.render("signUp", { error: null });
};

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.render("signUp", {
        error: "Todos los campos son obligatorios"
      });
    }

    if (!validatePassword(password)) {
      return res.render("signUp", {
        error:
          "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un caracter especial"
      });
    }

    const emailNormalized = email.toLowerCase().trim();

    const userFound = await User.findOne({ emailNormalized });

    if (userFound) {
      return res.render("signUp", {
        errorMessage: "Ese email ya está registrado"
      });
    }

    const passwordHash = await hashPassword(password);

    await User.create({
      name,
      email: emailNormalized,
      passwordHash
    });

    return res.render("signUp", {
      success: true
    });
    
  } catch (error) {
    return res.render("signUp", {
      errorMessage: "Error al registrar usuario"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailNormalized = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailNormalized });

    if (!user || !await comparePassword(password, user.passwordHash)) {
      return res.render("login", {
        errorMessage: "Email o contraseña incorrectos"
      });
    }

    return res.render("login", {
      successLogin: true
    });

  } catch (error) {
    return res.render("login", {
      errorMessage: "Error al iniciar sesión"
    });
  }
};

export {
    showLogin,
    showSignUp,
    userSignUp,
    login
};