import { createContext, useState, useEffect } from "react";

const initialState = {
  jwt: "",
};
export const Context = createContext(initialState);

export const UserContextProvider = ({ children }) => {
  const [jwt, setJWT] = useState("");
  useEffect(() => {
    setJWT(window.sessionStorage.getItem("jwt"));
  }, []);

  return (
    <Context.Provider
      value={{
        jwt,
        setJWT,
      }}
    >
      {children}
    </Context.Provider>
  );
};
