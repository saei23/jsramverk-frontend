import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Read = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Use navigate to programmatically navigate to edit page

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get('https://jsramverk-emlx23-d5hyekcpbdcxdjch.swedencentral-01.azurewebsites.net');
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to navigate to the edit page
  const editDocument = (_id) => {
    navigate(`/update/${_id}`);
  };

  return (
    <div>
      <h3>Alla dokument i databasen</h3>
      {/* Render a table instead of JSON */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through data to generate table rows */}
          {data.map((doc) => (
            <tr key={doc._id}>
              <td>{doc._id}</td>
              <td>{doc.title || '"saknas"'}</td>
              <td>{doc.content || '"saknas"'}</td>
              
              <td>
                <button onClick={() => editDocument(doc._id)} style={{ cursor: 'pointer' }}>
                  Redigera
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;