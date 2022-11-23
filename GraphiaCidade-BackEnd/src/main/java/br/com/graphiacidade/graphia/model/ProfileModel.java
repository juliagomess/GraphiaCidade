package br.com.graphiacidade.graphia.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@Builder
public class ProfileModel {
    @Id
    private String id;
    private String profileName;
    private Date createdAt;
    private Date updatedAt;
    private String author;
}
