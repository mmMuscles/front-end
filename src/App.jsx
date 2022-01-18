import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import Auth from "./views/Auth/Auth";
import AllWorkouts from "./views/AllWorkouts/AllWorkouts";
import CalendarList from "./components/Calendar/CalendarList";
import CalendarDay from "./components/Calendar/CalendarDay";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/calendar">
          <CalendarList />
        </Route>
        <Route path="/calendarday">
          <CalendarDay />
        </Route>
        <Route path="/allworkouts">
          <AllWorkouts />
        </Route>
      </Switch>
    </>
  );
}

export default App;
