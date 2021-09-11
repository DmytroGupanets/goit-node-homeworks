const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return contacts;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = await contacts.find((item) => item.id === contactId);

    return contact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

async function removeContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const idx = await contacts.findIndex((item) => item.id === contactId);
    const response = contacts[idx];
    contacts.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return response;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };

  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  contacts.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
};
