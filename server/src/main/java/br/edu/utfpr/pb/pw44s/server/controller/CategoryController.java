package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.CategoryDTO;
import br.edu.utfpr.pb.pw44s.server.model.Category;
import br.edu.utfpr.pb.pw44s.server.service.ICategoryService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
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
@RequestMapping("categories")
public class CategoryController extends CrudController<Category, CategoryDTO, Long> {
    private final ICategoryService categoryService;
    private final ModelMapper modelMapper;

    public CategoryController(ICategoryService categoryService,
                              ModelMapper modelMapper) {
        super(Category.class, CategoryDTO.class);
        this.categoryService = categoryService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Category, Long> getService() {
        return this.categoryService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }
}
//
//    private final ICategoryService categoryService;
//
//    public CategoryController(ICategoryService categoryService) {
//        this.categoryService = categoryService;
//    }
//
//    /**
//     * Persiste uma categoria ao enviar uma requisição HTTP POST com um JSON representando uma
//     * categoria no corpo. POST para http://localhost:8080/categories
//     * @param category
//     * @return
//     */
//    @PostMapping
//    public ResponseEntity<Category> create(@RequestBody @Valid Category category) {
//        Category categoryCreated = categoryService.save(category);
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
//                .buildAndExpand(categoryCreated.getId()).toUri();
//
//        return ResponseEntity.created(location).body(categoryCreated);
//    }
//
//    // GET para http://localhost:8080/categories/1
//    @GetMapping("{id}")
//    public ResponseEntity<Category> findOne(@PathVariable Long id) {
//        return ResponseEntity.ok(categoryService.findById(id));
//    }
//
//    // GET para http://localhost:8080/categories
//    @GetMapping
//    public ResponseEntity<List<Category>> findAll() {
//        return ResponseEntity.ok(categoryService.findAll());
//    }
//
//    // GET para http://localhost:8080/categories/exists/1
//    @GetMapping("exists/{id}")
//    public ResponseEntity<Boolean> exists(@PathVariable Long id) {
//        return ResponseEntity.ok(categoryService.exists(id));
//    }
//
//    @GetMapping("count")
//    public ResponseEntity<Long> count() {
//        return ResponseEntity.ok(categoryService.count());
//    }
//
//    @DeleteMapping("{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void delete(@PathVariable Long id) {
//        categoryService.delete(id);
//    }
//    // GET http://localhost:8080/categories/page?page=1&size=3
//    @GetMapping("page")
//    public ResponseEntity<Page<Category>> findPage(
//                                    @RequestParam int page,
//                                    @RequestParam int size,
//                                    @RequestParam(required = false) String order,
//                                    @RequestParam(required = false) Boolean asc
//                                    ) {
//        page = page - 1; // o banco inicia o índice de páginas com 0
//        PageRequest pageRequest = PageRequest.of(page, size);
//        if (order != null && asc != null) {
//            pageRequest = PageRequest.of(page, size,
//                    asc ? Sort.Direction.ASC: Sort.Direction.DESC, order);
//        }
//        return ResponseEntity.ok(categoryService.findAll(pageRequest));
//    }
//
//
//}
