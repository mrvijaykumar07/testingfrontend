import { createContext, useState } from "react";

// Step 1: Create context
export const AppContext = createContext();

// Step 2: Provider component
export const AppProvider = ({ children }) => {
  const today = new Date().toISOString().split("T")[0];

  // --- Universal UI States ---
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonths, setSelectedMonths] = useState("1");
  const [showHeader, setShowHeader] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedMonths,
        setSelectedMonths,
        showHeader,
        setShowHeader,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
