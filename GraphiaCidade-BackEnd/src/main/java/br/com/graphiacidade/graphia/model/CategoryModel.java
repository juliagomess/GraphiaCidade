package br.com.graphiacidade.graphia.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
@Data
@Builder
public class CategoryModel {
    @Id
    private String id;
    private String categoryName;
    private Date createdAt;
    private Date updatedAt;
    private String author;
    private List<String> subcategories;
}
