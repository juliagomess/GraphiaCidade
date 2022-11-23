package br.com.graphiacidade.graphia.DTO;

import br.com.graphiacidade.graphia.model.ReportModel;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import static br.com.graphiacidade.graphia.communs.Constants.*;

@Data
@NoArgsConstructor
public class ReportDTO {
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

    private String updateAuthor;

    private String category;
    private String problemType;
    private String profileType;
    private String description;
    private String photo;
    private String audio;
    private String longitude;
    private String latitude;

    public ReportDTO(ReportModel reportModel) {
        this.id = reportModel.getId();
        this.createdAt = reportModel.getCreatedAt();
        this.updatedAt = reportModel.getUpdatedAt();
        this.author = reportModel.getCreatorAuthor();
        this.updateAuthor = reportModel.getUpdateAuthor();
        this.category = reportModel.getCategory();
        this.problemType = reportModel.getProblemType();
        this.profileType = reportModel.getProfileType();
        this.description = reportModel.getDescription();
        this.photo = reportModel.getPhoto();
        this.audio = reportModel.getAudio();
        if (reportModel.getLocation() != null){
            this.longitude = String.valueOf(reportModel.getLocation().getX());
            this.latitude = String.valueOf(reportModel.getLocation().getY());
        }
    }
}
