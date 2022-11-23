package br.com.graphiacidade.graphia.repository;

import br.com.graphiacidade.graphia.model.ReportModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface ReportRepository extends MongoRepository<ReportModel, String> {
    List<ReportModel> findByCreatedAtBetween(Date from, Date to);

    List<ReportModel> findAllByAuthorId(String author);

    long countByCreatedAtBetween(Date from, Date to);

    long countByCategory(String category);

    @Query("{location: { $near : {$geometry: { type: \"Point\",  coordinates: [?0, ?1] },$maxDistance: ?2}}}")
    List<ReportModel> geoNear(double longitude, double latitude, double range);
}
