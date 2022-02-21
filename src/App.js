import SignInForm from "./Components/Form/SignInForm";
import SignUpForm from "./Components/Form/SignUpForm";
import SideBar from "./Components/SideBar/SabeBar";
import CoreBox from "./Components/CoreBox/CoreBox";
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
    this.state = {
      token: localStorage.getItem("token")
    }
    this.setToken = this.setToken.bind(this)
    this.logout = this.logout.bind(this)
    console.log(localStorage.getItem("token"))
  }

  validateToken(token){
    if(token != ""){
      localStorage.setItem("token", token)
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

  Prerender() {
    if (this.state.token != null) {
      if (this.validateToken(this.state.token)) {
        return <div className="App">
              <SideBar logoutCallback = {this.logout} />
              <CoreBox logoutCallback = {this.logout}  />
        </div>
      }
    }
    return <div className="AppForm">  
          <Routes>
            <Route path="/login" element={<SignInForm onLogin = {this.setToken}/>}/>
            <Route path="/signup" element={<SignUpForm onSignUp = {this.setToken}/>}/>
            <Route path="*" element = {<Navigate to="/login"/>} />
          </Routes>
      </div>
  }

  render(){
    return <Router>
        {this.Prerender()}
    </Router>
  }
}

export default App;
