import React, { useState } from 'react';
import axios from 'axios';

const CreateDocument = ({ refreshData }) => {
  const [document, setDocument] = useState({
    title: '',
    content: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setDocument({
      ...document,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend API (adjust URL as needed)
      await axios.post('http://localhost:5000/data', document);
      
      // Optionally, refresh data or reset form
      setDocument({ title: '', content: '' });
      if (refreshData) refreshData();
      alert('Document added successfully!');
    } catch (error) {
      console.error('Error creating document:', error);
      alert('Failed to add document.');
    }
  };

  return (
    <div className="create-document">
      <h2>Skapa ett nytt dokument</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={document.title}
            onChange={handleChange}
            placeholder="Enter document title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            id="content"
            value={document.content}
            onChange={handleChange}
            placeholder="Enter document content"
            rows="8"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Skapa dokument</button>
      </form>
    </div>
  );
};

export default CreateDocument;