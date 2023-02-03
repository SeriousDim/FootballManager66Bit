package ru.seriousdim.football_manager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import ru.seriousdim.football_manager.WebSocketRoutes;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(MainConfig.WEBSOCKET_HEAD_ROUTE);
        registry.setApplicationDestinationPrefixes(MainConfig.WEBSOCKET_PREFIX);
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(WebSocketRoutes.ENDPOINT).setAllowedOriginPatterns("*");
        registry.addEndpoint(WebSocketRoutes.ENDPOINT).setAllowedOriginPatterns("*").withSockJS();
    }

}
