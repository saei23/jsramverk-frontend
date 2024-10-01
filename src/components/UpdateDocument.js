import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateDocument = () => {
  const { _id } = useParams(); // Hämta ID för dokumentet från URL-parametern
  const navigate = useNavigate();
  const [document, setDocument] = useState({
    title: '',
    content: ''
  });

  // Hämta dokumentet när komponenten monteras
  useEffect(() => {
    fetchDocument();
  }, [_id]);

  // Hämta dokument från servern
  const fetchDocument = async () => {
    try {
      const result = await axios.get(`http://localhost:1337/${_id}`);
      setDocument(result.data); 
    } catch (error) {
      console.error('Error fetching document:', error);
      alert('Could not retrieve the document.');
    }
  };

  // Hantera formulärändringar
  const handleChange = (e) => {
    setDocument({
      ...document,
      [e.target.name]: e.target.value
    });
  };

  // Hantera formulärsubmitting för att uppdatera dokumentet
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Document ID to update (frontend):", _id); // Check `_id` before making PUT request
    try {
      // Skicka PUT-förfrågan för att uppdatera dokumentet
      await axios.put(`http://localhost:1337/${_id}`, document);
      alert('Document updated successfully!');
      navigate(`/document/${_id}`); // Navigera till dokumentets detaljsida efter uppdatering
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Failed to update document.');
    }
  };

  // Hantera radering av dokument
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Är du säker på att du vill radera detta dokument?');
    if (!confirmDelete) return;

    try {
      // Skicka DELETE-förfrågan för att ta bort dokumentet
      await axios.delete(`http://localhost:1337/${_id}`);
      alert('Document deleted successfully!');
      navigate('/home'); // Navigera tillbaka till hemsidan efter radering
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document.');
    }
  };

  return (
    <div className="update-document">
      <h2>Update Document</h2>
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
        <button type="submit" className="submit-button">Uppdatera document</button>
        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          className="delete-button"

        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default UpdateDocument;