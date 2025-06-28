import React, { createContext, useContext } from "react";

const Context = createContext();
export const TextThemeContext = ({ theme, themeHandler, children }) => {
  return (
    <Context.Provider value={{ theme, themeHandler }}>
      {children}
    </Context.Provider>
  );
};

export const useThemeMode = () => {
  return useContext(Context);
};
