package com.acl.backend.dto;

public class BatchDTO {
    private Long id;
    private String name;
    private String timing;
    private boolean active = true;

    public BatchDTO() {}

    public BatchDTO(Long id, String name, String timing, boolean active) {
        this.id = id;
        this.name = name;
        this.timing = timing;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTiming() { return timing; }
    public void setTiming(String timing) { this.timing = timing; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public static BatchDTOBuilder builder() {
        return new BatchDTOBuilder();
    }

    public static class BatchDTOBuilder {
        private Long id;
        private String name;
        private String timing;
        private boolean active = true;

        public BatchDTOBuilder id(Long id) { this.id = id; return this; }
        public BatchDTOBuilder name(String name) { this.name = name; return this; }
        public BatchDTOBuilder timing(String timing) { this.timing = timing; return this; }
        public BatchDTOBuilder active(boolean active) { this.active = active; return this; }

        public BatchDTO build() {
            return new BatchDTO(id, name, timing, active);
        }
    }
}
