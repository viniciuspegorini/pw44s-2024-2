package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {

    List<Product> findAll();
    Page<Product> findAll(Pageable pageable);
    Product save(Product product);
    Product findById(Long id);
    boolean exists(Long id);
    long count();
    void delete(Long id);
}
