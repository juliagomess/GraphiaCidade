package br.com.graphiacidade.graphia.controller.payload.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LoginResponse {
    private String jwtToken;
    private String refreshToken;
    @Builder.Default
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private List<String> roles;
}
