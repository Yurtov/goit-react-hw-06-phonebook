import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import {
  StyledForm,
  Label,
  StyledField,
  StyledErrorMessage,
  Button,
} from './ContactForm.styled';

const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required')
    .matches(
      nameRegExp,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: Yup.string()
    .matches(
      phoneRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export const ContactForm = ({ onAddContact, onClose }) => (
  <Formik
    initialValues={{
      name: '',
      number: '',
    }}
    validationSchema={schema}
    onSubmit={(values, actions) => {
      onAddContact({
        id: nanoid(),
        ...values,
      });
      onClose();
      actions.resetForm();
    }}
  >
    <StyledForm>
      <Label>
        Name <AiOutlineUser />
        <StyledField name="name" />
        <br />
        <StyledErrorMessage name="name" component="div" />
      </Label>

      <Label>
        Number <AiOutlinePhone />
        <StyledField name="number" />
        <br />
        <StyledErrorMessage name="number" component="div" />
      </Label>

      <Button type="submit">
        Add contact
      </Button>
    </StyledForm>
  </Formik>
);
