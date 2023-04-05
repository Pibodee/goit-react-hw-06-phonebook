import { Formik, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { FormButton, StyledField, StyledForm } from './Form.styled';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
      message:
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      excludeEmptyString: true,
    })
    .required('Required'),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      {
        message:
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
        excludeEmptyString: true,
      }
    )
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();


  const handleSubmit = (values, {resetForm}) => {
    const checkedContact = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (checkedContact) {
      alert(`${values.name} is alredy added`)
      return
    }
    dispatch(addContact(values))
    resetForm({
      name: '',
      number: '',
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <StyledForm autoComplete="off">
        <label htmlFor="name">
          Name
          <StyledField type="text" name="name"></StyledField>
          <ErrorMessage name="name" />
        </label>
        <label htmlFor="name">
          Number
          <StyledField type="tel" name="number"></StyledField>
          <ErrorMessage name="number" />
        </label>
        <FormButton type="submit">Add Contact</FormButton>
      </StyledForm>
    </Formik>
  );
};
