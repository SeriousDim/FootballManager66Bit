package ru.seriousdim.football_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import ru.seriousdim.football_manager.Routes;
import ru.seriousdim.football_manager.WebSocketRoutes;
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

    private final FootballerRepository repo;

    @Autowired
    public CatalogController(final FootballerRepository repo) {
        this.repo = repo;
    }

    /**
     * @return актуальный список футболистов
     */
    @GetMapping(Routes.LIST)
    public Iterable<Footballer> getFootballerList() {
        return repo.findAll();
    }

    /**
     * @param data данные о новом или существующем футболисте
     * @return созданные/измененные данные о футболисте
     */
    @PostMapping(Routes.LIST)
    public Footballer addFootballer(@RequestBody Footballer data) {
        return repo.save(data);
    }

    /**
     * @return список всех команд от всех футболистов
     */
    @GetMapping(Routes.TEAMS)
    public List<String> getTeams() {
        return repo.getUniqueTeams();
    }

    /**
     * @return фиксированный список стран: ключи и названия
     */
    @GetMapping(Routes.COUNTRIES)
    public Map<String, String> getCountries() {
        return CatalogUtils.getCountries();
    }

    @MessageMapping(WebSocketRoutes.POST_FOOTBALLERS)
    @SendTo(MainConfig.WEBSOCKET_HEAD_ROUTE + WebSocketRoutes.REFRESH)
    public Footballer addAndRefreshFootballer(@Payload Footballer footballer) {
        return repo.save(footballer);
    }

}
