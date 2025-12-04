package com.securite.securite.repository;


import com.securite.securite.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCin(String cin);
    boolean existsByCin(String cin);
}
