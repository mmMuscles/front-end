
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth'

function App() {
  return (
    <>
    <Switch>
      <Route>
        <Home/>
      </Route>
      <Route>
        <Auth/>
      </Route>
    </Switch>
    </>
  );
}

export default App;
