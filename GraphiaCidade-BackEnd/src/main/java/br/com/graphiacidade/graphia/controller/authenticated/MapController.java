package br.com.graphiacidade.graphia.controller.authenticated;

import br.com.graphiacidade.graphia.DTO.ReportDTO;
import br.com.graphiacidade.graphia.service.MapService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/map")
@AllArgsConstructor
public class MapController {

    private MapService mapService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WEB_USER')")
    public ResponseEntity<List<ReportDTO>> getReportsByLocation(
            @RequestParam double longitude,
            @RequestParam double latitude,
            @RequestParam long range) {
        List<ReportDTO> reportByLocation =
                mapService.getReportByLocation(longitude, latitude, range);
        return ResponseEntity.ok(reportByLocation);
    }


}
