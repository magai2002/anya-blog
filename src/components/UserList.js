import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const userCollection = collection(db, 'users');
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => doc.data());
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.uid} className="mb-2">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Registered: {user.createdAt.toDate().toDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
