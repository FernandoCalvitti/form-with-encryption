import "./App.css";
import Form from "./components/Form";

import { Routes, Route } from "react-router-dom";
import { HOME, RESULT } from "./constants/constants";
import Result from "./components/Result";

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
