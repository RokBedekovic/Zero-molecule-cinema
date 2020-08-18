import React, { Component } from 'react';
import './EmptyScreen.css';
import '../Components/Button/Button.css';
import CreateNewMovie from '../CreateNewMovie/CreateNewMovie';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Aux from '../Hoc/Auxilliary';

const emptyTreeImg = require('../Assets/empty_tree.png');

class EmptyScreen extends Component {

    constructor(props){
        super(props);
        this.state={
          onKlik: false
        };
      }
    
    onKlikHandler(){
        this.setState({onKlik: true});
    }

    render(){
        if(this.state.onKlik){          
            return(
              <Router>
                <Route exact path="/createNewMovie" component={CreateNewMovie} />
                <Redirect to="/createNewMovie" />
              </Router>
            )
          }

        return(
            <Aux>
                <div className="EmptyScreen">
                    <span className="ListEmpty">Your movie list is empty</span>

                    <button className="MovieEmptyButton" type="button" onClick={this.onKlikHandler.bind(this)}>
                    <div className="Reactangle-8">
                            <span className="CreateNewMovie-one">Create a new movie</span>
                    </div>
                    </button>

                    <div>
                        <img src={emptyTreeImg} className="emptyTree" alt="" />
                    </div>

                </div>
            </Aux>
        )
    }
}

export default EmptyScreen;