package ru.seriousdim.football_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.seriousdim.football_manager.config.MainConfig;
import ru.seriousdim.football_manager.entity.Country;
import ru.seriousdim.football_manager.entity.Footballer;
import ru.seriousdim.football_manager.repository.FootballerRepository;
import ru.seriousdim.football_manager.utils.CatalogUtils;

import javax.swing.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(MainConfig.HEAD_ROUTE)
public class CatalogController {

    @Autowired
    private FootballerRepository repo;

    @GetMapping("/list")
    public Iterable<Footballer> getFootballerList() {
        return repo.findAll();
    }

    @PostMapping("/list")
    public Footballer addFootballer(@RequestBody Footballer data) {
        return repo.save(data);
    }

    @GetMapping("/teams")
    public List<String> getTeams() {
        return repo.getUniqueTeams();
    }

    @GetMapping("/countries")
    public Map<String, String> getCountries() {
        return CatalogUtils.getCountries();
    }

}
