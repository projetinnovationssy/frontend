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
      token: localStorage.getItem("token"),
      FastClient : new FastClient(this.url, this.logout)
    }
    this.setToken = this.setToken.bind(this)
    this.logout = this.logout.bind(this)
    
  }


  logout() {
    /*this.state.FastClient.destroyToken(()=>{
      localStorage.removeItem("token")
      this.setState({ token: null })
    }) */
    /***
     * it looks like the api generates the same token every time for the user, so we can't ban it
     * Api problem
     */
     
    localStorage.removeItem("token")
    this.setState({ token: null })
    
  }

  setToken(token) {
    localStorage.setItem("token", token)
    this.setState({ token , FastClient : new FastClient(this.url, this.logout)})
  }

  Prerender() {
    if (this.state.token != null) {
        return <div className="App">
          <SideBar logoutCallback={this.logout} />
          <CoreBox logoutCallback={this.logout} httpclient = {this.state.FastClient} />
        </div>
    }
    return <div className="AppForm">
      <Routes>
        <Route path="/login" element={<SignInForm onLogin={this.setToken} httpclient = {this.state.FastClient} />} />
        <Route path="/signup" element={<SignUpForm onSignUp={this.setToken} httpclient = {this.state.FastClient} />} />
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
