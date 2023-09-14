import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import {
  Layout,
  BtnOpen,
  Contacts,
  BtnClose,
  Title,
  SubTitle,
  Massage,
} from './Loyaut';

const localStorageKey = 'contacts';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  },
};

Modal.setAppElement('#root');

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem(localStorageKey);
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const addContact = newContact => {
    contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    )
      ? alert(`${newContact.name} is already in contact`)
      : setContacts(prevState => [...prevState, newContact]);
  };

  const handleDelete = deleteContactEl => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== deleteContactEl)
    );
  };

  const searchByFilter = newFilter => {
    setFilter(newFilter);
  };

  const visiblesContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <Title>Phonebook</Title>
      <BtnOpen onClick={openModal}>
        <AiOutlineUserAdd size={45} />
      </BtnOpen>

      <Contacts>
        <SubTitle>Contacts</SubTitle>

        {contacts.length > 0 ? (
          <div>
            <Filter onChange={searchByFilter} filter={filter} />
            <ContactList contacts={visiblesContacts} onClick={handleDelete} />
          </div>
        ) : (
          <Massage>Contact list is empty</Massage>
        )}
      </Contacts>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <BtnClose onClick={closeModal}>
          <AiOutlineClose size={25} />
        </BtnClose>
        <ContactForm
          onAddContact={addContact}
          onClose={closeModal}
          style={customStyles}
        />
      </Modal>
    </Layout>
  );
};
