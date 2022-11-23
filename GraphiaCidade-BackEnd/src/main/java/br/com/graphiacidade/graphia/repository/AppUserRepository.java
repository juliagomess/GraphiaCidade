package br.com.graphiacidade.graphia.repository;

import br.com.graphiacidade.graphia.model.AppUserModel;
import br.com.graphiacidade.graphia.model.ERole;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends MongoRepository<AppUserModel, String> {
    Optional<AppUserModel> findByUsername(String username);
    Optional<AppUserModel> findByEmail(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    long countByRoles(List<ERole> roles);

}
