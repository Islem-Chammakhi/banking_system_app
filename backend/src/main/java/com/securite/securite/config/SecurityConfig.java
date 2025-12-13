package com.securite.securite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.securite.securite.security.CustomUserDetailsService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

// ! we will use form base authentication  

@EnableWebSecurity
@EnableMethodSecurity // to use preAuthorize(hasRole)
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService userDetailsService;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
            .csrf(csrf-> csrf.disable())
            .formLogin(form -> form.disable())
            .httpBasic(h -> h.disable())
            .authorizeHttpRequests(auth -> auth
                    // .requestMatchers("/auth/**","/account/**","/transfer/**")
                    .requestMatchers("/auth/**","/insert-user","/account")
                    .permitAll()
                    .anyRequest().authenticated())
            .sessionManagement(session ->
                    session
                        .maximumSessions(1) // Un utilisateur ne peut avoir qu'une seule session active à la fois.
                        .maxSessionsPreventsLogin(true) // Empêche le nouvel utilisateur de se connecter. Le nouveau login est rejeté

            )
            .logout(logout -> logout
                        .logoutUrl("/auth/logout")
                        .logoutSuccessHandler((req, res, auth) -> {
                            res.setStatus(HttpServletResponse.SC_OK);
                            res.getWriter().write("Logged out successfully");
                        })
                );
             http.userDetailsService(userDetailsService); // ! important puisque spring utilise un objet UserDetailsService
             http.authenticationProvider(authProvider(userDetailsService));


        return http.build();

   
    }
    @Bean


    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    
    @Bean
    public DaoAuthenticationProvider authProvider(CustomUserDetailsService userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
}


}
