package com.acl.backend.security;

import com.acl.backend.entity.Batch;
import com.acl.backend.entity.User;
import com.acl.backend.repository.BatchRepository;
import com.acl.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BatchRepository batchRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, BatchRepository batchRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.batchRepository = batchRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User(
                    "admin",
                    passwordEncoder.encode("admin123"),
                    "admin@acl.com",
                    User.Role.ACL_ADMIN
            );
            userRepository.save(admin);
            System.out.println("Admin user created: admin/admin123");
        }

        if (batchRepository.findAll().isEmpty()) {
            Batch defaultBatch = new Batch("Morning - Mathematics", "09:00 AM - 11:00 AM");
            batchRepository.save(defaultBatch);
            System.out.println("Default batch created");
        }
    }
}
