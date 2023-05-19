package br.com.api.produtos.services;

import br.com.api.produtos.model.Produto;
import br.com.api.produtos.model.Resposta;
import br.com.api.produtos.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private Resposta rm;

    public Iterable<Produto> listar(){
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(Produto p, String acao){
        if(p.getNome().equals("")){
            rm.setMensagem("O nome do produto é obrigatório");
            return new ResponseEntity<Resposta>(rm, HttpStatus.BAD_REQUEST);
        } else if (p.getMarca().equals("")) {
            rm.setMensagem("O nome da marca do produto é obrigatório");
            return new ResponseEntity<Resposta>(rm, HttpStatus.BAD_REQUEST);
        } else{
            if(acao.equals("cadastrar")){
                return new ResponseEntity<Produto>(pr.save(p), HttpStatus.CREATED);
            } else{
                return new ResponseEntity<Produto>(pr.save(p), HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<Resposta> remover(long codigo){

        pr.deleteById(codigo);
        rm.setMensagem("O produto foi removido com sucesso");

        return new ResponseEntity<Resposta>(rm, HttpStatus.OK);
    }
}
