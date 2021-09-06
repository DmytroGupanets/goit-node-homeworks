const contactsOperation = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listOfContacts = await contactsOperation.listContacts();
      console.log(listOfContacts);
      break;

    case "get":
      const reqContact = await contactsOperation.getContactById(id);
      console.log(reqContact);
      break;

    case "add":
      const addContact = await contactsOperation.addContact(name, email, phone);
      console.log(addContact);
      break;

    case "remove":
      const removedContact = await contactsOperation.removeContactById(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
