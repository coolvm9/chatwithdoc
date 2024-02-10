document.addEventListener('DOMContentLoaded', function() {
    var url = '/pdf'; // URL to your Spring controller serving the PDF
    var pdfDoc = null;
    var pageNum = 1;
    var pageRendering = false;
    var pageNumPending = null;
    var scale = 1.5; // Adjust scale as needed
    var canvas = document.getElementById('pdf-canvas');
    var ctx = canvas.getContext('2d');

    function renderPage(num) {
        pageRendering = true;
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport({scale: scale});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport,
            };
            var renderTask = page.render(renderContext);

            // Wait for rendering to finish
            renderTask.promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    // New page rendering is pending
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });

            // Update page counters
            document.getElementById('page_num').textContent = num;
            document.getElementById('page_count').textContent = pdfDoc.numPages;
        });
    }

    // Load PDF
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;

        // Initial page rendering
        renderPage(pageNum);
    });

    // Update page on button clicks
    document.getElementById('prev').addEventListener('click', function() {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        renderPage(pageNum);
    });

    document.getElementById('next').addEventListener('click', function() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        renderPage(pageNum);
    });

    // Optionally, implement scroll detection to change pages
});

// Implement the search functionality
function searchText() {
    var searchText = document.getElementById('searchBox').value.trim();
    if (searchText === '') {
        alert('Please enter a text to search.');
        return;
    }

    // PDF.js text search functionality here
    // This is a placeholder for actual search implementation
    // PDF.js does not provide a direct way to search text out of the box in the rendered canvas
    // You may need to use the PDF.js find controller or implement custom search logic
    console.log('Search for: ' + searchText);
    // Implement search logic based on PDF.js version and capabilities
}
