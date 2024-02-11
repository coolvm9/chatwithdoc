document.addEventListener('DOMContentLoaded', () => {
        let pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5,
        canvas = document.getElementById('pdf-canvas'),
        ctx = canvas.getContext('2d');

    function renderPage(num) {
        pageRendering = true;
        // Ensure we're not trying to render while another render is ongoing
        if (pdfDoc !== null) {
            pdfDoc.getPage(num).then((page) => {
                const viewport = page.getViewport({scale: scale});
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };

                const renderTask = page.render(renderContext);
                renderTask.promise.then(() => {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                    console.log('Page rendered');
                    updateNavigation();
                });

                // Update UI
                document.getElementById('page_num').textContent = num;
                document.getElementById('page_count').textContent = pdfDoc.numPages;
                updateNavigation();
            });
        }
    }

    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }

    function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }

    document.getElementById('prev').addEventListener('click', onPrevPage);
    document.getElementById('next').addEventListener('click', onNextPage);

    function updateNavigation() {
        document.getElementById('prev').disabled = pageNum <= 1;
        document.getElementById('next').disabled = pageNum >= pdfDoc.numPages;
    }

    // Implement search functionality here
    document.getElementById('searchButton').addEventListener('click', () => {
        const searchQuery = document.getElementById('searchBox').value.trim();
        console.log('Search for:', searchQuery);
        // Note: Real implementation requires accessing text layer for search
    });

    // Loading document
    pdfjsLib.getDocument('/pdf').promise.then((doc) => {
        pdfDoc = doc;
        renderPage(pageNum);
    });
});