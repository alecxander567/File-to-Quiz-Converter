package com.example.demo.quiz;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/upload")
    public ResponseEntity<List<QuizQuestion>> handleFileUpload(@RequestParam("file") MultipartFile file) {
        List<QuizQuestion> quiz = quizService.generateQuiz(file);
        return ResponseEntity.ok(quiz);
    }
}
