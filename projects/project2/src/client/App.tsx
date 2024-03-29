import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Header from "./common/header";
import Footer from "./common/footer";
import Body from "./common/body";

import { updateuserApi } from "./api/userApi";
import {
  initProduct,
  initUser,
  initCart,
  resetUser,
  resetCart,
} from "./actions";

import "./App.css";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function updateUser() {
      try {
        // const response = await updateuserApi({ id: user.id });
        const response = await updateuserApi({
          token: localStorage.getItem("userToken"),
        });
        const resJson = await response.json();
        if (resJson.message === "jwt expired") {
          console.log("jwt expired");
          resetUser(dispatch)();
          resetCart(dispatch)();
          localStorage.removeItem("userToken");
          initProduct(dispatch)(user);
        } else {
          initUser(dispatch)({
            id: resJson.user.id,
            userType: resJson.user.userType,
            quantity: resJson.user.quantity,
            totPrice: resJson.user.totPrice,
            cart: resJson.user.cart,
          });
          initProduct(dispatch)(resJson.user);
        }
      } catch (error) {}
    }
    // if (user.userType != "guest") {
    if (localStorage.getItem("userToken")) {
      console.log("update user");
      updateUser();
    } else {
      resetUser(dispatch)();
      resetCart(dispatch)();
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
