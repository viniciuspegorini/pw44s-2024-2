package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoryService {

    List<Category> findAll();
    Page<Category> findAll(Pageable pageable);
    Category save(Category category);
    Category findById(Long id);
    boolean exists(Long id);
    long count();
    void delete(Long id);
}
