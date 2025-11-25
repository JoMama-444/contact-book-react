import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (name.trim() === '' || phone.trim() === '') {
      alert('Пожалуйста, заполните оба поля!');
      return;
    }
    const newContact = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim()
    };
    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="App">
      <h1>📒 Книга контактов</h1>
      
      {/* Форма для добавления нового контакта */}
      <div className="contact-form">
        <input
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Введите телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={addContact}>Добавить контакт</button>
      </div>

      {/* Список контактов */}
      <div className="contacts-list">
        {contacts.length === 0 ? (
          <p>Список контактов пуст. Добавьте первый контакт!</p>
        ) : (
          contacts.map(contact => (
            <div key={contact.id} className="contact-item">
              <div className="contact-info">
                <strong>{contact.name}</strong>
                <span>{contact.phone}</span>
              </div>
              <button 
                className="delete-btn"
                onClick={() => deleteContact(contact.id)}
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
