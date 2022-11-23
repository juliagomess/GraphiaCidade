package br.com.graphiacidade.graphia.model;

import java.util.List;

public enum ERole {
    ROLE_WEB_USER,
    ROLE_APP_USER,
    ROLE_ADMIN;

    public boolean contains(List<ERole> eRoleList) {
        return eRoleList.stream().anyMatch(eRole -> eRole.equals(this));
    }
}
