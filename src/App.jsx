import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import MainContainer from "./components/MainContainer";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <MainContainer />
      </Provider>
    </>
  );
}

export default App;
