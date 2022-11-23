package br.com.graphiacidade.graphia.model;

import br.com.graphiacidade.graphia.DTO.AppUserDTO;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Document
@Data
@Builder
public class AppUserModel {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private List<ERole> roles = new ArrayList<>();

    public static AppUserModel AppUserModelFromDTO(AppUserDTO appUserDTO, PasswordEncoder encoder) {
        return AppUserModel.builder()
                .id(appUserDTO.getId())
                .username(appUserDTO.getUsername())
                .email(appUserDTO.getEmail())
                .password(encoder.encode(appUserDTO.getPassword()))
                .roles(appUserDTO.getRoles())
                .build();
    }

    public void update(AppUserDTO appUserDTO, PasswordEncoder encoder) {
        this.username = appUserDTO.getUsername() != null ? appUserDTO.getUsername() : this.username;
        this.email = appUserDTO.getEmail() != null ? appUserDTO.getEmail(): this.email;
        this.roles = appUserDTO.getRoles() != null ? appUserDTO.getRoles() : this.roles;
        this.password = appUserDTO.getPassword() != null ? encoder.encode(appUserDTO.getPassword()) : this.password;
    }
}
