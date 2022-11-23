package br.com.graphiacidade.graphia.security.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserUtils {
    public String getUsernameFromContext() {
        UserDetailsImpl userPrincipal = getUserDetails();
        return userPrincipal.getUsername();
    }

    public String getUserEmailFromContext() {
        UserDetailsImpl userPrincipal = getUserDetails();
        return userPrincipal.getEmail();
    }

    public String getUserIdFromContext() {
        UserDetailsImpl userPrincipal = getUserDetails();
        return userPrincipal.getId();
    }

    private UserDetailsImpl getUserDetails() {
        return (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
