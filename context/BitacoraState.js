import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  bitacora: "",
};
export const BitacoraContext = createContext(initialState);

export const BitacoraProvider = ({ children }) => {
  const [bitacora, setBitacora] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("bitacora");
        if (value !== null) {
          setBitacora(value);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData().catch(console.error);
  }, [bitacora, setBitacora]);

  return (
    <BitacoraContext.Provider
      value={{
        bitacora,
        setBitacora,
      }}
    >
      {children}
    </BitacoraContext.Provider>
  );
};
