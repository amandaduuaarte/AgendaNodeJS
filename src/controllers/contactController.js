const Contact = require('../models/ContactModel');

const contactIndexController = async (req, res) => { 
  res.render("contact", {
      contact: {}
    })
}

const contactController = async (req, res) => { 
  try { 
        const contact = new Contact(req.body);

        await contact.constactRegister();
    
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }
    
    req.flash('success', contact.success);
    req.session.contacts = contact.contact;
      req.session.save(() => {
        return res.redirect(`/contact/${contact.contact._id}`);
    });
    } catch (err) { 
      console.log(err);
      res.render('404')
    }
   
}

const contactEditController = async (req, res) => {
 
  if (!req.params.id) return res.render('404');

  const user = await Contact.searchContactForId(req.params.id);
  if (!user) return res.render('404');
 
  console.log(user);

  res.render("contact", {
    contact: user
  })
}
module.exports = {contactIndexController, contactController, contactEditController}