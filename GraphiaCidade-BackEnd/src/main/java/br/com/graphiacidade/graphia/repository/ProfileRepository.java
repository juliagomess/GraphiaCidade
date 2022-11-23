package br.com.graphiacidade.graphia.repository;

import br.com.graphiacidade.graphia.model.CategoryModel;
import br.com.graphiacidade.graphia.model.ProfileModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProfileRepository extends MongoRepository<ProfileModel, String> {
    Optional<ProfileModel> findByProfileName(String name);
}
