import React from "react";

const Header = ({ user }) => {
  return (
    <header>
      <div className="header">
        <div className="btn-login">
          {user ? (
            <>
              <a
                className="btn btn-secondary app-button col-6 col-md-auto"
                href="/auth/logout"
              >
                Sign Out
              </a>
              <div className="user-circle">
                <img
                  src={user.photoUrl}
                  alt="User"
                  className="rounded-circle"
                />
              </div>
            </>
          ) : (
            <a
              className="btn btn-secondary app-button col-6 col-md-auto"
              href="/auth/google"
            >
              Google Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
