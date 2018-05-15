import React, { Component } from 'react';
import Menu from './componentes/Menu';

export default class App extends Component {
  render() {
    return (
      <div>
        <Menu />

        {/* carrega os conteúdos das rotas */}
        {this.props.children}
      </div>
    );
  }
}
