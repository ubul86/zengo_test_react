import React, { Component } from "react";

import './App.css';
import './font-awesome.css';

import County from "./components/County";
import Cities from "./components/Cities";
import NewCity from "./components/NewCity";
import { ToastContainer} from 'react-toastify';

class App extends Component {
    render() {
        return (
                <div className="App"> 
                    <ToastContainer />
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>Cities and Counties React example</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">    
                                <section className="left">
                                    <County />               
                                    <NewCity />  
                                </section>
                            </div>
                            <div className="col-md-7">                
                                <section className="right">
                                    <Cities />   
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                )
    }
}

export default App;
