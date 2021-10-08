import React, { Component } from "react";
import ReactDOM from "react-dom";
import NotesList from "./Components/NotesList/NotesList";
import NoteTotal from "./Components/NoteTotal/NoteTotal";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NotesList />
        <NoteTotal />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
