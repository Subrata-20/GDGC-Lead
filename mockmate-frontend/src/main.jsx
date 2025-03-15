import { createContext, useState, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: {},
  setUser: () => {},
  history: [],
  setHistory: () => {},
  selectedData:[],
  setSelectedData: ()=>{},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [history, setHistory] = useState([]);
  const [selectedData, setSelectedData] = useState([]); 
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        history,
        setHistory,
        selectedData,
        setSelectedData
      }}
    >
      <App />
    </Context.Provider>
  );
};
createRoot(document.getElementById("root")).render(<AppWrapper />);
