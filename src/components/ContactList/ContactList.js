import { Contact } from 'components/Contact/Contact';
import { ListStyled } from './Contactlist.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filterContacts = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  const onDeleteContact = id => {dispatch(deleteContact(id))
    
  }

  return (
    <ListStyled>
      {filterContacts().map(({ id, name, number }) => {
        return (
          <Contact
            key={id}
            name={name}
            number={number}
            onDelete={() => onDeleteContact(id)}
            delId={id}
          />
        );
      })}
    </ListStyled>
  );
};

