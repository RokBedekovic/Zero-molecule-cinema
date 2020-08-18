import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import Item1 from '../Components/Item1/Item1';
import '../Components/Item1/Item1.css';
import './MovieList.css';
import EmptyScreen from'../EmptyScreen/EmptyScreen';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';


class MovieList extends Component {

    constructor(props){
        super(props);
        this.state= {
            list: [],
            doneFetching: false
        }
    }

    componentDidMount(){
        const cookies = new Cookies();
        console.log(cookies.get('token'));
        fetch('/movies', {
            method:'GET',
            headers:{              
              'Accept':'application/json',
              'Content-type':'application/json',
              'Access-Control-Allow-Origin':'*',
              'Authorization': `Bearer ${cookies.get('token')}`
            }
          }).then(res=> {
            if(!res.ok){
              throw new Error("Response not OK"); 
            }
            return res.json();
          })
            .then((data)=>{    
              console.log(data);
              this.setState({
                  list: data,
                  doneFetching: true
              })
              }).catch((error) => {
                console.log(error);
              });

    }

    render(){
        console.log(this.state.list);
        if(this.state.doneFetching){
            if(!this.state.list.length){
                console.log(this.state.list);
                return(
                <Router>
                <Route exact path="/empty" component={EmptyScreen} />
                <Redirect to="/empty" />
                </Router>
                )
            }
            return(
                <div>
                    <h1>Movies</h1>
                    <ul>
                      {this.state.list.map(item => (
                      <li className="ListItem" key={item.id}>
                          <Item1 id={item.id} title={item.title} year={item.year}></Item1>
                      </li>
                      ))}
                    </ul>
                </div>
            )
        }
        return(
        <div></div>
        );
    }
}

export default MovieList;