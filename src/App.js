import SignInForm from "./Components/Form/SignInForm";
import ResetPasswordForm from "./Components/Form/ResetPasswordForm";
import EmailResetPasswordForm from "./Components/Form/EmailResetPasswordForm";
import SignUpForm from "./Components/Form/SignUpForm";
import SideBar from "./Components/SideBar/SabeBar";
import CoreBox from "./Components/CoreBox/CoreBox";
import "./css/App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: localStorage.getItem("token")
    }
    this.setToken = this.setToken.bind(this)
    this.logout = this.logout.bind(this)
    
  }

  validateToken(token){
    if(token != ""){
      localStorage.setItem("token", "samir")
      return true
    }
    return false
  }

  serverLogOut(){
    return true
  }

  logout(){
    if(this.serverLogOut()){
      localStorage.removeItem("token")
      this.setState({token: null})
    }
  }

  setToken(token){
    this.setState({token})
  }

  render() {
    if (this.state.token != null) {
      if (this.validateToken(this.state.token)) {
        return <div className="App">
          <SideBar logoutCallback = {this.logout} />
          <CoreBox />
        </div>
      }
    }
    return <div className="AppForm">
        <Router>
          <Routes>
            <Route path="/login" element={<SignInForm onLogin = {this.setToken}/>}/>
            <Route path="/signup" element={<SignUpForm onSignUp = {this.setToken}/>}/>
            <Route path="/reset" element={<EmailResetPasswordForm onSignUp = {this.setToken}/>}/>
          </Routes>
        </Router>
      </div>
  }
}

export default App;
