import jwt from "jsonwebtoken";
import { secret } from "../config.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const generateAccessToken = (id, username, roles) => {
  const payload = { id, username, roles };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const { username, password, role } = req.body;
      const candidate = await User.findOne({ username });
      console.log(username, candidate);
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
        role,
      });
      const token = generateAccessToken(user._id, username, user.roles);
      await user.save();

      return res.json({ token });
    } catch (e) {
      res.status(400).json({ message: "Registration error " + e });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь с именем ${user} не найден` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: `Не правильно введены данные`,
        });
      }
      if (user.status === "Banned") {
        return res.status(400).json({
          message: `Вы были забаненны`,
        });
      }
      const token = generateAccessToken(user._id, username, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async check(req, res) {
    const token = generateAccessToken(
      req.user._id,
      req.user.username,
      req.user.roles
    );
    return res.json({ token });
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
  async isAdmin(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });
      return res.json({ isAdmin: user.role === "Admin" });
    } catch (error) {}
  }
}

export default new AuthController();
