package br.com.graphiacidade.graphia.controller.login;

import br.com.graphiacidade.graphia.controller.payload.response.LoginResponse;
import br.com.graphiacidade.graphia.controller.payload.request.ChangePassRequest;
import br.com.graphiacidade.graphia.controller.payload.response.RefreshResponse;
import br.com.graphiacidade.graphia.security.jwt.JwtUtils;
import br.com.graphiacidade.graphia.security.service.UserDetailsImpl;
import br.com.graphiacidade.graphia.security.service.UserUtils;
import br.com.graphiacidade.graphia.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/login")
@AllArgsConstructor
public class LoginController {

    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private UserService userService;
    private UserUtils userUtils;

    @GetMapping("/signin")
    public ResponseEntity<LoginResponse> authenticateUser(@RequestHeader HttpHeaders headers) {
        List<String> authorizationList = headers.get("authorization");
        if (authorizationList == null || authorizationList.size() == 0) {
            return ResponseEntity.badRequest().build();
        }

        String decodedAuth = decodeBasicAuth(authorizationList.get(0));
        String login = decodedAuth.split(":")[0];
        String password = decodedAuth.split(":")[1];

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        String refreshJwt = jwtUtils.generateJwtRefreshToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        LoginResponse response = LoginResponse.builder()
                .email(userDetails.getEmail())
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .jwtToken(jwt)
                .refreshToken(refreshJwt)
                .roles(roles)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/refresh")
    public ResponseEntity<RefreshResponse> refreshToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String jwt = jwtUtils.generateJwtToken(authentication);
        String refreshJwt = jwtUtils.generateJwtRefreshToken(authentication);

        RefreshResponse response = RefreshResponse.builder()
                .jwtToken(jwt)
                .refreshToken(refreshJwt)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/chpass")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassRequest body) {
        String userEmail = userUtils.getUserEmailFromContext();
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userEmail, body.getOldPass()));
        // if the user is authenticated then change pass
        if (!userService.changePassword(userEmail, body.getNewPass())) {
            System.out.println("unable to change password for user: " + userUtils.getUserIdFromContext());
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.noContent().build();
    }

    private String decodeBasicAuth(String payload) {
        String auth = payload.split(" ")[1];
        byte[] decodedBytes = Base64.getDecoder().decode(auth);
        return new String(decodedBytes);
    }
}
