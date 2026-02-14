package com.acl.backend.controller;

import com.acl.backend.dto.BatchDTO;
import com.acl.backend.dto.StudentDTO;
import com.acl.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/batches")
    public ResponseEntity<BatchDTO> createBatch(@RequestBody BatchDTO batchDTO) {
        return ResponseEntity.ok(adminService.createBatch(batchDTO));
    }

    @PostMapping("/students")
    public ResponseEntity<String> registerStudent(@RequestBody StudentDTO studentDTO) {
        adminService.registerStudent(studentDTO);
        return ResponseEntity.ok("Student registered successfully");
    }

    @GetMapping("/batches")
    public ResponseEntity<List<BatchDTO>> getAllBatches() {
        return ResponseEntity.ok(adminService.getAllBatches());
    }

    @GetMapping("/batches/{batchId}/students")
    public ResponseEntity<List<StudentDTO>> getStudentsByBatch(@PathVariable Long batchId) {
        return ResponseEntity.ok(adminService.getStudentsByBatch(batchId));
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        adminService.updateStudent(id, studentDTO);
        return ResponseEntity.ok("Student updated successfully");
    }

    @PutMapping("/batches/{id}")
    public ResponseEntity<String> updateBatch(@PathVariable Long id, @RequestBody BatchDTO batchDTO) {
        adminService.updateBatch(id, batchDTO);
        return ResponseEntity.ok("Batch updated successfully");
    }

    @DeleteMapping("/batches/{id}")
    public ResponseEntity<String> deleteBatch(@PathVariable Long id) {
        adminService.deleteBatch(id);
        return ResponseEntity.ok("Batch deleted successfully");
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        adminService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }
}
