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
      token: null
    }
    this.setToken = this.setToken.bind(this)
  }

  validateToken(token){
    if(token != ""){
      return true
    }
    return false
  }

  setToken(token){
    this.setState({token})
  }

  render() {
    if (this.state.token != null) {
      if (this.validateToken(this.state.token)) {
        return <div className="App">
          <SideBar />
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
