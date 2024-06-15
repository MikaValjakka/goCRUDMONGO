import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CreateUsersBS() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = location.state?.selectedUser || null;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // If a user is selected for editing, set the form data with user details
    if (selectedUser) {
      setUserData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: selectedUser.password,
      });
    }
  }, [selectedUser]); // Run this effect only once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        // Make a PUT request to update the user
        const response = await fetch(
          `/users/${selectedUser._id}`,
          // RElative URL
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          console.log("User updated successfully!");
          navigate("/UsersBS");
        } else {
          console.error("Failed to update user");
        }
      } else {
        // Make a POST request to create a new user
        const response = await fetch("/users", {
          // const response = await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log("User created successfully!");
          navigate("/UsersBS");
        } else {
          console.error("Failed to create user");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-sm">
      <h2>{selectedUser ? "Edit User" : "Create New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-secondary ">
          {selectedUser ? "Edit User" : "Create User"}
        </button>
      </form>
    </div>
  );
}

export default CreateUsersBS;
