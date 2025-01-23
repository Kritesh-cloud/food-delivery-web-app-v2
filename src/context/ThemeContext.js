import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();
const ThemeContextUpdate = React.createContext();

export const getTheme = () => {
  return useContext(ThemeContext);
};

export const setTheme = () => {
  return useContext(ThemeContextUpdate);
};

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    setDark((darkk) => !darkk);
  }

  return (
    <ThemeContext.Provider value={dark}>
      <ThemeContextUpdate.Provider value={toggleTheme}>
        {children}
      </ThemeContextUpdate.Provider>
    </ThemeContext.Provider>
  );
};
