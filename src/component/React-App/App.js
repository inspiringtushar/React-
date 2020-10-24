import React, { useState } from 'react';
import '../../Style/App.css';
import login from './Pages/Login';
import Navbar from '../React-Core/NavBar';
import register from './Pages/SignUp'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './Home';

function App() {


  const [isLogin, setIsLogin] = useState(false);

  const setIsLoginMethod = (val) => {

    setIsLogin(val)
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path='/register' component={register}></Route>
        <Route exact path='/home' component={home}
          setIsLogin={isLogin}
        >
        </Route>
        <Route exact path='/login' component={login}
          setLoginProp={setIsLoginMethod}
        >

        </Route>

      </Router>
    </div >
  )

}

export default App;