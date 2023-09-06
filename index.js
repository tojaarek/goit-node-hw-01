const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts.js');
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = listContacts();
      contacts.forEach(({ id, name, email, phone }) => {
        console.log(
          `id: ${id}, name: ${name}, email: ${email}, phone: ${phone}`
        );
      });
      break;

    case 'get':
      const contact = getContactById(id);
      console.log(
        `id: ${contact.id}, name: ${contact.name}, email: ${contact.email}, phone: ${contact.phone}`
      );
      break;

    case 'add':
      const newContact = addContact(name, email, phone);
      console.log(`Contact added successfully with id: ${newContact.id}`);
      break;

    case 'remove':
      removeContact(id);
      console.log(`Contact with id ${id} removed successfully.`);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
