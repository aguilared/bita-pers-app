import { createContext, useState, useEffect } from "react";

const initialState = {
  historia: "",
};
export const ContextHistoria = createContext(initialState);

export const HistoriaContextProvider = ({ children }) => {
  const [historia, setHistoria] = useState("");
  useEffect(() => {
    setHistoria(window.sessionStorage.getItem("historia"));
  }, []);

  return (
    <ContextHistoria.Provider
      value={{
        historia,
        setHistoria,
      }}
    >
      {children}
    </ContextHistoria.Provider>
  );
};
