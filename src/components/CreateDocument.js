import React, { useState } from 'react';
import axios from 'axios';

const CreateDocument = ({ refreshData }) => {
  const [document, setDocument] = useState({
    title: '',
    content: ''
  });

  // GraphQL endpoint URL
  const graphqlEndpoint = 'http://localhost:1337/graphql'; // Replace with your actual GraphQL endpoint

  // Define the GraphQL mutation as a string
  const GRAPHQL_MUTATION = `
    mutation addDocument($title: String!, $content: String!) {
      addDocument(title: $title, content: $content) {
        _id
        title
        content
      }
    }
  `;

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
    console.log("Document to be added (frontend):", document);

    try {
      // Send POST request with GraphQL mutation to backend API
      await axios.post(graphqlEndpoint, {
        query: GRAPHQL_MUTATION,
        variables: {
          title: document.title,
          content: document.content
        }
      });

      //refresh data or reset form
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
