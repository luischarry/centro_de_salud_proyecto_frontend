import React from 'react';
import './Usertable.css'

const UserTable = ({ users }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <table className='tabladmin'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellido</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.first_name} {user.name}</td>
                <td>{user.surname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;