import {  useState, createContext, ReactNode } from "react";

// type ThemeContextType = {
//   theme: string;
//   setSelectedTheme(ctheme: string): void;
// };
export const ThemeContext = createContext({
  theme: "light",
  setSelectedTheme: (ctheme: string) => { console.log(ctheme) },
});

type Props = {
  children: ReactNode;
};

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>("light");
  const setSelectedTheme = (ctheme: string) => {
    setTheme(ctheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
