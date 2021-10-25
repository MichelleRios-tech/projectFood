import { Route } from 'react-router';
import './App.css';
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home';
import SearchBar from './Components/SearchBar/SearchBar';
function App() {
  return (
    <>
        <div className="App">
          {/* <Route path="/">
            <Navbar />
          </Route> */}
          <Route exact path="/">
            <Landing />
         </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path='/search' component={SearchBar}/>{/*
          <Route exact path="/create">
            <Form/>
          </Route>  */}
      </div>
    </>
  );
}

export default App;
