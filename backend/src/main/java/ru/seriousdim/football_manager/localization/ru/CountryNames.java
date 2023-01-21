package ru.seriousdim.football_manager.localization.ru;

import java.util.HashMap;

/**
 * Класс с названиями стран на русском языке
 */
public class CountryNames {

    public static final String RUSSIA = "Россия";
    public static final String USA = "США";
    public static final String ITALY = "Италия";

    /**
     *
     * @return HashMap:
     * ключ - значение из {@link ru.seriousdim.football_manager.entity.Country},
     * значение - название страны на русском языке
     */
    public static HashMap<String, String> toHashMap() {
        return new HashMap<>() {{
            put("RUSSIA", RUSSIA);
            put("USA", USA);
            put("ITALY", ITALY);
        }};
    }

}
