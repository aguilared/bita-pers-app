import React, { createContext, useState, useEffect } from "react";

const initialState = {
  paciente: "inipaciente",
};
export const Context = createContext(initialState);

export const PacienteContextProvider = ({ children }) => {
  const [paciente, setPaciente] = useState("");

  useEffect(() => {
    setPaciente(window.sessionStorage.getItem("paciente"));
  }, []);

  return (
    <Context.Provider
      value={{
        paciente,
        setPaciente,
      }}
    >
      {children}
    </Context.Provider>
  );
};
