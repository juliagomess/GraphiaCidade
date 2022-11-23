package br.com.graphiacidade.graphia.DTO;

import br.com.graphiacidade.graphia.model.AppUserModel;
import br.com.graphiacidade.graphia.model.ERole;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class AppUserDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;
    private String username;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private List<ERole> roles = new ArrayList<>();

    public AppUserDTO(AppUserModel appUser) {
        this.id = appUser.getId();
        this.username = appUser.getUsername();
        this.email = appUser.getEmail();
        this.password = appUser.getPassword();
        this.roles = appUser.getRoles();
    }
}
