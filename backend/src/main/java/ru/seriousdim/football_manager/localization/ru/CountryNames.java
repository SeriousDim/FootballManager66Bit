package ru.seriousdim.football_manager.localization.ru;

import java.util.HashMap;

public class CountryNames {

    public static final String RUSSIA = "Россия";
    public static final String USA = "США";
    public static final String ITALY = "Италия";

    public static HashMap<String, String> toHashMap() {
        return new HashMap<>() {{
            put("RUSSIA", RUSSIA);
            put("USA", USA);
            put("ITALY", ITALY);
        }};
    }

}
