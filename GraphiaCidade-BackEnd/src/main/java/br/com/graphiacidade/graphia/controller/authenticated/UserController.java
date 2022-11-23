package br.com.graphiacidade.graphia.controller.authenticated;

import br.com.graphiacidade.graphia.DTO.AppUserDTO;
import br.com.graphiacidade.graphia.controller.payload.response.AppUserDTOResponse;
import br.com.graphiacidade.graphia.model.ERole;
import br.com.graphiacidade.graphia.security.service.UserDetailsImpl;
import br.com.graphiacidade.graphia.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/users")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AppUserDTOResponse> getAppUsers(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) String roles) {
        Pageable paging = PageRequest.of(page, limit);

        List<ERole> eRoleList = new ArrayList<ERole>();
        if (roles != null) {
            try {
                eRoleList = Arrays.stream(roles.split(","))
                        .map(ERole::valueOf)
                        .collect(Collectors.toList());
            }catch(IllegalArgumentException e){
                return ResponseEntity.badRequest().build();
            }
        }
        AppUserDTOResponse users = userService.getUsers(paging, eRoleList);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AppUserDTO> getAppUser(
            @PathVariable String id) {
        Optional<AppUserDTO> userById = userService.findAppUserById(id);
        return userById.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AppUserDTO> saveUser(
            @RequestBody AppUserDTO appUserDTO) {
        Optional<AppUserDTO> appUserByUsername = userService.findAppUserByUsername(appUserDTO.getUsername());
        if (appUserByUsername.isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Optional<AppUserDTO> userSaved = userService.saveUser(appUserDTO);
        return userSaved.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.internalServerError().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<AppUserDTO> updateUser(
            @PathVariable String id,
            @RequestBody AppUserDTO appUserDTO) {
        Optional<AppUserDTO> userUpdated = userService.updateAppUserById(id, appUserDTO);
        return userUpdated.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAppUser(
            @PathVariable String id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        if (userDetails.getId().equals(id)) {
            return new ResponseEntity<>("You are not able to remove yourself",
                    HttpStatus.NOT_ACCEPTABLE);
        }
        Optional<AppUserDTO> userDeleted = userService.deleteUserById(id);
        return userDeleted.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

}
