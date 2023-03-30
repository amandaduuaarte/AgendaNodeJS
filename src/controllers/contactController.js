const Contact = require('../models/ContactModel');

const contactIndexController = async (req, res) => { 
  res.render("contact", {
      contact: {}
    });
};

const contactController = async (req, res) => { 
  try { 
    const contact = new Contact(req.body);

    await contact.constactRegister();
    
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      return res.redirect('back');
    }
    
    req.flash('success', contact.success);
    req.session.contacts = contact.contact;

    return res.redirect(`/contact/index/${contact.contact._id}`);
  } catch (err) { 
    console.error(err);
    return res.render('404');
  }   
};

const contactRenderByIdController = async (req, res) => {
  try {
    const contactRegister = await Contact.searchContactForId(req.params.id);
    if (!contactRegister) {
      return res.render('404');
    }
    res.render("contact", { contact: contactRegister });
  } catch (err) {
    console.error(err);
    return res.render('404');
  }
};

const contactEditController = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.editContactInfos(req.params.id);
  
    if (contact.errors.le) {
      req.flash('errors', contact.errors);
      return res.redirect('back');
    }
  
    req.flash('success', contact.success);
    req.session.contacts = contact.contact;

    return res.redirect(`/contact/index/${contact.contact._id}`);
  } catch (error) {
    console.error(error);
    return res.render('404');
  }
};

const contactDeleteController = async (req, res) => { 
  try {
    const contactForDelete = await Contact.deleteContacts(req.params.id);
    if (!contactForDelete) {
      return res.render('404');
    }
    req.flash('success', 'Contato deletado com sucesso.');
    return res.redirect('back');
  } catch (err) {
    console.error(err);
    return res.render('404');
  }
};

module.exports = {
  contactIndexController,
  contactController,
  contactRenderByIdController,
  contactEditController,
  contactDeleteController,
};
