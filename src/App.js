import { Route,Routes } from "react-router-dom";
import { SignIn } from "./screen/SignIn";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={user?<SignIn/>:<Navigate to={'home'} replace/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      </Routes>
    </div>
  );
}

export default App;
