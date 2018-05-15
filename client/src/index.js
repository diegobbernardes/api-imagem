import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './css/common.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import App from './App';
import Home from './Home';
import BuscaPorIngrediente from './BuscaPorIngrediente';
// import BuscaReceitas from './BuscaReceitas';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <App>
            <Switch>            
                <Route exact path="/" component={Home}/>
                <Route path="/busca-por-ingrediente" component={BuscaPorIngrediente}/>
                {/*<Route path="/busca-receita" component={BuscaReceitas}/>                */}
        </Switch>            
        </App>
    </Router>
),
document.getElementById('root'));

//registerServiceWorker();
