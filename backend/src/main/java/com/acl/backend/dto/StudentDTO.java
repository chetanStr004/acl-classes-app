package com.acl.backend.dto;

public class StudentDTO {
    private Long id;
    private String name;
    private String phone;
    private String email;
    private Long batchId;
    private String username;
    private String password;
    private boolean active = true;

    public StudentDTO() {}

    public StudentDTO(Long id, String name, String phone, String email, Long batchId, String username, String password) {
        this(id, name, phone, email, batchId, username, password, true);
    }

    public StudentDTO(Long id, String name, String phone, String email, Long batchId, String username, String password, boolean active) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.batchId = batchId;
        this.username = username;
        this.password = password;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getBatchId() { return batchId; }
    public void setBatchId(Long batchId) { this.batchId = batchId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public static StudentDTOBuilder builder() {
        return new StudentDTOBuilder();
    }

    public static class StudentDTOBuilder {
        private Long id;
        private String name;
        private String phone;
        private String email;
        private Long batchId;
        private String username;
        private String password;
        private boolean active = true;

        public StudentDTOBuilder id(Long id) { this.id = id; return this; }
        public StudentDTOBuilder name(String name) { this.name = name; return this; }
        public StudentDTOBuilder phone(String phone) { this.phone = phone; return this; }
        public StudentDTOBuilder email(String email) { this.email = email; return this; }
        public StudentDTOBuilder batchId(Long batchId) { this.batchId = batchId; return this; }
        public StudentDTOBuilder username(String username) { this.username = username; return this; }
        public StudentDTOBuilder password(String password) { this.password = password; return this; }
        public StudentDTOBuilder active(boolean active) { this.active = active; return this; }

        public StudentDTO build() {
            return new StudentDTO(id, name, phone, email, batchId, username, password, active);
        }
    }
}
