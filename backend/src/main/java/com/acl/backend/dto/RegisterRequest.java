package com.acl.backend.dto;

public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String role; // ACL_ADMIN or STUDENT

    public RegisterRequest() {}

    public RegisterRequest(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public static RegisterRequestBuilder builder() {
        return new RegisterRequestBuilder();
    }

    public static class RegisterRequestBuilder {
        private String username;
        private String password;
        private String email;
        private String role;

        public RegisterRequestBuilder username(String username) { this.username = username; return this; }
        public RegisterRequestBuilder password(String password) { this.password = password; return this; }
        public RegisterRequestBuilder email(String email) { this.email = email; return this; }
        public RegisterRequestBuilder role(String role) { this.role = role; return this; }

        public RegisterRequest build() {
            return new RegisterRequest(username, password, email, role);
        }
    }
}
