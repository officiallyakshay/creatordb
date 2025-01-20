import { Routes, Route } from "react-router-dom";
import { Advertisement } from "./Advertisement";
import { Home } from "./Home";
import { Nav } from "./Nav";
import { SignIn } from "./SignIn";

function App() {
  return (
    <>
      <Nav />
      <Advertisement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
