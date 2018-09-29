import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Nytreact from "./components/Nytreact";

const App = () =>
 <Router>
   <div>
     <Route path="/" component={Nytreact} />
   </div>
 </Router>;

export default App;
