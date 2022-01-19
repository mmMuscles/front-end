import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import AllWorkouts from "./views/AllWorkouts/AllWorkouts";
import CalendarHome from "./components/Calendar/CalendarHome";
import CalendarDay from "./components/Calendar/CalendarDay";
import Profile from "./views/Profile/Profile";
import Header from "./components/Layout/Header";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/calendar">
          <Header/>
          <CalendarHome />
        </PrivateRoute>
        <PrivateRoute path="/calendarday">
          <Header/>
          <CalendarDay />
        </PrivateRoute>
        <PrivateRoute path="/allworkouts">
          <Header/>
          <AllWorkouts />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Header/>
          <Profile />
        </PrivateRoute>
      </Switch>
  );
}

export default App;
