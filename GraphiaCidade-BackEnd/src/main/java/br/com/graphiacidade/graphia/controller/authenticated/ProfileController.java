package br.com.graphiacidade.graphia.controller.authenticated;

import br.com.graphiacidade.graphia.DTO.ProfileDTO;
import br.com.graphiacidade.graphia.controller.payload.response.ProfilesDTOResponse;
import br.com.graphiacidade.graphia.service.ProfileService;
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
@RequestMapping("v1/profile")
@AllArgsConstructor
public class ProfileController {
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<?> getProfile(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "false") boolean isPaginated) {
        if (isPaginated) {
            Pageable paging = PageRequest.of(page, limit);
            ProfilesDTOResponse profiles = profileService.getProfiles(paging);
            return ResponseEntity.ok(profiles);
        }
        List<ProfileDTO> profiles = profileService.getProfiles();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDTO> getProfile(
            @PathVariable String id) {
        Optional<ProfileDTO> profileDTO = profileService.findProfileById(id);
        return profileDTO.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<ProfileDTO> saveProfile(
            @RequestBody ProfileDTO profileDTO) {
        Optional<ProfileDTO> profileSaved = profileService.saveProfile(profileDTO);
        return profileSaved.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.internalServerError().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<?> updateProfile(
            @PathVariable String id,
            @RequestBody ProfileDTO profileDTO) {
        Optional<ProfileDTO> profileUpdated = profileService.updateProfileById(id, profileDTO);
        return profileUpdated.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProfile(
            @PathVariable String id) {
        Optional<ProfileDTO> profileDeleted = profileService.deleteProfileById(id);
        return profileDeleted.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }


}
