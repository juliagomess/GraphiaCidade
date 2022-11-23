package br.com.graphiacidade.graphia.controller.authenticated.Report;

import br.com.graphiacidade.graphia.DTO.ReportDTO;
import br.com.graphiacidade.graphia.security.service.UserUtils;
import br.com.graphiacidade.graphia.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/my-reports")
@AllArgsConstructor
public class MyReportsController {

    private ReportService reportService;
    private UserUtils userUtils;

    @GetMapping
    public ResponseEntity<List<ReportDTO>> getReports() {
        String userIdFromContext = userUtils.getUserIdFromContext();
        List<ReportDTO> reports = reportService.getReports(userIdFromContext);
        return ResponseEntity.ok(reports);
    }

}
