import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactList = localStorage.getItem('contactList');
    if (contactList) {
      try {
        const parseContactList = JSON.parse(contactList);
        this.setState({ contacts: parseContactList });
      } catch {
        this.setState({ contacts: [] });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contactList', JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  filteredContacts = value => {
    const filterNormalize = value.toLowerCase();

    return this.state.contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(filterNormalize);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  formSubmit = ({ name, number }) => {
    this.setState(prevState => {
      const isContact = prevState.contacts.find(
        contact => contact.name === name,
      );

      if (isContact) {
        alert(`${name} is already in contact`);
        return prevState.contacts;
      } else {
        return {
          contacts: [
            {
              id: nanoid(),
              name,
              number,
            },
            ...prevState.contacts,
          ],
        };
      }
    });
  };

  contactDelete = e => {
    this.setState(prevState => {
      const contactsAfterDelete = prevState.contacts.filter(
        contact => contact.id !== e.target.id,
      );
      return { contacts: [...contactsAfterDelete] };
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Phone Book</h1>
        <ContactForm onSubmit={this.formSubmit} />

        <h2>Contacts</h2>
        <Filter
          title="Find contact by name"
          onChange={this.handleFilterChange}
          value={this.state.filter}
        />
        <ContactList
          onFilter={this.filteredContacts}
          filter={this.state.filter}
          onDelete={this.contactDelete}
        />
      </div>
    );
  }
}

export { App };
