import './App.css'

import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Search from './components/Search'
import Details from './components/Details'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/details" component={Details} />
  </Switch>
)

export default App
