import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth'
import AllWorkouts from './views/AllWorkouts/AllWorkouts';
import Header from './components/Layout/Header';



function App() {

  return (
    <>
    <Header/>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/auth'>
        <Auth />
      </Route>
      <Route path='/allworkouts'>
        <AllWorkouts />
      </Route>
    </Switch>
    </>
  );
}

export default App;
