import React, { Component } from 'react';
import './Login.css';
import '../Components/FormInputWithError/FormInputWithError.css';
import '../Components/FormInput/FormInput.css';
import '../Components/Button/Button.css';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'universal-cookie';

import MovieList from '../MovieList/MovieList';

const projectorImg = require('../Assets/undraw_videographer.png');

class Login extends Component {

    constructor(props){
    super(props);
    this.state={
      isAuth: false,
      identifier: '',
      password: ''
    };
  }

  componentDidMount(){
    const cookies = new Cookies();
    if(cookies.get('token')){
      console.log("cookie exists");
      this.setState({
        isAuth: true
      })
    }
  }

  updateIdentifierHandler(event){
    this.setState({
        identifier: event.target.value
    });
  }

  updatePasswordHandler(event){
      this.setState({
          password: event.target.value
      });
  }

  onClickHandler(){

    const givenProfile = {
        identifier: this.state.identifier,
        password: this.state.password
      }    

    fetch('/auth/local', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(givenProfile)
    }).then(res=> {
      if(!res.ok){
        throw new Error('Response not OK'); 
      }
      return res.json();
    })
      .then((data)=>{    
        console.log(data); 
        const cookies = new Cookies();
        const d = new Date();
        d.setTime(d.getTime() + (2*60*1000));
        cookies.set('token', data.jwt, {path: '/', expires: d});
        console.log(cookies.get('token'))
        this.setState({
          isAuth: true
        });
        }).catch((error) => {
          console.log(error);
          this.setState({
            isAuth: false
          })
        });
  }

    render() {
        if(this.state.isAuth){
          console.log("User Authenticated");
          return(
            <Router>
              <Route exact path="/movie_list" component={MovieList} />
              <Redirect to="/movie_list" />
            </Router>
          )
        }

        return(
            <div className="LoginScreen">
                <form>
                    <span className="Login">Login</span>

                    <div className="FormInputWithError">
                        <span className="Email">Email*</span>
                            <input className="Reactangle-6" 
                                   type="text" 
                                   value={this.state.identifier}
                                   onChange={(event) => this.updateIdentifierHandler(event)} 
                                   autoFocus>
                            </input>
                        <span className="EmailCantBeEmpty">Email can not be empty</span>
                    </div>

                    <div className="FormInput">
                        <div className="FormPassword">Password*</div>
                        <input className="Reactangle-7" 
                               type="password"
                               value={this.state.password}
                               onChange={(event) => this.updatePasswordHandler(event)}>
                        </input>
                    </div>

                    <div className="MainButton">
                        <button className="mainButton" type="button">
                            <div className="Reactangle-8">
                                <span className="SignIn" onClick={this.onClickHandler.bind(this)}>Sign in</span>
                            </div>
                        </button>
                    </div>

                </form>
                    <img src={projectorImg} className="projectorImg" alt="projector" />
              </div>
            
        );
    }
}

export default Login;