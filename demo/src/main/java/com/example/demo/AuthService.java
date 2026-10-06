package com.example.demo;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(User user) {

        User existingUser =
                userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            return "Username already exists";
        }

        userRepository.save(user);

        return "Registration successful";
    }

    public String login(User user) {

        User existingUser =
                userRepository.findByUsername(user.getUsername());

        if (existingUser == null) {
            return "User not found";
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }
}