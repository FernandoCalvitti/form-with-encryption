import { Routes, Route } from "react-router-dom";
import { HOME, RESULT } from "./config/Routes";
import Form from "./components/Form";
import Result from "./components/Result";

import "./App.css";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path={HOME} element={<Form />} />
        <Route path={RESULT} element={<Result />} />
      </Routes>
    </main>
  );
}

export default App;
