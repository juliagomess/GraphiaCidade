package br.com.graphiacidade.graphia.repository;

import br.com.graphiacidade.graphia.model.CategoryModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<CategoryModel, String> {
    Optional<CategoryModel> findByCategoryName(String name);
}
