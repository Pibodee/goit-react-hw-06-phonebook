import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './Form/Form';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      return parsedContacts;
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (values, { resetForm }) => {
    let newContact = values;

    const verification = contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (verification.length) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else {
      newContact.id = nanoid();
      setContacts(prevState => [...prevState, newContact]);

      resetForm({
        name: '',
        number: '',
      });
    }
  };


  const onDelete = evtId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== evtId));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter />
      <ContactList onDelete={onDelete} />
    </>
  );
};
