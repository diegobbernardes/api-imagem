import React, { Component } from 'react';
import './css/buscaPorIngrediente.css';
import Autocomplete from '../node_modules/react-autocomplete/build/lib/index.js';
import $ from "jquery";

export default class App extends Component {
  ;
  uploadAction() {
    var data = new FormData();
    var imagedata = document.querySelector('input[type="file"]').files[0];
    data.append("uploaded_file", imagedata);

    fetch("http://localhost/vision/visionLabel.php", {
      method: "POST",
      body: data
    }).then(function (res) {
      console.log(res.body);
      items=>this.setState({res});
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status === 401) {
       
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    }).then((response) => response.json()
    .catch(err => {
        console.err(`'${err}' happened!`);
        return {};
    }))
    .then((json) => {
        console.log('parsed json: ', json);
        this.setState({ data: json })
    })
    .catch((err) => { console.log('fetch request failed: ', err) }
    );
  }

  constructor(props) {
        super(props);
        this.state = {
          items: [],
          lista: [
            {
              "Id": "1",
              "Nome": "Arroz"
            },
            {
              "Id": "2",
              "Nome": "Feijão"
            },
            {
              "Id": "3",
              "Nome": "Batata"
            }
          ]
        };
  }
  uploadArquivo(){
    $('#upload').trigger('click');
  }

  enviaForm(e){
    e.preventDefault();
    console.log($('input'));
  }

  render() {
    return (    
      <div id="busca" className="content">
        <div className="wrapper">
          <div id="cadastro" className="bloco">
            <div id="reconhecedor">
              <p className="titulo">Reconhecer por imagem</p>
              <form encType="multipart/form-data" action="">
                <input id="upload" name="uploaded_file" type="file" accept=".jpg, .jpeg, .png"/>
                <div className="btn" onClick={this.uploadArquivo}>Reconhecer ingrediente</div>
                <div className="btn" onClick={this.uploadAction.bind(this)}>Adicionar ingrediente</div>
              </form>
              

            </div>
            <div id="manual">
              <p className="titulo">Selecionar manualmente</p>

              <Autocomplete
                  items={[
                  { id: '1', label: 'Arroz' },
                  { id: '2', label: 'Feijão' },
                  { id: '3', label: 'Batata' },
                  ]}
                  getItemValue={item => item.label}
                  renderItem={(item, highlighted) =>
                  <div key={item.id}>{item.label}</div>
                  }
                  value={this.state.value}
                  onChange={e => this.setState({ value: e.target.value })}
                  onSelect={value => this.setState({ value })}
              />
              <div className="btn">Adicionar ingrediente</div>
              
            </div>

          </div>         
          <ul>
            {this.state.items.map(item=><li key={item.id}>{item.body}</li>)}
          </ul>
          <div id="lista" className="bloco">
            <p className="titulo">Lista de ingredientes cadastrados</p>
            <form method="post" onSubmit={this.enviaForm}>
              {
                this.state.lista.map(function(ingrediente){
                  return (
                    <input key={ingrediente.Id} value={ingrediente.Nome} name={ingrediente.id} readOnly/>
                  );
                })
              }
              <input id="submit" type="submit" value="Buscar receita"/>
            </form>
          </div>

        </div>
      </div>
    );
  }
}