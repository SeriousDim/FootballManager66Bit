package ru.seriousdim.football_manager.utils;

import ru.seriousdim.football_manager.entity.Country;
import ru.seriousdim.football_manager.localization.ru.CountryNames;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CatalogUtils {

    /**
     * @return возвращает список стран с ключами и названиями
     * @see CountryNames
     */
    public static Map<String, String> getCountries() {
        return CountryNames.toHashMap();
    }

}
