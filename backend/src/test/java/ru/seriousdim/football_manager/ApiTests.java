package ru.seriousdim.football_manager;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import ru.seriousdim.football_manager.config.MainConfig;
import ru.seriousdim.football_manager.controller.CatalogController;
import ru.seriousdim.football_manager.entity.Country;
import ru.seriousdim.football_manager.entity.Footballer;
import ru.seriousdim.football_manager.entity.Sex;
import ru.seriousdim.football_manager.repository.FootballerRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(CatalogController.class)
public class ApiTests {

    private final List mockFootballers = new ArrayList<Footballer>() {{
        add(new Footballer(1L, "Name1", "Surname1", Sex.MALE, new Date(1111111111111L), "Team A", Country.RUSSIA));
        add(new Footballer(2L, "Name2", "Surname2", Sex.MALE, new Date(1111221111111L), "Team A", Country.USA));
        add(new Footballer(3L, "Name3", "Surname3", Sex.FEMALE, new Date(1155111111111L), "Team B", Country.ITALY));
    }};

    @Autowired
    private MockMvc mvc;

    private final ObjectMapper mapper = new ObjectMapper();
    @MockBean
    private FootballerRepository repo;

    private String getRoute(String route) {
        return MainConfig.HEAD_ROUTE + route;
    }

    @Before
    public void setup() {
        when(repo.findAll()).thenReturn(mockFootballers);
    }

    @Test
    public void getList_filledData() throws Exception {
        var route = getRoute(Routes.LIST);
        var result = mvc.perform(get(route))
                .andExpect(status().isOk())
                .andReturn();

        var json = result.getResponse().getContentAsString();
        var parsed = mapper.readValue(json, new TypeReference<List<Footballer>>() {
        });

        Assertions.assertIterableEquals(mockFootballers, parsed);
    }

    @Test
    public void getList_emptyData() throws Exception {
        when(repo.findAll()).thenReturn(new ArrayList<>());

        var route = getRoute(Routes.LIST);
        var result = mvc.perform(get(route))
                .andExpect(status().isOk())
                .andReturn();

        var json = result.getResponse().getContentAsString();
        var parsed = mapper.readValue(json, new TypeReference<List<Footballer>>() {
        });

        Assertions.assertEquals(0, parsed.size());
    }

    @Test
    public void createFootballer_fullData() throws Exception {
        var fb = new Footballer(5L, "Name", "Surname", Sex.FEMALE, new Date(1111111111111L), "Team C", Country.RUSSIA);

        when(repo.save(any(Footballer.class))).thenReturn(fb);

        var json = mapper.writeValueAsString(fb);

        var route = getRoute(Routes.LIST);
        var result =  mvc.perform(post(route)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andReturn();

        json = result.getResponse().getContentAsString();
        var parsed = mapper.readValue(json, Footballer.class);

        Assert.assertEquals(fb, parsed);
        verify(repo, times(1)).save(fb);
    }

    public void createFootballer_partialData() {

    }

    public void updateFootballer() {

    }

    public void getTeams() {

    }

    public void getCountries() {

    }

}
