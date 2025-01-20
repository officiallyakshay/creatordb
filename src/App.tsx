import { Routes, Route } from "react-router-dom";
import { Advertisement } from "./Advertisement";
import { TopCreators } from "./TopCreators";
import { Nav } from "./Nav";
import { SignIn } from "./SignIn";
import { SpecificCreator } from "./SpecificCreator";
import { Home } from "./Home";

function App() {
  return (
    <>
      <Nav />
      <Advertisement />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<TopCreators />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/creator/:id" element={<SpecificCreator />} />
      </Routes>
    </>
  );
}

export default App;
