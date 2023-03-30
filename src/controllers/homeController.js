const Contact = require('../models/ContactModel');

const homeController = async (req, res) => {
  const contacts = await Contact.searchContacts()
  res.render("index", { contacts });

};

module.exports = { homeController };
