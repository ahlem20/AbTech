import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = ({ closePopup }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", roles: "user" });
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/users1");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    try {
      await axios.post("http://localhost:3500/api/users", newUser);
      setNewUser({ username: "", password: "", roles: "user" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setSelectedUser(null); // Deselect any selected user
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3500/api/users/${editingUser._id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3500/api/users/${userId}`);
      setSelectedUser(null); // Deselect any selected user
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setEditingUser(null); // Deselect any editing user
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <h3 className="text-xl font-semibold mb-4">Manage Users</h3>

        {/* Create User Form */}
        <div className="mb-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <select
            name="roles"
            value={newUser.roles}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleCreateUser}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Create User
          </button>
        </div>

        {/* User List */}
        <div className="mb-6 max-h-64 overflow-y-auto">
          <ul>
            {users.map((user) => (
              <li key={user._id} className="flex justify-between items-center mb-2">
                <div className="flex-grow flex items-center">
                  <span
                    className={`mr-4 cursor-pointer ${
                      selectedUser && selectedUser._id === user._id
                        ? "font-semibold text-blue-600"
                        : ""
                    }`}
                    onClick={() => handleSelectUser(user)}
                  >
                    {user.username} - {user.roles}
                  </span>
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected User Details */}
        {selectedUser && (
          <div className="mb-6 p-4 bg-gray-100 rounded">
            <h4 className="text-lg font-semibold mb-2">User Details</h4>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Roles:</strong> {selectedUser.roles}</p>
            {/* Add more details as needed */}
          </div>
        )}

        {/* Editing User Form */}
        {editingUser && (
          <div className="mb-6">
            <input
              type="text"
              name="username"
              value={editingUser.username}
              onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="password"
              name="password"
              value={editingUser.password}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              className="border p-2 rounded w-full mb-2"
            />
            <select
              name="roles"
              value={editingUser.roles}
              onChange={(e) => setEditingUser({ ...editingUser, roles: e.target.value })}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleUpdateUser}
              className="bg-green-600 text-white px-4 py-2 rounded w-full mb-2"
            >
              Save
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
