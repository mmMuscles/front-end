import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import AllWorkouts from "./views/AllWorkouts/AllWorkouts";
import CalendarHome from "./components/Calendar/CalendarHome";
import CalendarDay from "./components/Calendar/CalendarDay";
import Profile from "./views/Profile/Profile";
import Header from "./components/Layout/Header";

function App() {
  return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/calendar">
          <Header/>
          <CalendarHome />
        </Route>
        <Route path="/calendarday">
          <Header/>
          <CalendarDay />
        </Route>
        <Route path="/allworkouts">
          <Header/>
          <AllWorkouts />
        </Route>
        <Route path="/profile">
          <Header/>
          <Profile />
        </Route>
      </Switch>
  );
}

export default App;
