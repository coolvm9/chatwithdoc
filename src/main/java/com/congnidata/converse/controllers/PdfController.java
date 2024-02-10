package com.congnidata.converse.controllers;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PdfController {

    @GetMapping("/viewPdf")
    public String viewPdf(Model model) {
        // Add attributes to the model if necessary
        return "viewPdf";
    }

    // Endpoint to serve the PDF file
    @GetMapping("/pdf")
    public ResponseEntity<Resource> getPdf() {
        // Specify the path to your PDF file within the resources directory
//        String pdfFileName = "static/_10-K-Q4-2023-As-Filed_1-1.pdf";
        String pdfFileName = "static/attention-is-all-you-need.pdf";
        org.springframework.core.io.Resource resource = new ClassPathResource(pdfFileName);

        // Make sure the file exists
        if (!resource.exists()) {
            // Handle the case where the file doesn't exist
            return ResponseEntity.notFound().build();
        }

        // Try to determine file's content type
        String contentType = "application/pdf"; // Default PDF content type

        // Set headers to display PDF in browser instead of downloading
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
