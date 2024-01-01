import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Users from "./components/Users";
import CreateUsers from "./components/CreateUsers";
import NavBar from "./components/NavBar";
import CreateUsersBS from "./components/CreateUsersBS";
import UsersBS from "./components/UsersBS";

import "./index.css";
import FrontPage from "./components/FrontPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="pages">
          <NavBar />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="Users" element={<Users />} />
            <Route path="UsersBS" element={<UsersBS />} />
            <Route path="CreateUsers" element={<CreateUsers />} />
            <Route path="CreateUsersBS" element={<CreateUsersBS />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
