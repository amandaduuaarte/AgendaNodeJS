const Contact = require('../models/ContactModel');

const homeController = async (req, res) => {
  const contacts = await Contact.searchContacts()
  res.render("index", { contacts });

  console.log(contacts)
};

module.exports = { homeController };
