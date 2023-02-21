import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Header from "./common/header";
import Footer from "./common/footer";
import Body from "./common/body";

import { initProduct, initCart } from "./actions";

import "./App.css";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    initProduct(dispatch)(user);
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
