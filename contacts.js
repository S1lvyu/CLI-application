const path = require("path");
const fs = require("fs");
const nanoid = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(`Reading file error: ${error}`);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactbyId(id) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(`Reading file error: ${error}`);
      return;
    }

    const contacts = JSON.parse(data);
    if (!contacts.some((contact) => contact.id === id)) {
      console.error("There is no contact with this id");
      return;
    }
    const contact = contacts.filter((item) => {
      return id === item.id;
    });
    console.log(contact);
  });
}
function removeContact(id) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(`Reading file error: ${error}`);
      return;
    }

    const contacts = JSON.parse(data);
    if (!contacts.some((contact) => contact.id === id)) {
      console.error("There is no contact with this id");
      return;
    }
    const newContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, 2),
      (error) => {
        if (error) {
          console.error(`Writing error : ${error}`);
          return;
        }
        console.log("Contact deleted succesfully");
      }
    );
  });
}
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error(`Reading file error: ${error}`);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        console.error(`Writing error : ${error}`);
        return;
      }
      console.log("Contact added succesfully");
    });
  });
}

module.exports = { listContacts, getContactbyId, removeContact, addContact };
