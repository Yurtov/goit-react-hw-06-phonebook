import { Component } from 'react';
import Modal from 'react-modal';
import { AiOutlineUserAdd, AiOutlineClose } from 'react-icons/ai';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout, BtnOpen, Contacts, BtnClose, Title, SubTitle } from './Loyaut';

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

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isModalOpen: false,
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(localStorageKey);
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  addContact = newContact => {
    this.state.contacts.some(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    )
      ? alert(`${newContact.name} is already in contact`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  handleDelete = deleteContactEl => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== deleteContactEl
        ),
      };
    });
  };

  searchByFilter = newFilter => {
    this.setState({ filter: newFilter });
  };

  render() {
    const { contacts, filter } = this.state;

    const visiblesContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <Layout>
        <Title>Phonebook</Title>

        <Filter onChange={this.searchByFilter} filter={filter} />
        <Contacts>
          <SubTitle>Contacts</SubTitle>
          <BtnOpen onClick={this.openModal}>
            <AiOutlineUserAdd size={45} />
          </BtnOpen>
        </Contacts>
        <ContactList contacts={visiblesContacts} onClick={this.handleDelete} />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <BtnClose onClick={this.closeModal}>
            <AiOutlineClose size={25} />
          </BtnClose>
          <ContactForm
            onAddContact={this.addContact}
            onClose={this.closeModal}
            style={customStyles}
          />
        </Modal>
      </Layout>
    );
  }
}
