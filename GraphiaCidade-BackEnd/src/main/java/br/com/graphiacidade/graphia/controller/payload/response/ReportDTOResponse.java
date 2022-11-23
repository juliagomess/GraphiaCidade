package br.com.graphiacidade.graphia.controller.payload.response;

import br.com.graphiacidade.graphia.DTO.ReportDTO;
import br.com.graphiacidade.graphia.model.ReportModel;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(callSuper = true)
public class ReportDTOResponse extends PaginatedResponse {
    @JsonProperty("rows")
    private List<ReportDTO> reports;

    public ReportDTOResponse(Page<ReportModel> reportsPaginated) {
        super(reportsPaginated);
        this.reports = reportsPaginated.getContent().stream().map(ReportDTO::new).collect(Collectors.toList());
    }

}


