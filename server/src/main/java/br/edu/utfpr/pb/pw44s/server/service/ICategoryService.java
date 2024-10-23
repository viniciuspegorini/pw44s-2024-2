package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.Category;

import java.util.List;

public interface ICategoryService extends
        ICrudService<Category, Long> {

    List<Category> findByName(String name);
}

//    List<Category> findAll();
//    Page<Category> findAll(Pageable pageable);
//    Category save(Category category);
//    Category findById(Long id);
//    boolean exists(Long id);
//    long count();
//    void delete(Long id);
//}
