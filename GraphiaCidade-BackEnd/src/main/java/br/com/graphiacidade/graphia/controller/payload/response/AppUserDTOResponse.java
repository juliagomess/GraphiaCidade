package br.com.graphiacidade.graphia.controller.payload.response;

import br.com.graphiacidade.graphia.DTO.AppUserDTO;
import br.com.graphiacidade.graphia.model.AppUserModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class AppUserDTOResponse extends PaginatedResponse {
    @JsonProperty("rows")
    private List<AppUserDTO> users;

    public AppUserDTOResponse(Page<AppUserModel> userPaginated, List<AppUserDTO> users) {
        super(userPaginated);
        this.users = users;
    }

}
