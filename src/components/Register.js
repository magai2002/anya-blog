import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info in Firestore with default role as 'reader'
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        first_name,
        last_name,
        email,
        role: 'reader',  // Set default role as 'reader'
        createdAt: new Date(),
      });

      alert('User registered successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="input"
        />
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
