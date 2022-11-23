package br.com.graphiacidade.graphia.service;

import br.com.graphiacidade.graphia.DTO.AppUserDTO;
import br.com.graphiacidade.graphia.controller.payload.response.AppUserDTOResponse;
import br.com.graphiacidade.graphia.model.AppUserModel;
import br.com.graphiacidade.graphia.model.ERole;
import br.com.graphiacidade.graphia.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private AppUserRepository appUserRepository;
    private PasswordEncoder encoder;

    public AppUserDTOResponse getUsers(Pageable page, List<ERole> roles) {
        Page<AppUserModel> allUsers = appUserRepository.findAll(page);

        List<AppUserModel> appUsrModels = allUsers.getContent();
        if (!roles.isEmpty()) {
            List<AppUserModel> appUserFiltered = appUsrModels.stream()
                    .filter(appUserModel -> appUserModel
                            .getRoles().stream()
                            .anyMatch(eRoleFromModel -> eRoleFromModel
                                    .contains(roles)))
                    .collect(Collectors.toList());
            return new AppUserDTOResponse(allUsers, getAppUserDTOS(appUserFiltered));
        }
        return new AppUserDTOResponse(allUsers, getAppUserDTOS(appUsrModels));
    }

    private List<AppUserDTO> getAppUserDTOS(List<AppUserModel> appUsrModels) {
        return appUsrModels.stream()
                .map(AppUserDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<AppUserDTO> saveUser(AppUserDTO user) {
        AppUserModel userSaved = appUserRepository.save(AppUserModel.AppUserModelFromDTO(user, encoder));
        return Optional.of(new AppUserDTO(userSaved));
    }

    public Optional<AppUserDTO> updateAppUserById(String id, AppUserDTO appUserDTO) {
        Optional<AppUserModel> optionalAppUser = appUserRepository.findById(id);
        if (optionalAppUser.isPresent()) {
            AppUserModel appUser = optionalAppUser.get();
            appUser.update(appUserDTO, encoder);
            AppUserModel appUserSaved = appUserRepository.save(appUser);
            return Optional.of(new AppUserDTO(appUserSaved));
        }
        return Optional.empty();
    }

    public Optional<AppUserDTO> findAppUserByUsername(String username) {
        Optional<AppUserModel> userById = appUserRepository.findByUsername(username);
        return userById.map(AppUserDTO::new);
    }

    public Optional<AppUserDTO> findAppUserById(String id) {
        Optional<AppUserModel> userById = appUserRepository.findById(id);
        return userById.map(AppUserDTO::new);
    }

    public Optional<AppUserDTO> deleteUserById(String id) {
        Optional<AppUserModel> userById = appUserRepository.findById(id);
        if (userById.isPresent()) {
            appUserRepository.delete(userById.get());
            return Optional.of(new AppUserDTO(userById.get()));
        }
        return Optional.empty();
    }

    public long getNumberAppUsers() {
        List<ERole> roles = new ArrayList<>();
        roles.add(ERole.ROLE_APP_USER);
        return appUserRepository.countByRoles(roles);
    }

    public boolean changePassword(String userEmail, String newPass) {
        Optional<AppUserModel> userByUsername = appUserRepository.findByEmail(userEmail);
        String newPasswordEncoded = encoder.encode(newPass);
        if (userByUsername.isPresent()) {
            userByUsername.get().setPassword(newPasswordEncoded);
            appUserRepository.save(userByUsername.get());
            return true;
        }
        return false;
    }
}

