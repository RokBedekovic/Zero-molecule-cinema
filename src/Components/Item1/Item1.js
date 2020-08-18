import React, { Component } from 'react';
import './Item1.css';
import Cookies from 'universal-cookie';

class Item1 extends Component{

    constructor(props){
        super(props);
        this.state={
            isDeleted: false,            
        };
      }

    onEdit(){

    }

    onDelete(){
        const cookies = new Cookies();
        fetch(`/movies/${this.props.id}`, {
            method:'DELETE',
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
                  isDeleted: true
              })
              }).catch((error) => {
                console.log(error);
              });

              window.location.reload();
    }

    render(){
        return(
            <div className="Item1">
                <div className="Group2"></div>
                <div className="year">{this.props.year}</div>
                <button className="Delete" onClick={this.onDelete.bind(this)} type="button">Delete</button>
                <button className="Edit" type="button">Edit</button>
                <div className="MovieTitle">{this.props.title}</div>
                <div className="Line1"></div>
            </div>
        )
    }
}

export default Item1;