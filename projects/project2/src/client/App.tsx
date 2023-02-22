import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Header from "./common/header";
import Footer from "./common/footer";
import Body from "./common/body";

import { updateuserApi } from "./api/userApi";
import { initProduct, initUser, initCart } from "./actions";

import "./App.css";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function updateUser() {
      try {
        const response = await updateuserApi({ id: user.id });
        const resJson = await response.json();
        initUser(dispatch)({
          id: resJson.user.id,
          userType: resJson.user.userType,
          quantity: resJson.user.quantity,
          totPrice: resJson.user.totPrice,
          cart: resJson.user.cart,
        });
        initProduct(dispatch)(resJson.user);
      } catch (error) {}
    }
    if (user.userType != "guest") {
      console.log("update user");
      updateUser();
    } else {
      initProduct(dispatch)(user);
    }
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
