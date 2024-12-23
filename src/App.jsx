import "./App.css";

// Context provider import
import PasswordProvider from "./components/PasswordProvider";

// Component imports
import Controller from "./components/controller/Controller";
import Display from "./components/display/Display";

// Project link: https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh

function App() {
  return (
    <PasswordProvider>
      <main className="app-wrapper">
        <h1 className="app-title">SecurePass Pro</h1>

        <div className="app-body">
          <Display />

          <Controller />
        </div>
      </main>
    </PasswordProvider>
  );
}

export default App;
