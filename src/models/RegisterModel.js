const mongoose = require("mongoose");
const validator = require("validator");

const RegisterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.model("Register", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
    this.success = "Usuario cadastrado com sucesso";
  }

  async register() {
    this.validation();

    if (this.errors.length > 0) return;
    try {
      this.registerUser = await RegisterModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
  }

  validation() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido");

    if (this.body.password.length < 4 || this.body.password.length > 50) {
      this.errors.push("Senha invalida");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Register;
