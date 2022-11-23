package br.com.graphiacidade.graphia.controller.authenticated;

import br.com.graphiacidade.graphia.DTO.CategoryDTO;
import br.com.graphiacidade.graphia.controller.payload.response.CategoryDTOResponse;
import br.com.graphiacidade.graphia.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/category")
@AllArgsConstructor
public class CategoryController {
    private CategoryService categoryService;

    @GetMapping
    //@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_APP_USER') ")
    public ResponseEntity<?> getCategories(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "false") boolean isPaginated) {
        if(isPaginated) {
            Pageable paging = PageRequest.of(page, limit);
            CategoryDTOResponse categories = categoryService.getCategories(paging);
            return ResponseEntity.ok(categories);
        }
        List<CategoryDTO> categories = categoryService.getCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_APP_USER')")
    public ResponseEntity<CategoryDTO> getCategory(
            @PathVariable String id) {
        Optional<CategoryDTO> categoryDTO = categoryService.findCategoryById(id);
        return categoryDTO.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<CategoryDTO> saveCategory(
            @RequestBody CategoryDTO categoryDTO) {
        Optional<CategoryDTO> categorySaved = categoryService.saveCategory(categoryDTO);
        return categorySaved.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.internalServerError().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<?> updateCategory(
            @PathVariable String id,
            @RequestBody CategoryDTO categoryDTO) {
        Optional<CategoryDTO> categoryUpdated = categoryService.updateCategoryById(id, categoryDTO);
        return categoryUpdated.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<?> deleteCategory(
            @PathVariable String id) {
        Optional<CategoryDTO> categoryDeleted = categoryService.deleteCategoryById(id);
        return categoryDeleted.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }
}
