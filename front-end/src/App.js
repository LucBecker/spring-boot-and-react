import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';
import React, {useEffect, useState} from "react";

function App() {

  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] =  useState(produto);

  useEffect(()=>{
      fetch("http://localhost:8080/listar")
      .then(response => response.json())
      .then(retorno_conv => setProdutos(retorno_conv));
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value})
  }

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_conv => {
      
      if(retorno_conv.mensagem !== undefined){
        alert(retorno_conv.mensagem);
      }else{
        setProdutos([...produtos, retorno_conv]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    } )
  }


  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_conv => {
      
      if(retorno_conv.mensagem !== undefined){
        alert(retorno_conv.mensagem);
      }else{
      
        alert('Produto alterado com sucesso!');

        let vetorTemp = [...produtos];

        let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
        });

        vetorTemp[indice] = objProduto;

        setProdutos(vetorTemp);

        limparFormulario();
      }
    } )
  }


  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_conv => {
      
     alert(retorno_conv.mensagem);

     let vetorTemp = [...produtos];

     let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
     });

     vetorTemp.splice(indice, 1);

     setProdutos(vetorTemp);

     limparFormulario();

    })
  }

  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);

  }

  return (
    <div className="App">
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} 
      cadastrar={cadastrar} obj={objProduto} remover={remover} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} /> 
    </div>
  );
}

export default App;
