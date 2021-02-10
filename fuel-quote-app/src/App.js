
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import QuoteForm from './components/QuoteForm'

const App = () => {
  return (
      <div className="App">
        <h1>Testing Page</h1>
        <Router>
          <ul>
            <li>
              <Link to="/quoteform">Quote Form</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/quoteform">
              <QuoteForm />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
