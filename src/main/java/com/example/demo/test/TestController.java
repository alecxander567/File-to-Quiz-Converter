package com.example.demo.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private TestRepository repo;

    @PostConstruct
    public void testInsert() {
        Test t = new Test();
        t.setName("Connection test");
        repo.save(t);
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addTest() {
        Test t = new Test();
        t.setName("Connection test");
        repo.save(t);
        return "Test object saved!";
    }
}
