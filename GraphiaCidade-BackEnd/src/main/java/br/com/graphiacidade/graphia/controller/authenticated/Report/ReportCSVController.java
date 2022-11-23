package br.com.graphiacidade.graphia.controller.authenticated.Report;


import br.com.graphiacidade.graphia.DTO.ReportDTO;
import br.com.graphiacidade.graphia.communs.StrUtils;
import br.com.graphiacidade.graphia.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static br.com.graphiacidade.graphia.communs.Constants.DateMaskFormatWithoutHour;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/reports-csv")
@AllArgsConstructor
public class ReportCSVController {

    private ReportService reportService;

    @GetMapping
    public ResponseEntity<?> getReportCsv(
            @RequestParam String from,
            @RequestParam String to) {
        try {
            Date dateFrom = new SimpleDateFormat(DateMaskFormatWithoutHour).parse(from);
            Date dateTo = new SimpleDateFormat(DateMaskFormatWithoutHour).parse(to);
            List<ReportDTO> reports = reportService.getReports(dateFrom, dateTo);
            String csv = StrUtils.listOfReportToCSVString(reports);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("Content-Disposition",
                    "attachment; filename=\"Report.csv\"");
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(csv);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body("invalid_fields");
        }
    }

}
