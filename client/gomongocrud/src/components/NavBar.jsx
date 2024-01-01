import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container">
        <Link to="/" className="navbar-brand fs-4">
          GoCRUD
        </Link>
        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="sidebar offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header text-white border-bottom">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              goCRUD
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item mx-2">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/UsersBS" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/CreateUsersBS" className="nav-link">
                  Create User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    /*
    <div className="container">
      <Link to="/">
        <h3>GoCRUD</h3>
      </Link>
      <nav>
        <div>
          <Link to="/Users">Users</Link>
          <Link to="/CreateUsers">Create User</Link>
        </div>
      </nav>
    </div>
    */
  );
}

export default NavBar;
