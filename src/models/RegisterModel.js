const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const RegisterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.model("Users", RegisterSchema);

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

    await this.userExists();
    
    if (this.errors.length > 0) return;

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    this.registerUser = await RegisterModel.create(this.body);
   
  }

  async userExists() {
    const user = await RegisterModel.findOne({ email: this.body.email })
    
    if(user) this.errors.push("Usuário já cadastrado")
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

module.exports = { Register, Users: RegisterModel};
