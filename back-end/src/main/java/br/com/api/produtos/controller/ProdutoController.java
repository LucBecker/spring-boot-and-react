package br.com.api.produtos.controller;

import br.com.api.produtos.model.Produto;
import br.com.api.produtos.model.Resposta;
import br.com.api.produtos.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    @Autowired
    private ProdutoService ps;

    @GetMapping("/listar")
    public Iterable<Produto> listar(){
        return ps.listar();
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Produto produto){
        return ps.cadastrarAlterar(produto, "cadastrar");
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody Produto produto){
        return ps.cadastrarAlterar(produto, "alterar");
    }

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<Resposta> remover(@PathVariable long codigo){
        return ps.remover(codigo);
    }
}
