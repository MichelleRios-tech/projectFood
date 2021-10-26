import { Route } from 'react-router';
import './App.css';
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home';
import Form from './Components/Form/Form';
import Navbar from './Components/NavBar/NavBar';
import Details from './Components/Details/Details';

function App() {
  return (
    <>
        <div className="appBG">a</div>
        <div className="App">
          <Route path="/food">
            <Navbar />
          </Route>
          <Route exact path="/">
            <Landing />
         </Route>
          <Route exact path="/food">
            <Home />
          </Route>
          <Route exact path="/food/create">
            <Form/>
          </Route> 
          <Route path="/food/recipe/:id" children={<Details/>} />
      </div>
    </>
  );
}

export default App;
