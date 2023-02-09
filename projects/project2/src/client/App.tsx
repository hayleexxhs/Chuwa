import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./common/header";
import Footer from "./common/footer";
import Body from "./common/body";
import { initProduct } from "./actions";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    initProduct(dispatch)();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Body />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
