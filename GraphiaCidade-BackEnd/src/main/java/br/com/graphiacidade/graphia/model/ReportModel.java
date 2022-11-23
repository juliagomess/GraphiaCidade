package br.com.graphiacidade.graphia.model;

import br.com.graphiacidade.graphia.DTO.ReportDTO;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@Builder
public class ReportModel {
    @Id
    private String id;
    private Date createdAt;
    private Date updatedAt;
    private String creatorAuthor;
    private String updateAuthor;
    private String authorId;
    private String category;
    private String problemType;
    private String profileType;
    private String description;
    private String photo;
    private String audio;
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;

    public static ReportModel ReportModelFromDTO(ReportDTO reportDTO) {
        ReportModel reportModel = ReportModel.builder()
                .id(reportDTO.getId())
                .createdAt(reportDTO.getCreatedAt())
                .updatedAt(reportDTO.getUpdatedAt())
                .creatorAuthor(reportDTO.getAuthor())
                .authorId(reportDTO.getAuthor())
                .updateAuthor(reportDTO.getUpdateAuthor())
                .category(reportDTO.getCategory())
                .profileType(reportDTO.getProfileType())
                .problemType(reportDTO.getProblemType())
                .description(reportDTO.getDescription())
                .photo(reportDTO.getPhoto())
                .audio(reportDTO.getAudio())
                .build();
        if (reportDTO.getLatitude() != null
                && reportDTO.getLongitude() != null) {
            reportModel.setLocation(new GeoJsonPoint(
                    Double.parseDouble(reportDTO.getLatitude()),
                    Double.parseDouble(reportDTO.getLongitude())));
        }
        return reportModel;
    }

    public void Update(ReportDTO report) {
        this.category = report.getCategory() != null ? report.getCategory() : this.category;
        this.problemType = report.getProblemType()!= null ? report.getProblemType() : this.problemType;
        this.profileType = report.getProfileType() != null ? report.getProfileType() : this.problemType;
        this.description = report.getDescription() != null ? report.getDescription() : this.description;
        this.updatedAt = new Date();
    }


}
