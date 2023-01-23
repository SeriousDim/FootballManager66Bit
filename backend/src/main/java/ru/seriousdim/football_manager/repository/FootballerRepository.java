package ru.seriousdim.football_manager.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.seriousdim.football_manager.entity.Footballer;

import java.util.List;

@Repository
public interface FootballerRepository
        extends CrudRepository<Footballer, Long> {

    @Query("SELECT DISTINCT team FROM Footballer")
    List<String> getUniqueTeams();

}
