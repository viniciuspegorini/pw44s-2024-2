package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.model.Product;
import br.edu.utfpr.pb.pw44s.server.service.IProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {

    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    /**
     * Persiste uma categoria ao enviar uma requisição HTTP POST com um JSON representando uma
     * categoria no corpo. POST para http://localhost:8080/categories
     * @param product
     * @return
     */
    @PostMapping
    public ResponseEntity<Product> create(@RequestBody @Valid Product product) {
        Product productCreated = productService.save(product);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(productCreated.getId()).toUri();

        return ResponseEntity.created(location).body(productCreated);
    }

    // GET para http://localhost:8080/categories/1
    @GetMapping("{id}")
    public ResponseEntity<Product> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    // GET para http://localhost:8080/categories
    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    // GET para http://localhost:8080/categories/exists/1
    @GetMapping("exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable Long id) {
        return ResponseEntity.ok(productService.exists(id));
    }

    @GetMapping("count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(productService.count());
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }
    // GET http://localhost:8080/categories/page?page=1&size=3
    @GetMapping("page")
    public ResponseEntity<Page<Product>> findPage(
                                    @RequestParam int page,
                                    @RequestParam int size,
                                    @RequestParam(required = false) String order,
                                    @RequestParam(required = false) Boolean asc
                                    ) {
        page = page - 1; // o banco inicia o índice de páginas com 0
        PageRequest pageRequest = PageRequest.of(page, size);
        if (order != null && asc != null) {
            pageRequest = PageRequest.of(page, size,
                    asc ? Sort.Direction.ASC: Sort.Direction.DESC, order);
        }
        return ResponseEntity.ok(productService.findAll(pageRequest));
    }


}
