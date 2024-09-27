import User from "../models/LoginSchema.js";

export const getAllTodos = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    res.status(200).json({ todos: user.items });
    console.log({ todos: user.items });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
