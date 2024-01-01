import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UsersBS() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users");
        const data = await response.json();
        setUsers(data.users);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted user from the state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        console.log("User deleted successfully!");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // When edit button is used, route to CreateUsersBS with user data
  const editUser = (user) => {
    setSelectedUser(user);
    navigate("/CreateUsersBS", { state: { selectedUser: user } });
  };

  return (
    <div className="container mt-5 text-center">
      {loading ? (
        <>
          <img src="/images/goGoesAround.gif" alt="loading gif" />
          <p>Loading...</p>
        </>
      ) : error ? (
        <p>Error loading data: {error.message}</p>
      ) : (
        <div>
          <h2>User List</h2>
          <table
            className="table table-dark table-striped table-hover"
            style={{ opacity: 0.8 }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => editUser(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersBS;
