package br.com.graphiacidade.graphia.controller.authenticated;

import br.com.graphiacidade.graphia.controller.payload.response.KPIResponse;
import br.com.graphiacidade.graphia.service.KPIService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/kpis")
@AllArgsConstructor
public class KPIController {

    public static final String USERS = "users";
    public static final String REPORTS = "reports";
    public static final String REPORTS_LAST_24 = "reports_last_24";
    public static final String REPORTS_LAST_HOUR = "reports_last_hour";

    private KPIService kpiService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<List<KPIResponse>> getKpis() {
        List<KPIResponse> kpis = new ArrayList<>();
        kpis.add(new KPIResponse(String.valueOf(kpiService.getNumberAppUsers()), USERS));
        kpis.add(new KPIResponse(String.valueOf(kpiService.getTotalNumberOfReports()), REPORTS));
        kpis.add(new KPIResponse(String.valueOf(kpiService.getNumberOfReportsInTheDay()), REPORTS_LAST_24));
        kpis.add(new KPIResponse(String.valueOf(kpiService.getNumberOfReportsLastHour()), REPORTS_LAST_HOUR));
        return ResponseEntity.ok(kpis);
    }

    @GetMapping("/rank")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<Map<String, Long>> getRank() {
    return ResponseEntity.ok(kpiService.getTopCategories());
    }
}
