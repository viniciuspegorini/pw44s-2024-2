package br.edu.utfpr.pb.pw44s.server.security;


import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@EnableWebSecurity
@Configuration
public class WebSecurity {

    private final AuthService authService;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public WebSecurity(final AuthService authService,
                       final AuthenticationEntryPoint authenticationEntryPoint) {
        this.authService = authService;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }
    @Bean
    @SneakyThrows
    public SecurityFilterChain filterChain(final HttpSecurity http) {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        authenticationManagerBuilder.userDetailsService(authService)
                                    .passwordEncoder(passwordEncoder());

        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

        http.headers(headers ->
                headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));

        http.csrf(AbstractHttpConfigurer::disable);

        http.exceptionHandling(exceptionHandling ->
                exceptionHandling.authenticationEntryPoint(authenticationEntryPoint));

        http.cors(AbstractHttpConfigurer::disable);

        http.authorizeHttpRequests(authorize ->
                authorize
                        .requestMatchers(antMatcher("/h2-console/**")).permitAll()
                        .requestMatchers(antMatcher(HttpMethod.POST, "/users/**")).permitAll()
                        .requestMatchers(antMatcher("/error/**")).permitAll()

                        .anyRequest().authenticated());

        http.authenticationManager(authenticationManager)
                .addFilter(new JWTAuthenticationFilter(authenticationManager, authService))
                .addFilter(new JWTAuthorizationFilter(authenticationManager, authService))

            .sessionManagement(sessionManagement ->
                    sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
