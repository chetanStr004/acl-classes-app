package com.acl.backend.dto;

public class AuthenticationResponse {
    private String token;
    private String username;
    private String role;

    public AuthenticationResponse() {}

    public AuthenticationResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public static AuthenticationResponseBuilder builder() {
        return new AuthenticationResponseBuilder();
    }

    public static class AuthenticationResponseBuilder {
        private String token;
        private String username;
        private String role;

        public AuthenticationResponseBuilder token(String token) { this.token = token; return this; }
        public AuthenticationResponseBuilder username(String username) { this.username = username; return this; }
        public AuthenticationResponseBuilder role(String role) { this.role = role; return this; }

        public AuthenticationResponse build() {
            return new AuthenticationResponse(token, username, role);
        }
    }
}
