package br.com.graphiacidade.graphia.service;

import br.com.graphiacidade.graphia.DTO.CategoryDTO;
import br.com.graphiacidade.graphia.DTO.ProfileDTO;
import br.com.graphiacidade.graphia.DTO.ReportDTO;
import br.com.graphiacidade.graphia.controller.payload.response.ReportDTOResponse;
import br.com.graphiacidade.graphia.model.ReportModel;
import br.com.graphiacidade.graphia.repository.ReportRepository;
import br.com.graphiacidade.graphia.security.service.UserUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReportService {
    private ReportRepository reportRepository;
    private CategoryService categoryService;
    private ProfileService profileService;
    private UserUtils userUtils;

    public ReportDTOResponse getReports(Pageable page) {
        Page<ReportModel> allReports = reportRepository.findAll(page);
        return new ReportDTOResponse(allReports);
    }
    public List<ReportDTO> getReports(String userId) {
        List<ReportModel> allReports = reportRepository.findAllByAuthorId(userId);
        return allReports.stream().map(ReportDTO::new).collect(Collectors.toList());
    }

    public List<ReportDTO> getReports(Date from, Date to) {
        List<ReportModel> reportsFiltered = reportRepository.findByCreatedAtBetween(from, to);
        return reportsFiltered.stream().map(ReportDTO::new).collect(Collectors.toList());
    }

    public Optional<ReportDTO> deleteReportById(String id) {
        Optional<ReportModel> reportById = reportRepository.findById(id);
        if (reportById.isPresent()) {
            reportRepository.delete(reportById.get());
            return Optional.of(new ReportDTO(reportById.get()));
        }
        return Optional.empty();
    }

    public Optional<ReportDTO> saveReport(ReportDTO reportDTO) {
        reportDTO.setCreatedAt(new Date());
        return save(reportDTO);
    }

    public Optional<ReportDTO> updateReportById(String id, ReportDTO reportDTO) {
        Optional<ReportModel> OptionalReportModel = reportRepository.findById(id);
        if (OptionalReportModel.isPresent()) {
            ReportModel reportModel = OptionalReportModel.get();
            reportModel.Update(reportDTO);
            reportModel.setUpdateAuthor(userUtils.getUsernameFromContext());
            ReportModel reportSaved = reportRepository.save(reportModel);
            return Optional.of(new ReportDTO(reportSaved));
        }
        return Optional.empty();
    }

    public Optional<ReportDTO> findReportById(String id) {
        Optional<ReportModel> reportById = reportRepository.findById(id);
        return reportById.map(ReportDTO::new);
    }

    public boolean validateReport(ReportDTO reportDTO) {
        Optional<CategoryDTO> reportByCategoryName =
                categoryService.findCategoryByName(reportDTO.getCategory());
        Optional<ProfileDTO> profileByName =
                profileService.findProfileByName(reportDTO.getProfileType());
        if (profileByName.isEmpty()) {
            return false;
        }
        // returns true if have valid Category and  problem type
        return reportByCategoryName.map(categoryDTO -> categoryDTO.getSubCategories()
                .stream().anyMatch(s -> reportDTO.getProblemType().equals(s))).orElse(false);
    }

    public long getTotalNumberOfReports() {
        return reportRepository.count();
    }

    public long getNumberOfReportsLastHours(long hours) {
        ZonedDateTime now = ZonedDateTime.now();
        Date DateFrom = Date.from(now.minusHours(hours).toInstant());
        Date DateTo = new Date();
        return reportRepository.countByCreatedAtBetween(DateFrom, DateTo);
    }

    public Map<String, Long> getTopCategories() {
        List<String> allCategoriesNames = categoryService.getAllCategoriesNames();
        Map<String, Long> map = new TreeMap<>(Collections.reverseOrder());
        allCategoriesNames.forEach(c -> {
            map.put(c, reportRepository.countByCategory(c));
        });
        return map;
    }

    public List<ReportDTO> getReportByLocation(double longitude, double latitude, double range) {
        List<ReportModel> reportModels = reportRepository.geoNear(longitude, latitude, range);
        return reportModels.stream().map(ReportDTO::new).collect(Collectors.toList());
    }

    private Optional<ReportDTO> save(ReportDTO reportDTO) {
        reportDTO.setAuthor(userUtils.getUserIdFromContext());
        ReportModel reportModel = ReportModel.ReportModelFromDTO(reportDTO);
        ReportModel reportSaved = reportRepository.save(reportModel);
        return Optional.of(new ReportDTO(reportSaved));
    }
}
