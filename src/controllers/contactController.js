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
        return res.redirect(`/contact/index/${contact.contact._id}`);
    });
    } catch (err) { 
      console.log(err);
      res.render('404')
    }
   
}

const contactRenderByIdController = async (req, res) => {
  if (!req.params.id) return res.render('404');

  const contactRegister = await Contact.searchContactForId(req.params.id);
  if (!contactRegister) return res.render('404');

  console.log('aqui',contactRegister)

  res.render("contact", { contact: contactRegister })
}

const contactEditController = async (req, res) => {
  if (!req.params.id) return res.render('404');

  try {
    const contact = new Contact(req.body);
    await contact.editContactInfos(req.params.id);
  
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
  
    req.flash('success', contact.success);
    req.session.contacts = contact.contact;

    req.session.save(() => {
      return res.redirect(`/contact/index/${contact.contact._id}`);
    })
  } catch (error) {
    console.error(error);
    res.render('404');
 }
  
}

module.exports = {contactIndexController, contactController, contactRenderByIdController, contactEditController}