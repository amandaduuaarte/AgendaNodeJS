const { Users } = require("./RegisterModel");
const bcrypt = require("bcryptjs");

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.success = "Login realizado com sucesso!";
    this.user = null;
  }

  async logar() {
    this.validateUser();

    if (this.errors.length > 0) return;

    this.user = await Users.findOne({ email: this.body.email });

    if (this.errors.length > 0) return;

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Credencias invalidas");
      return;
    }
  }

  async validateUser() {
    const user = await Users.findOne({ email: this.body.email });

    if (!user) this.errors.push("Usuário não cadastrado");
  }
}

module.exports = Login;
