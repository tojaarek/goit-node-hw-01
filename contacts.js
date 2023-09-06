const { nanoid } = require('nanoid');
const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  try {
    const data = fs.readFileSync(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
    return;
  }
}

function getContactById(contactId) {
  const contacts = listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  return findContact || console.error(`There's no contact with ${contactId}`);
}

function removeContact(contactId) {
  const contacts = listContacts();
  const findContact = contacts.findIndex((contact) => contact.id === contactId);

  if (findContact === -1) {
    console.error(`There's no contact with id ${contactId}`);
    return;
  }

  contacts.splice(findContact, 1);

  try {
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    return findContact;
  } catch (error) {
    console.error(error.message);
    return;
  }
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  try {
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
