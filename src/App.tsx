import { Routes, Route } from "react-router-dom";
import { Advertisement } from "./Advertisement";
import { TopCreators } from "./TopCreators";
import { Nav } from "./Nav";
import { SignIn } from "./SignIn";
import { SpecificCreator } from "./SpecificCreator";
import { Home } from "./Home";
import { Biography } from "./Biography";
import { SubmitACreator } from "./SubmitACreator";
import { Subscribe } from "./Subscribe";
import { Profile } from "./Profile";
import { EditProfile } from "./EditProfile";

function App() {
  return (
    <>
      <Nav />
      <Advertisement />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<TopCreators />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* restrict /profile to only ppl signed in */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/creator/:id" element={<Biography />} />
        <Route path="/submit-a-creator" element={<SubmitACreator />} />
        {/* <Route path="/creator/:id/biography" element={<Biography />} /> */}
      </Routes>
    </>
  );
}

export default App;
