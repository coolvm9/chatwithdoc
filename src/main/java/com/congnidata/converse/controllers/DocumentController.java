package com.congnidata.converse.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class DocumentController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("name", "User");
        return "document-viewer";
    }

    @GetMapping("/document-viewer")
    public String showDocumentViewer() {
        return "document-viewer";
    }

    @PostMapping("/display-text")
    public String displayText(@RequestParam("message") String message, Model model) {
        // Process the message as needed
        // For demonstration purposes, we'll just echo the message back
        model.addAttribute("message", "You said: " + message);
        model.addAttribute("displayText", message);
        return "document-viewer"; // Return to the same page with the updated text
    }
}
