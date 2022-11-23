package br.com.graphiacidade.graphia.DTO;

import br.com.graphiacidade.graphia.model.CategoryModel;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import static br.com.graphiacidade.graphia.communs.Constants.DateMaskFormat;

@Data
@NoArgsConstructor
public class CategoryDTO {
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

    private List<String> subCategories;
    private String categoryName;

    public CategoryDTO(CategoryModel categoryModel) {
        this.id = categoryModel.getId();
        this.categoryName = categoryModel.getCategoryName();
        this.createdAt = categoryModel.getCreatedAt();
        this.updatedAt = categoryModel.getUpdatedAt();
        this.author = categoryModel.getAuthor();
        this.subCategories = categoryModel.getSubcategories();
    }
}
