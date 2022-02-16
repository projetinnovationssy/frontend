import SignInForm from "./Components/Form/SignInForm";
import ResetPasswordForm from "./Components/Form/ResetPasswordForm";
import EmailResetPasswordForm from "./Components/Form/EmailResetPasswordForm";
import SignUpForm from "./Components/Form/SignUpForm";
import SideBar from "./Components/SideBar/SabeBar";
import "./css/App.css"
function App() {
  return (
  /*<div className="AppForm">
        <SignUpForm/>
    </div>*/
    <div className="App">
        <SideBar/>
    </div>
  );
}

export default App;
