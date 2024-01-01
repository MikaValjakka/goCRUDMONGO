import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data: {error.message}</p>
      ) : (
        <div>
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
                {user.email}
                <button>Update</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Users;
