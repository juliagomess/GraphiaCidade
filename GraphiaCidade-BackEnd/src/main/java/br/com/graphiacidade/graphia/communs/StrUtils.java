package br.com.graphiacidade.graphia.communs;

import br.com.graphiacidade.graphia.DTO.ReportDTO;

import java.util.List;

import static br.com.graphiacidade.graphia.communs.Constants.REPORT_CSV_HEADER;

public class StrUtils {


    public static String listOfReportToCSVString(List<ReportDTO> reports){
        if(!reports.isEmpty()) {
            StringBuilder csv = new StringBuilder();
            csv.append(REPORT_CSV_HEADER);
            reports.forEach(reportDTO -> {
                csv.append("\n")
                        .append(skipForCSV(reportDTO.getCategory()))
                        .append(",")
                        .append(skipForCSV(reportDTO.getProblemType()))
                        .append(",")
                        .append(skipForCSV(reportDTO.getDescription()))
                        .append(",")
                        .append(reportDTO.getLatitude())
                        .append(",")
                        .append(reportDTO.getLongitude());
            });
            return csv.toString();
        }
        return "";
    }

    private static String skipForCSV(String input){
        return  input != null ? input.replace(",","\",\"") : null;
    }
}
