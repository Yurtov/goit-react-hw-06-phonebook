import { List, ContactItem, Span, DeleteBtn } from './ContactList.styled';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { deleteContact, getContacts } from 'redux/contactsReducer';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();


  const visiblesContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <List>
      {visiblesContacts.length !== 0 ? (
        visiblesContacts.map(contact => (
          <ContactItem key={contact.id}>
            <Span>
              {contact.name}: {contact.number}
              <DeleteBtn
                type="button"
                onClick={() => {
                  dispatch(deleteContact(contact.id));
                }}
              >
                <AiOutlineDelete size={27} />
              </DeleteBtn>
            </Span>
          </ContactItem>
        ))
      ) : (
        <div>Not found</div>
      )}
    </List>
  );
};
