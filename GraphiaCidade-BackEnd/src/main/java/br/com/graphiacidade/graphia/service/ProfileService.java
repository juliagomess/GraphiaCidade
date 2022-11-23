package br.com.graphiacidade.graphia.service;

import br.com.graphiacidade.graphia.DTO.ProfileDTO;
import br.com.graphiacidade.graphia.controller.payload.response.ProfilesDTOResponse;
import br.com.graphiacidade.graphia.model.ProfileModel;
import br.com.graphiacidade.graphia.repository.ProfileRepository;
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
public class ProfileService {
    private ProfileRepository profileRepository;
    private UserUtils userUtils;


    public ProfilesDTOResponse getProfiles(Pageable page) {
        Page<ProfileModel> allProfiles = profileRepository.findAll(page);
        return new ProfilesDTOResponse(allProfiles);
    }

    public List<ProfileDTO> getProfiles() {
        List<ProfileModel> allProfiles = profileRepository.findAll();
        return allProfiles.stream().map(ProfileDTO::new).collect(Collectors.toList());
    }

    public Optional<ProfileDTO> deleteProfileById(String id) {
        Optional<ProfileModel> profileById = profileRepository.findById(id);
        if (profileById.isPresent()) {
            profileRepository.delete(profileById.get());
            return Optional.of(new ProfileDTO(profileById.get()));
        }
        return Optional.empty();
    }

    public Optional<ProfileDTO> saveProfile(ProfileDTO profileDTO) {
        profileDTO.setCreatedAt(new Date());
        profileDTO.setAuthor(userUtils.getUsernameFromContext());
        return save(profileDTO);
    }

    public Optional<ProfileDTO> updateProfileById(String id, ProfileDTO profileDTO) {
        Optional<ProfileModel> profileById = profileRepository.findById(id);
        if (profileById.isPresent()) {
            profileDTO.setId(id);
            profileDTO.setUpdatedAt(new Date());
            profileDTO.setCreatedAt(profileById.get().getCreatedAt());
            profileDTO.setAuthor(userUtils.getUsernameFromContext());
            return save(profileDTO);
        }
        return Optional.empty();
    }

    public Optional<ProfileDTO> findProfileById(String id) {
        Optional<ProfileModel> profileById = profileRepository.findById(id);
        return profileById.map(ProfileDTO::new);
    }

    public Optional<ProfileDTO> findProfileByName(String name) {
        Optional<ProfileModel> profileById = profileRepository.findByProfileName(name);
        return profileById.map(ProfileDTO::new);
    }

    private ProfileModel profileDtoToProfileModel(ProfileDTO profileDTO) {
        return ProfileModel.builder()
                .id(profileDTO.getId())
                .profileName(profileDTO.getProfileName())
                .author(profileDTO.getAuthor())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    private Optional<ProfileDTO> save(ProfileDTO profileDTO) {
        ProfileModel profileModel = profileDtoToProfileModel(profileDTO);
        ProfileModel profileSaved = profileRepository.save(profileModel);
        return Optional.of(new ProfileDTO(profileSaved));
    }
}
