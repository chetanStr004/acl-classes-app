package com.acl.backend.controller;

import com.acl.backend.dto.BatchDTO;
import com.acl.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final AdminService adminService;
    private final com.acl.backend.repository.StudentRepository studentRepository;
    private final com.acl.backend.repository.BatchRepository batchRepository;

    public StudentController(AdminService adminService, 
                             com.acl.backend.repository.StudentRepository studentRepository,
                             com.acl.backend.repository.BatchRepository batchRepository) {
        this.adminService = adminService;
        this.studentRepository = studentRepository;
        this.batchRepository = batchRepository;
    }

    @GetMapping("/batches")
    public ResponseEntity<List<BatchDTO>> getAllBatches() {
        return ResponseEntity.ok(batchRepository.findByActiveTrue().stream()
                .map(batch -> com.acl.backend.dto.BatchDTO.builder()
                        .id(batch.getId())
                        .name(batch.getName())
                        .timing(batch.getTiming())
                        .active(batch.isActive())
                        .build())
                .collect(java.util.stream.Collectors.toList()));
    }

    @GetMapping("/my-batch")
    public ResponseEntity<BatchDTO> getMyBatch(java.security.Principal principal) {
        String username = principal.getName();
        return studentRepository.findByUser_Username(username)
                .map(student -> {
                    if (student.getBatch() != null && student.getBatch().isActive()) {
                        return ResponseEntity.ok(com.acl.backend.dto.BatchDTO.builder()
                                .id(student.getBatch().getId())
                                .name(student.getBatch().getName())
                                .timing(student.getBatch().getTiming())
                                .active(student.getBatch().isActive())
                                .build());
                    } else {
                        return ResponseEntity.noContent().<BatchDTO>build();
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
