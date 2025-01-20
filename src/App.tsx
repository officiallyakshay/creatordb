import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { SignIn } from "./SignIn";

function App() {
  return (
    <>
      <Nav />
      <hr style={{ border: "1px solid white", marginTop: "10px" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
