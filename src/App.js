// import logo from './logo.svg';
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

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import Admin from './components/Admin';
//import AdminAddPost from './components/AdminAddPost';  // Import AdminAddPost
import BlogList from './components/BlogList';  // Import BlogList
import PostDetail from './components/PostDetail';
import Layout from './components/Layout'; // Adjust the path as necessary
import { About, Contact, FAQ } from './components/AboutContactFAQ';
import EditPost from './components/EditPost';
import NewPost from './components/NewPost';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<BlogList />} />  
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;