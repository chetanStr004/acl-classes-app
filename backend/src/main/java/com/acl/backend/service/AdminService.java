package com.acl.backend.service;

import com.acl.backend.dto.BatchDTO;
import com.acl.backend.dto.StudentDTO;
import com.acl.backend.entity.Batch;
import com.acl.backend.entity.Student;
import com.acl.backend.entity.User;
import com.acl.backend.repository.BatchRepository;
import com.acl.backend.repository.StudentRepository;
import com.acl.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final BatchRepository batchRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(BatchRepository batchRepository, StudentRepository studentRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.batchRepository = batchRepository;
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public BatchDTO createBatch(BatchDTO batchDTO) {
        Batch batch = Batch.builder()
                .name(batchDTO.getName())
                .timing(batchDTO.getTiming())
                .active(true)
                .build();
        Batch savedBatch = batchRepository.save(batch);
        return BatchDTO.builder()
                .id(savedBatch.getId())
                .name(savedBatch.getName())
                .timing(savedBatch.getTiming())
                .active(savedBatch.isActive())
                .build();
    }

    @Transactional
    public void updateBatch(Long batchId, BatchDTO batchDTO) {
        Batch batch = batchRepository.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found"));
        
        batch.setName(batchDTO.getName());
        batch.setTiming(batchDTO.getTiming());
        batch.setActive(batchDTO.isActive());
        
        batchRepository.save(batch);
    }

    @Transactional
    public void registerStudent(StudentDTO studentDTO) {
        Batch batch = batchRepository.findById(studentDTO.getBatchId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        User user = User.builder()
                .username(studentDTO.getUsername())
                .password(passwordEncoder.encode(studentDTO.getPassword()))
                .email(studentDTO.getEmail())
                .role(User.Role.STUDENT)
                .active(true)
                .build();
        User savedUser = userRepository.save(user);

        Student student = Student.builder()
                .name(studentDTO.getName())
                .phone(studentDTO.getPhone())
                .email(studentDTO.getEmail())
                .user(savedUser)
                .batch(batch)
                .build();
        studentRepository.save(student);
    }

    public List<BatchDTO> getAllBatches() {
        return batchRepository.findAll().stream()
                .map(batch -> BatchDTO.builder()
                        .id(batch.getId())
                        .name(batch.getName())
                        .timing(batch.getTiming())
                        .active(batch.isActive())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<StudentDTO> getStudentsByBatch(Long batchId) {
        System.out.println("Fetching students for batch ID: " + batchId);
        return batchRepository.findById(batchId)
                .map(batch -> {
                    List<Student> students = batch.getStudents();
                    System.out.println("Found " + (students != null ? students.size() : 0) + " students");
                    if (students == null) return List.<StudentDTO>of();
                    
                    return students.stream()
                            .map(student -> StudentDTO.builder()
                                    .id(student.getId())
                                    .name(student.getName())
                                    .phone(student.getPhone())
                                    .email(student.getEmail())
                                    .batchId(batch.getId())
                                    .username(student.getUser() != null ? student.getUser().getUsername() : "no-user")
                                    .active(student.getUser() != null && student.getUser().isActive())
                                    .build())
                            .collect(Collectors.toList());
                })
                .orElseGet(() -> {
                    System.out.println("Batch not found for ID: " + batchId);
                    return List.of();
                });
    }

    @Transactional
    public void updateStudent(Long studentId, StudentDTO studentDTO) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setName(studentDTO.getName());
        student.setPhone(studentDTO.getPhone());
        student.setEmail(studentDTO.getEmail());

        if (studentDTO.getBatchId() != null) {
            Batch batch = batchRepository.findById(studentDTO.getBatchId())
                    .orElseThrow(() -> new RuntimeException("Batch not found"));
            student.setBatch(batch);
        }

        User user = student.getUser();
        if (user != null) {
            user.setEmail(studentDTO.getEmail());
            user.setActive(studentDTO.isActive());
            if (studentDTO.getPassword() != null && !studentDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
            }
            userRepository.save(user);
        }

        studentRepository.save(student);
    }

    @Transactional
    public void deleteBatch(Long batchId) {
        if (!batchRepository.existsById(batchId)) {
            throw new RuntimeException("Batch not found");
        }
        batchRepository.deleteById(batchId);
    }

    @Transactional
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        if (student.getUser() != null) {
            userRepository.delete(student.getUser());
        }
        
        studentRepository.delete(student);
    }
}
