import SignInForm from "./Components/Form/SignInForm";
import SignUpForm from "./Components/Form/SignUpForm";
import SideBar from "./Components/SideBar/SabeBar";
import CoreBox from "./Components/CoreBox/CoreBox";
import FastClient from "./FastClient/FastClient";
import "./css/App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


class App extends React.Component {

  constructor(props) {
    super(props)
    this.url = "http://localhost:8080"
    this.state = {
      token: localStorage.getItem("token")
    }
    this.setToken = this.setToken.bind(this)
    this.logout = this.logout.bind(this)
    this.FastClient = new FastClient(this.url, this.logout)
  }

  serverLogOut() {
    return true
  }

  logout() {
    if (this.serverLogOut()) {
      localStorage.removeItem("token")
      this.setState({ token: null })
    }
  }

  setToken(token) {
    localStorage.setItem("token", token)
    this.setState({ token })
  }

  Prerender() {
    if (this.state.token != null) {
        return <div className="App">
          <SideBar logoutCallback={this.logout} />
          <CoreBox logoutCallback={this.logout} httpclient = {this.FastClient} />
        </div>
    }
    return <div className="AppForm">
      <Routes>
        <Route path="/login" element={<SignInForm onLogin={this.setToken} httpclient = {this.FastClient} />} />
        <Route path="/signup" element={<SignUpForm onSignUp={this.setToken} httpclient = {this.FastClient} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  }

  render() {
    return <Router>
      {this.Prerender()}
    </Router>
  }
}

export default App;
