import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { config } from "../config";
// const { } = require("./config");

const generateAccessToken = (id, username, roles) => {
  const payload = { id, username, roles };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Значения не введены" });
      }
      const { username, password, roles } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
        roles,
      });
      const token = generateAccessToken(user._id, username, user.roles);
      await user.save();

      return res.json({ token });
    } catch (e) {
        res.status(400).json({ message: "Registration error" });
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
          message: `Пароль ${validPassword} введён не верно`,
        });
      }

      const token = generateAccessToken(user._id, username, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }
}
