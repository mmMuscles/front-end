
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth'

function App() {
  return (
    <>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/auth'>
        <Auth />
      </Route>
    </Switch>
    </>
  );
}

export default App;
