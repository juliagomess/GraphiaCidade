package br.com.graphiacidade.graphia.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class KPIService {
    private UserService userService;
    private ReportService reportService;

    public long getNumberAppUsers() {
        return userService.getNumberAppUsers();
    }

    public long getTotalNumberOfReports() {
        return reportService.getTotalNumberOfReports();
    }

    public long getNumberOfReportsInTheDay() {
        return reportService.getNumberOfReportsLastHours(24);
    }

    public long getNumberOfReportsLastHour() {
        return reportService.getNumberOfReportsLastHours(1);
    }

    public Map<String, Long> getTopCategories() {
        return reportService.getTopCategories();
    }

}
