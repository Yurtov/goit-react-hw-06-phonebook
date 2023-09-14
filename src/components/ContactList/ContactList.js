import { List, ContactItem, Span, DeleteBtn } from './ContactList.styled';
import { AiOutlineDelete } from 'react-icons/ai';

export const ContactList = ({ contacts, onClick }) => {
  return (
    <List>
      {contacts.map(contact => (
        <ContactItem key={contact.id}>
          <Span>
            {contact.name}: {contact.number}
            <DeleteBtn type="button" onClick={() => onClick(contact.id)}>
              <AiOutlineDelete size={27} />
            </DeleteBtn>
          </Span>
        </ContactItem>
      ))}
    </List>
  );
};
