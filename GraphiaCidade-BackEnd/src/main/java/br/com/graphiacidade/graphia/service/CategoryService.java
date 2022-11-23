package br.com.graphiacidade.graphia.service;

import br.com.graphiacidade.graphia.DTO.CategoryDTO;
import br.com.graphiacidade.graphia.controller.payload.response.CategoryDTOResponse;
import br.com.graphiacidade.graphia.model.CategoryModel;
import br.com.graphiacidade.graphia.repository.CategoryRepository;
import br.com.graphiacidade.graphia.security.service.UserUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService {
    private CategoryRepository categoryRepository;
    private UserUtils userUtils;

    public CategoryDTOResponse getCategories(Pageable page) {
        Page<CategoryModel> allCategories = categoryRepository.findAll(page);
        return new CategoryDTOResponse(allCategories);
    }

    public List<CategoryDTO> getCategories() {
        List<CategoryModel> allCategories = categoryRepository.findAll();
        return allCategories.stream().map(CategoryDTO::new).collect(Collectors.toList());
    }

    public Optional<CategoryDTO> deleteCategoryById(String id) {
        Optional<CategoryModel> categoryById = categoryRepository.findById(id);
        if (categoryById.isPresent()) {
            categoryRepository.delete(categoryById.get());
            return Optional.of(new CategoryDTO(categoryById.get()));
        }
        return Optional.empty();
    }

    public Optional<CategoryDTO> saveCategory(CategoryDTO categoryDTO) {
        categoryDTO.setCreatedAt(new Date());
        categoryDTO.setAuthor(userUtils.getUsernameFromContext());
        return save(categoryDTO);
    }

    public Optional<CategoryDTO> updateCategoryById(String id, CategoryDTO categoryDTO) {
        Optional<CategoryModel> categoryById = categoryRepository.findById(id);

        if (categoryById.isPresent()) {
            categoryDTO.setId(id);
            categoryDTO.setUpdatedAt(new Date());
            categoryDTO.setCreatedAt(categoryById.get().getCreatedAt());
            categoryDTO.setAuthor(userUtils.getUsernameFromContext());
            return save(categoryDTO);
        }
        return Optional.empty();
    }

    public Optional<CategoryDTO> findCategoryById(String id) {
        Optional<CategoryModel> categoryById = categoryRepository.findById(id);
        return categoryById.map(CategoryDTO::new);
    }

    public Optional<CategoryDTO> findCategoryByName(String name) {
        Optional<CategoryModel> categoryById = categoryRepository.findByCategoryName(name);
        return categoryById.map(CategoryDTO::new);
    }

    public List<String> getAllCategoriesNames() {
        return categoryRepository.findAll().stream()
                .map(CategoryModel::getCategoryName)
                .collect(Collectors.toList());
    }

    private CategoryModel categoryDtoToCategoryModel(CategoryDTO categoryDTO) {
        return CategoryModel.builder()
                .id(categoryDTO.getId())
                .categoryName(categoryDTO.getCategoryName())
                .author(categoryDTO.getAuthor())
                .createdAt(categoryDTO.getCreatedAt())
                .updatedAt(categoryDTO.getUpdatedAt())
                .subcategories(categoryDTO.getSubCategories())
                .build();
    }

    private Optional<CategoryDTO> save(CategoryDTO categoryDTO) {
        CategoryModel categoryModel = categoryDtoToCategoryModel(categoryDTO);
        CategoryModel categorySaved = categoryRepository.save(categoryModel);
        return Optional.of(new CategoryDTO(categorySaved));
    }
}
