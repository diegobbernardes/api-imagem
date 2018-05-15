import React, { Component } from 'react';

//import $ from "jquery";
import './css/home.css';
//import { getStates, matchStateToTerm, sortStates } from '../../lib/utils'
//import Autocomplete from '../node_modules/react-autocomplete/build/lib/Autocomplete';
import Autocomplete from '../node_modules/react-autocomplete/build/lib/index.js';
//import Autocomplete from '../node_modules/react-autocomplete/dist/react-autocomplete';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
      }

    render() {
        return (
            <div id="home" className="content">
                <div className="wrapper">
                    <p className="titulo">Pesquise por uma receita</p>
                    <Autocomplete
                        items={[
                        { id: '1', label: 'A la minuta' },
                        { id: '2', label: 'Lasanha' },
                        { id: '3', label: 'Miojo da casa' },
                        ]}
                        getItemValue={item => item.label}
                        renderItem={(item, highlighted) =>
                        <div key={item.id}>{item.label}</div>
                        }
                        value={this.state.value}
                        onChange={e => this.setState({ value: e.target.value })}
                        onSelect={value => this.setState({ value })}
                    />
                </div>
            </div>
        );
    }
}