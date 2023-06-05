import React from "react";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="btn-login">
          <a className="btn btn-primary app-button col-6 col-md-auto" href="/auth/google">
            Google Login
          </a>
          <a className="btn btn-secondary app-button col-6 col-md-auto" href="/auth/logout">
            Sign Out
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
