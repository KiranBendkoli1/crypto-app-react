import { useState, createContext, ReactNode } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setSelectedTheme: (ctheme: string) => {
    console.log(ctheme);
  },
});

type Props = {
  children: ReactNode;
};

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>("dark");
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
