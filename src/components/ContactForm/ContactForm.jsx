import { Form, Formik, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { FormButton, FormLabel, FormSpan } from './ContactForm.styled';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from 'components/features/contactsSlice';

const initialValues = {
  name: '',
  number: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required(),
  number: Yup.number().required(),
});

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const checkName = name => {
    return contacts.filter(contact => contact.name === name).length > 0;
  };

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    if (checkName(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact({ id: nanoid(), name, number }));
    resetForm();
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormLabel>
          <FormSpan>Name</FormSpan>
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" />
          <FormSpan>Number</FormSpan>
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" />
        </FormLabel>
        <FormButton type="submit">add contact</FormButton>
      </Form>
    </Formik>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  checkName: PropTypes.func,
  handleSubmit: PropTypes.func,
  contacts: PropTypes.array,
  dispatch: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
  resetForm: PropTypes.func,
};
