const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const RegisterSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.model("User", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.registerUser = null;
    this.success = "Usuario cadastrado com sucesso";
  }

  async register() {
    this.validation();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    this.registerUser = await RegisterModel.create(this.body);
  }

  async userExists() {
    const user = await RegisterModel.findOne({
      $or: [{ email: this.body.email }, { userName: this.body.userName }],
    });

    if (user) this.errors.push("Usuário já cadastrado");
  }

  validation() {
    this.cleanUp();

    if (!this.body.userName) this.errors.push("Nome de usuário inválido");

    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido");

    if (this.body.password.length < 4) {
      this.errors.push("Senha inválida");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      userName: this.body.userName,
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = { Register, Users: RegisterModel };
