const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    LastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    createdAt: { type: Date, required: false, default: Date.now() },
});

const ContactModel = mongoose.model("Contacts", ContactSchema);


class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
    this.success = 'Contato cadastrado com sucesso';
  }

 static async searchContactForId (id) { 
    if (typeof id !== "string") return; 
    const user = await ContactModel.findById(id);

   if (!user) return;
    return user;
  }
    
   async constactRegister() {
       this.validation();
       if (this.errors.length > 0) return; 

       this.contactExists();

       if (this.errors.length > 0) return; 
       
     this.contact = await ContactModel.create(this.body);
   }
    
   async contactExists() {
    const contactExist = await ContactModel.findOne({ mail: this.body.email })
    
    if(contactExist) this.errors.push("Contato já cadastrado")
   }
    
   validation() {
    this.cleanUp();

       if (!this.body.name) this.errors.push("Nome do contato é obrigatório");
       
       if (!this.body.phone && !this.body.email) this.errors.push("Telefone ou o E-mail do contato deve ser adicionado");

       if (this.body.email) {
           if (!validator.isEmail(this.body.email)) this.errors.push("E-mail inválido");
       }

    if (this.body.phone) {
        if(this.body.phone.length < 9 || this.body.phone.length > 11) this.errors.push("Número de telefone inválido");
    }
   }
    
   cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      email: this.body.email,
      phone: this.body.phone,
    };
  }
    
}

module.exports = Contact;