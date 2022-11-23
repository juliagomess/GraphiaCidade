package br.com.graphiacidade.graphia.controller.payload.response;

import br.com.graphiacidade.graphia.DTO.ProfileDTO;
import br.com.graphiacidade.graphia.model.ProfileModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class ProfilesDTOResponse extends PaginatedResponse {
    @JsonProperty("rows")
    private List<ProfileDTO> profile;

    public ProfilesDTOResponse(Page<ProfileModel> profilePaginated) {
        super(profilePaginated);
        this.profile = profilePaginated.getContent().stream().map(ProfileDTO::new).collect(Collectors.toList());
    }

}
