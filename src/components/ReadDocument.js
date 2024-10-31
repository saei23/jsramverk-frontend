import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Read = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Use navigate to programmatically navigate to edit page

  useEffect(() => {
    fetchData();
  }, []);

  // GraphQL endpoint URL
  const graphqlEndpoint = 'https://jsramverk-emlx23-d5hyekcpbdcxdjch.swedencentral-01.azurewebsites.net/graphql'; // Replace with your actual GraphQL endpoint

  // Define the GraphQL query as a string
  const GRAPHQL_QUERY = `
    query {
      documents {
        _id
        title
        content
      }
    }
  `;

  // Function to fetch data using GraphQL
  const fetchData = async () => {
    try {
      const result = await axios.post(graphqlEndpoint, {
        query: GRAPHQL_QUERY,
      });

      // Update the data state with the fetched documents
      setData(result.data.data.documents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to navigate to the edit page
  const editDocument = (_id) => {
    navigate(`/update/${_id}`);
  };

  return (
    <div className="table-container">
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
