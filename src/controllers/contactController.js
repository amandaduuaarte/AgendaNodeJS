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
      req.session.save(function () {
        res.redirect('back')
      });
      return;
    }
    
    req.flash('success', contact.success);
    req.session.contacts = contact.contact;
      req.session.save(function () {
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

  res.render("contact", { contact: contactRegister })
}

const contactEditController = async (req, res) => {
  if (!req.params.id) return res.render('404');

  try {
    const contact = new Contact(req.body);
    await contact.editContactInfos(req.params.id);
  
    if (contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(function (){
        res.redirect('back')
      });
      return;
    }
  
    req.flash('success', contact.success);
    req.session.contacts = contact.contact;

    req.session.save(function () {
      return res.redirect(`/contact/index/${contact.contact._id}`);
    })
  } catch (error) {
    console.error(error);
    res.render('404');
 }
  
}


const contactDeleteController = async (req, res) => { 
  if (!req.params.id) return res.render('404');

  const contactForDelete = await Contact.deleteContacts(req.params.id);
  if (!contactForDelete) return res.render('404');

  req.flash('success', 'Contato deletado com sucesso.');
      req.session.save(function () {
        return res.redirect('back');
    });
}

module.exports = {contactIndexController, contactController, contactRenderByIdController, contactEditController, contactDeleteController}