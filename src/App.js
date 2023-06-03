import "./App.css";
import React from "react";
import ExamSummary from "./pages/ExamSummary";
import Instructions from "./pages/Instructions";
import HomePage from "./pages/Homepage";
import QuestionsScreen from "./pages/QuestionsScreen";
import { Switch, Route } from "react-router-dom";

// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import ScoreScreen from "./pages/ScoreScreen";
import LoginPage from "./components/Login";
// import NavBar from "./components/Navbar";
import SignUpPage from "./components/SignUp";
import Profile from "./components/Profile";
import PageNotFound from "./pages/404Page";
// import TestSummaryModal from "./components/test-summary-modal";

function App() {
  return (
    <Router>
      <div className="App fs-5">
        {/* <TestSummaryModal /> */}
        {/* <NavBar /> */}
        {/* <SignUpPage /> */}
        {/* <LoginPage /> */}
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/auth/register" component={SignUpPage} exact />
          <Route path="/auth/login" component={LoginPage} exact />
          <Route path="/instruction" component={Instructions} exact />
          <Route path="/questionscreen/:id" component={QuestionsScreen} exact />
          <Route path="/examsummary" component={ExamSummary} exact />
          <Route path="/score-screen" component={ScoreScreen} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
