package br.com.graphiacidade.graphia.service;

import br.com.graphiacidade.graphia.DTO.ReportDTO;
import br.com.graphiacidade.graphia.repository.ReportRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GeoNearOperation;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MapService {

    private ReportService reportService;

    public List<ReportDTO> getReportByLocation(double longitude, double latitude, double range) {
       return reportService.getReportByLocation(longitude, latitude, range);
    }

}
