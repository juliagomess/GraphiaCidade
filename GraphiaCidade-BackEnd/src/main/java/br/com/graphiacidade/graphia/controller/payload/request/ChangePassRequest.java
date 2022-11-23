package br.com.graphiacidade.graphia.controller.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ChangePassRequest {
    @NotNull
    @JsonProperty("old_password")
    private String oldPass;
    @NotNull
    @JsonProperty("new_password")
    private String newPass;
}
