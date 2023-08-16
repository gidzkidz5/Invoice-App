import { createContext, useState } from 'react';
// import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const switchTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') {
        return 'dark'
      } else {
        return 'light'
      }
    })
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme, switchTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// FormProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };


