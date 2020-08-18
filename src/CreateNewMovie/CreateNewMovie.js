import React, { Component } from 'react';
import './CreateNewMovie.css';
import '../Components/FormInput/FormInput.css';
import '../Components/Dropzone/Dropzone.css';
import '../Components/ButtonSecondary/ButtonSecondary.css';
import '../Components/Button/Button.css';
import Dropzone from 'react-dropzone';
import Aux from '../Hoc/Auxilliary';
import Cookies from 'universal-cookie';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';

const TreeRight = require('../Assets/TreeRight.png');


class CreateNewMovie extends Component {

    constructor(props){
        super(props);
        this.state={
          isCreated: false,
          title: '',
          year: 0,
          acceptedFiles: null,
          isAuth: false
        };
      }

    onTitleChangeHandler(event){
        this.setState({
            title: event.target.value
        });
    }

    onYearChangeHandler(event){
        this.setState({
            year: event.target.value
        });
    }

    onClickFileHandler = () => {
        const data = {
            title: this.state.title,
            year: this.state.year,
            files:{poster: this.state.acceptedFiles}
          };    
        const cookies = new Cookies();
        console.log(data);

        fetch('/movies', {
            method:'POST',
            headers:{              
              'Accept':'application/json',
              'Content-type':'application/json',
              'Access-Control-Allow-Origin':'*',
              'Authorization': `Bearer ${cookies.get('token')}`
            },
            body: JSON.stringify(data)
          }).then(res=> {
            if(!res.ok){
              throw new Error("Response not OK"); 
            }
            return res.json();
          })
            .then((data)=>{    
              console.log(data);
              this.setState({
                isCreated: true
              })
              }).catch((error) => {
                console.log(error);
                this.setState({
                  isCreated: false
                })
              });
    }


    render(){

      if(this.state.isCreated){
        return(
          <Router>
            <Route exact path="/movie_list" component={MovieList} />
            <Redirect to= "/movie_list"/>
          </Router>
        )
      }
        return(
            <Aux>
                <div className="CreateNewMovie">

                    <span className="CreateMovieTitle">Create a new movie</span>

                    <div className="FormInput-one">
                            <div className="FormPassword">Title*</div>
                            <input className="Reactangle-7" 
                                type="text" 
                                onChange ={this.onTitleChangeHandler.bind(this)} >
                            </input>
                    </div>

                    <div className="FormInput-two">
                        <div className="FormPassword">Publication year</div>
                        <input className="Reactangle-7" 
                                type="number"
                                onChange ={this.onYearChangeHandler.bind(this)}>
                        </input>
                    </div>

                    <span className="CoverImageTitle">Cover image*</span>

                    <div className="Dropzone-one">
                        <Dropzone className="Reactangle-9" onDrop={acceptedFiles => {
                          this.setState({
                            acceptedFiles: acceptedFiles
                          })
                          console.log(acceptedFiles)
                          }
                          }>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <span className="DropImageHere">Drop image here</span>
                                </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>

                    <button className="CancelButton">
                        <div className="Reactangle">
                            <span className="Cancel">Cancel</span>
                        </div>
                    </button>

                    <button className="CreateButton" onClick={this.onClickFileHandler.bind(this)} type="button">
                        <div className="Reactangle-8">
                            <span className="SignIn">Create</span>
                        </div>
                    </button>

                    <img src={TreeRight} className="TreeRight" alt="" />

                </div>
            </Aux>
        );
    }
}

export default CreateNewMovie;