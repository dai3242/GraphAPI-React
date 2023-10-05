import { Routes, Route } from "react-router-dom";
import { MainContent } from "./components/MainContent";

import "./App.css";

import { NavigationBar } from "./components/NavigationBar";
import { Users } from "./components/Users";
import { Groups } from "./components/Groups";
import { Sites } from "./components/Sites";
import { ListFormat } from "typescript";
import { Lists } from "./components/Lists";

function App() {
  return (
    <div className="full-page">
      <NavigationBar />
      <center>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/users" element={<Users />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/sites" element={<Sites />} />
        </Routes>
      </center>
    </div>
  );
}

export default App;
