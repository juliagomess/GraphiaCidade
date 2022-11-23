package br.com.graphiacidade.graphia.security.service;

import br.com.graphiacidade.graphia.model.AppUserModel;
import br.com.graphiacidade.graphia.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    AppUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUserModel user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("user " + username + " Not found"));
        return UserDetailsImpl.build(user);
    }
}
