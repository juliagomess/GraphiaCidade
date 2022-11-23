package br.com.graphiacidade.graphia.controller.payload.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RefreshResponse {
    private String jwtToken;
    private String refreshToken;
    @Builder.Default
    private String type = "Bearer";
}
