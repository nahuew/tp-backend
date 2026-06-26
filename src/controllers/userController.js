import User from "../models/User.js";

const getUsersView = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.render("users", {
      users
    });
  } catch (error) {
    console.error(error);
    res.redirect("/jobs/view");
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { runValidators: true }
    );

    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.redirect("/users");
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).send("No puedes eliminar tu propio usuario");
    }

    await User.findByIdAndDelete(req.params.id);

    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.redirect("/users");
  }
};

export {
  getUsersView,
  updateUserRole,
  deleteUser
};