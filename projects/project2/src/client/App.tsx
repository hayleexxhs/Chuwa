import React from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import Body from "./common/body";

import "./App.css";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#f9fafb" }}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
