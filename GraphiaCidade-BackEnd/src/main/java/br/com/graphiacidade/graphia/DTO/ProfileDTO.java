package br.com.graphiacidade.graphia.DTO;

import br.com.graphiacidade.graphia.model.ProfileModel;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import static br.com.graphiacidade.graphia.communs.Constants.DateMaskFormat;


@Data
@NoArgsConstructor
public class ProfileDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateMaskFormat)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateMaskFormat)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date updatedAt;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String author;

    private String profileName;

    public ProfileDTO(ProfileModel profileModel) {
        this.id = profileModel.getId();
        this.profileName = profileModel.getProfileName();
        this.createdAt = profileModel.getCreatedAt();
        this.updatedAt = profileModel.getUpdatedAt();
        this.author = profileModel.getAuthor();
    }
}
