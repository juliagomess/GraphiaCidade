package br.com.graphiacidade.graphia.controller.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KPIResponse {
    private String value;
    private String name;
}
