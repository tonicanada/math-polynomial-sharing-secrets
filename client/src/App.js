import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Paragraph from "./components/Paragraph";
import LoggedIn from "./components/LoggedIn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { httpGetUser, httpGetPublicDataCurrentSecret } from "./requests";

const App = () => {
  const [user, setUser] = useState(null);
  const [currentPublicDataSecret, setCurrentPublicDataSecret] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await httpGetUser();
      if (response) {
        setUser(response); // Almacenar los datos del usuario en el estado
      } else {
        setUser(null); // No hay datos de usuario, el usuario no está autenticado
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchPublicDataCurrentSecret = async () => {
    const data = await httpGetPublicDataCurrentSecret();
    setCurrentPublicDataSecret(data);
  };

  useEffect(() => {
    fetchUserData();
    fetchPublicDataCurrentSecret();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div className="app-container">
        <div className="card-component">
          <h1 className="app-title">
            Sharing a Secret with Polynomial Interpolation
          </h1>
          <div className="paragraph text-center mt-100">
            <Paragraph />
            {user ? (
              <LoggedIn
                user={user}
                currentPublicDataSecret={currentPublicDataSecret}
                setCurrentPublicDataSecret={setCurrentPublicDataSecret}
              />
            ) : (
              <div>
                <div>Please Login to be able to generate a secret.</div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
};

export default App;
