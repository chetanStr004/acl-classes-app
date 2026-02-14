package com.acl.backend.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "batches")
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String timing;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean active = true;

    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL)
    private List<Student> students;

    public Batch() {}

    public Batch(String name, String timing) {
        this.name = name;
        this.timing = timing;
        this.active = true;
    }

    public Batch(String name, String timing, boolean active) {
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

    public List<Student> getStudents() { return students; }
    public void setStudents(List<Student> students) { this.students = students; }

    public static BatchBuilder builder() {
        return new BatchBuilder();
    }

    public static class BatchBuilder {
        private String name;
        private String timing;
        private boolean active = true;

        public BatchBuilder name(String name) { this.name = name; return this; }
        public BatchBuilder timing(String timing) { this.timing = timing; return this; }
        public BatchBuilder active(boolean active) { this.active = active; return this; }

        public Batch build() {
            return new Batch(name, timing, active);
        }
    }
}
