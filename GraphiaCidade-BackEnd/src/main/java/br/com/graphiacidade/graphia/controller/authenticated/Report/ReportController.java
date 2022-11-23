package br.com.graphiacidade.graphia.controller.authenticated.Report;

import br.com.graphiacidade.graphia.DTO.ReportDTO;
import br.com.graphiacidade.graphia.controller.payload.response.ReportDTOResponse;
import br.com.graphiacidade.graphia.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/reports")
@AllArgsConstructor
public class ReportController {
    private ReportService reportService;

    @GetMapping
    public ResponseEntity<ReportDTOResponse> getReports(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int page) {
        Pageable paging = PageRequest.of(page, limit);
        ReportDTOResponse reports = reportService.getReports(paging);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportDTO> getReport(@PathVariable String id) {
        Optional<ReportDTO> reportById = reportService.findReportById(id);
        return reportById.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_APP_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ReportDTO> saveReport(@RequestBody ReportDTO reportDTO) {
        if (!reportService.validateReport(reportDTO)) {
            return ResponseEntity.badRequest().build();
        }
        Optional<ReportDTO> reportSaved = reportService.saveReport(reportDTO);
        return reportSaved.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.internalServerError().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReportDTO> updateReport(
            @PathVariable String id,
            @RequestBody ReportDTO reportDTO) {
        if (reportService.validateReport(reportDTO)) {
            return ResponseEntity.badRequest().build();
        }
        Optional<ReportDTO> reportUpdated = reportService.updateReportById(id, reportDTO);
        return reportUpdated.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_WEB_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ReportDTO> deleteReport(@PathVariable String id) {
        Optional<ReportDTO> reportDeleted = reportService.deleteReportById(id);
        return reportDeleted.map(ResponseEntity::ok).orElseGet(
                () -> ResponseEntity.notFound().build());
    }
}
