import React, { useState, useEffect } from 'react';

function Home() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch('/api/documents')
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Document List</h1>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            <a href={`/document/${doc.id}`}>{doc.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
