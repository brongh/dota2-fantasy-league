import "./App.css";

import NewsHead from "./components/NewsHead";
import StatsNav from "./components/StatsNav";
//import FantasyNav from "./components/FantasyNav";

import Main from "./components/Main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NewsHead />
        <StatsNav />
        <Main />
      </Router>
    </div>
  );
}

export default App;
// api_key=78245436-3d1d-40cf-b758-271be811c521
