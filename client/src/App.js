import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainApp from "./components/MainApp";
import Playground from "./components/Playground";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
        <Header user={user}/>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainApp
                user={user}
                currentPublicDataSecret={currentPublicDataSecret}
                setCurrentPublicDataSecret={setCurrentPublicDataSecret}
              />
            }
          />
          <Route exact path="/playground" element={<Playground />} />
        </Routes>
        <Footer />
      </Router>
    </DndProvider>
  );
};

export default App;
