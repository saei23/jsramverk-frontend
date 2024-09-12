// import logo from './assets/logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importera sidor
import HomePage from './pages/Home';
import DocumentDetail from './pages/DocumentDetail';
import EditDocument from './pages/EditDocument';
import CreateDocument from './pages/CreateDocument';

// Importera komponenter
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/document/:id" element={<DocumentDetail />} />
          <Route path="/edit/:id" element={<EditDocument />} />
          <Route path="/create" element={<CreateDocument />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
