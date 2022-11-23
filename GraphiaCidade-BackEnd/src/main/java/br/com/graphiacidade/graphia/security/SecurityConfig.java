package br.com.graphiacidade.graphia.security;

import br.com.graphiacidade.graphia.DTO.AppUserDTO;
import br.com.graphiacidade.graphia.model.ERole;
import br.com.graphiacidade.graphia.security.jwt.AuthEntryPointJwt;
import br.com.graphiacidade.graphia.security.jwt.AuthTokenFilter;
import br.com.graphiacidade.graphia.security.service.UserDetailsServiceImpl;
import br.com.graphiacidade.graphia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(
        // securedEnabled = true,
        // jsr250Enabled = true,
        prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;
    @Autowired
    UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserService userService;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public void adminAccountCreator() {
        // This bean creates the admin user if doesn't exists
        //TODO create this user based in configuration
        Optional<AppUserDTO> rootUser = userService.findAppUserByUsername("admin");
        if (rootUser.isEmpty()) {
            System.out.println("#### Creating admin user ####");
            List<ERole> roles = new ArrayList<>();
            roles.add(ERole.ROLE_ADMIN);
            AppUserDTO appUsrDTO = new AppUserDTO();
            appUsrDTO.setEmail("admin@admin.com");
            appUsrDTO.setPassword("password");
            appUsrDTO.setUsername("admin");
            appUsrDTO.setRoles(roles);
            userService.saveUser(appUsrDTO);
        }
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/v1/login/signin").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
