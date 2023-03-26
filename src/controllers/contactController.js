const Contact = require('../models/ContactModel');

const contactIndexController = async (req, res) => { 
    res.render("contact")
}

const contactController = async (req, res) => { 
  try { 
        const contact = new Contact(req.body);

        await contact.constactRegister();
    
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.rendirect('back'));
            return;
        }
    
        req.flash('success', contact.success);
      req.session.save(() => {
        return res.redirect("/");
    });
    } catch (err) { 
      console.log(err);
      res.render('404')
    }
   
}

module.exports = {contactIndexController, contactController}