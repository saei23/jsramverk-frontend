import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const UpdateDocument = () => {
  const { _id } = useParams(); // Hämta ID för dokumentet från URL-parametern
  const navigate = useNavigate();
  const [document, setDocument] = useState({
    title: '',
    content: ''
  });

  const [socket, setSocket] = useState(null);
  const [comments, setComments] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [newComment, setNewComment] = useState(null);

  // Hämta dokumentet när komponenten monteras
  useEffect(() => {
    const newSocket = io('http://localhost:1337');
    setSocket(newSocket);

    fetchDocument();

    newSocket.on('content', (data) => {
      if (data._id === _id) {
        setDocument((prevDoc) => ({
          ...prevDoc,
          content: data.content
        }));
      }
    });

    newSocket.on('newComment', (comment) => {
      if (comment.documentId === _id) {
        console.log('New comment received:', comment);
        setComments((prevComments) => [...prevComments, comment]);
      }
    });

    return () => newSocket.close();
  }, [_id]);

  const fetchDocument = async () => {
    try {
      const result = await axios.post('http://localhost:1337/graphql', {
        query: `
          query GetDocument($_id: ID!) {
            document(_id: $_id) {
              _id
              title
              content
            }
          }
        `,
        variables: {
          _id
        }
      });
      setDocument(result.data.data.document);
      setComments(result.data.data.document.comments || []);
    } catch (error) {
      console.error('Error fetching document:', error);
      alert('Could not retrieve the document.');
    }
  };

  // Hantera formulärändringar
  const handleChange = (e) => {
    const updatedDoc = {
      ...document,
      [e.target.name]: e.target.value
    };
    setDocument(updatedDoc);

    if (socket) {
      socket.emit('content', { ...updatedDoc, _id});
    }
  };

  // Hantera formulärsubmitting för att uppdatera dokumentet
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1337/graphql', {
        query: `
          mutation UpdateDocument($_id: ID!, $title: String, $content: String) {
            updateDocument(_id: $_id, title: $title, content: $content) {
              _id
              title
              content
            }
          }
        `,
        variables: {
          _id,
          title: document.title,
          content: document.content
        }
      });
      alert('Document updated successfully!');
      navigate(`/document/${_id}`);
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Failed to update document.');
    }
  };

  // Hantera radering av dokument
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this document?');
    if (!confirmDelete) return;
  
    try {
      await axios.post('http://localhost:1337/graphql', {
        query: `
          mutation DeleteDocument($_id: ID!) {
            deleteDocument(_id: $_id) {
              _id
            }
          }
        `,
        variables: {
          _id
        }
      });
      alert('Document deleted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document.');
    }
  };

  const handleAddComment = () => {
    if (newComment && selectedLine != null && socket) {
      const commentData = {
        documentId: _id,
        lineNumber: selectedLine,
        comment: newComment
      };

      console.log('Sending comment:', commentData);
      socket.emit('addComment', commentData);
      setNewComment('');
    } else {
      console.warn("Missing comment or line selection");
    }
  };

  return (
    <div className="create-document">
      <h2>Uppdatera dokument</h2>
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

      {/* Kommentarer */}
      <div className="comment-section">
        <h3>Kommentarer</h3>
        <select onChange={(e) => setSelectedLine(Number(e.target.value))}>
          <option value={null}>Välj rad att kommentera</option>
          {document.content.split('\n').map((_, index) => (
            <option key={index} value={index}>{`Rad ${index + 1}`}</option>
          ))}
        </select>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Skriv din kommentar här"
        ></textarea>
        <button onClick={handleAddComment}>Lägg till kommentar</button>

        {/* Visa kommentarer */}
        <div className="comments-list">
          {comments && comments.map((comment, idx) => (
            <div key={idx}>
              <strong>Rad {comment.lineNumber + 1}:</strong>
              {comment.comment || 'Ingen text'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateDocument;
