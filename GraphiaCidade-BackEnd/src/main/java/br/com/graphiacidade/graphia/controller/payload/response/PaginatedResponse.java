package br.com.graphiacidade.graphia.controller.payload.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Data
@NoArgsConstructor
public abstract class PaginatedResponse {
    protected int totalPages;
    protected long totalElements;
    protected boolean last;
    protected int size;

    public PaginatedResponse(Page<?> pagination) {
        this.totalPages = pagination.getTotalPages();
        this.totalElements = pagination.getTotalElements();
        this.last = pagination.isLast();
        this.size = pagination.getSize();
    }
}
