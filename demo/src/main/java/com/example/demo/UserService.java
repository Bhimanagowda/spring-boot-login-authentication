package com.example.demo;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(Long id, User user) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());

        return userRepository.save(existingUser);
    }

    public String deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            return "User not found";
        }
    
        userRepository.deleteById(id);
    
        return "User deleted successfully";
    }
}