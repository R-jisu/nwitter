import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbInstnace";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [newName, setNewName] = useState("");
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    setNewName(userObj.displayName);
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLooggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
