package com.example.demo.quiz;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

    public List<QuizQuestion> generateQuiz(MultipartFile file) {
        String text = extractText(file);
        return makeQuestionsFromText(text);
    }

    private String extractText(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            if (fileName.endsWith(".docx")) {
                XWPFDocument doc = new XWPFDocument(file.getInputStream());
                StringBuilder sb = new StringBuilder();
                for (XWPFParagraph para : doc.getParagraphs()) {
                    sb.append(para.getText()).append(" ");
                }
                return sb.toString();
            } else if (fileName.endsWith(".pdf")) {
                PDDocument pdf = PDDocument.load(file.getInputStream());
                PDFTextStripper stripper = new PDFTextStripper();
                String text = stripper.getText(pdf);
                pdf.close();
                return text;
            } else if (fileName.endsWith(".txt")) {
                return new String(file.getBytes());
            } else {
                return "Unsupported file type.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to read file.";
        }
    }

    private List<QuizQuestion> makeQuestionsFromText(String text) {
        List<QuizQuestion> quiz = new ArrayList<>();
        String[] sentences = text.split("\\. ");
        for (int i = 0; i < Math.min(10, sentences.length); i++) {
            String q = sentences[i].trim();
            if (q.length() > 10) {
                quiz.add(new QuizQuestion(
                        "What is meant by: " + q + "?",
                        new String[0],
                        ""
                ));
            }
        }
        return quiz;
    }
}
