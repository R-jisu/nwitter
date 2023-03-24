import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbInstnace";

function App() {
  const [init, setInit] = useState(false);
  const [isLooggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else setIsLoggedIn(false);
      setInit(true);
    });
  }, []);
  return (
    <>{init ? <AppRouter isLooggedIn={isLooggedIn} /> : "Initializing..."}</>
  );
}

export default App;
