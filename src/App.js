import { SignIn } from "./screen";
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn />}/>
      </Routes>
    </div>
  );
}

export default App;
