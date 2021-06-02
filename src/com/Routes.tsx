import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import TagList from "../pages/TagList";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>
          <TagList />
          <TagList />
          <TagList />
          </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
