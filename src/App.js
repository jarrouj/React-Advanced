import { Navigate, Route,Routes } from "react-router-dom";
import { SignIn } from "./screen/SignIn";
import { SignUp,Navigation, Home,Book } from "./screen";
import { useContext } from "react";
import { UserContext } from "./context/User";


function App() {

  const {user}= useContext(UserContext);

  return (
    <div>
      <Routes>
      <Route path="/signin" element={user?<Navigate to={'/'} />:<SignIn/>}/>
      <Route path="/signup" element={user?<Navigate to={'/'} replace/>:<SignUp/>}/>
      <Route path="/" element={<Navigation/>}>
          <Route index element={<Home/>} />
          <Route path="/books" element={<Book/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
