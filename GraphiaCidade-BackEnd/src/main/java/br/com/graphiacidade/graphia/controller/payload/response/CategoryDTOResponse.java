package br.com.graphiacidade.graphia.controller.payload.response;

import br.com.graphiacidade.graphia.DTO.CategoryDTO;
import br.com.graphiacidade.graphia.model.CategoryModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
public class CategoryDTOResponse extends PaginatedResponse {
    @JsonProperty("rows")
    private List<CategoryDTO> category;

    public CategoryDTOResponse(Page<CategoryModel> categoryPaginated) {
        super(categoryPaginated);
        this.category = categoryPaginated.getContent().stream().map(CategoryDTO::new).collect(Collectors.toList());
    }
}
