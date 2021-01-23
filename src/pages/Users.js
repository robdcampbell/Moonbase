import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/config";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // retreive Users collection
    const usersRef = firestore.collection("users");
    // listen for realtime changes and get back snapshot from Firebase
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <table className="ui selectable celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Secret Address</th>
            <th>Phone</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/profile/${user.uid}`}>{user.name}</Link>
              </td>
              <td>{user.specialty}</td>
              <td>
                {user.address} {user.city}, {user.state} {user.zip}
              </td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
