document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const linkInput = document.getElementById("linkInput");
    const fileInput = document.getElementById("fileInput");
    const urlInput = document.getElementById("urlInput");
    const summaryDiv = document.getElementById("summary");

    // Update placeholder with the filename when a file is attached
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            linkInput.value = file.name; // Show file name in the text input
        } else {
            linkInput.value = ""; // Clear if no file is selected
        }
    });

    // Text Summarization
    document.getElementById("summarizeText").addEventListener("click", async () => {
        const text = textInput.value;

        if (!text.trim()) {
            summaryDiv.innerText = "Please enter text.";
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/summarize-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });
            const data = await response.json();
            summaryDiv.innerText = data.summary || data.error;
        } catch (error) {
            summaryDiv.innerText = `Error: ${error.message}`;
        }
    });

    // PDF Summarization
    document.getElementById("summarizePDF").addEventListener("click", async () => {
        const file = fileInput.files[0];

        if (!file) {
            summaryDiv.innerText = "Please upload a PDF.";
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5001/summarize-pdf", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            summaryDiv.innerText = data.summary || data.error;
        } catch (error) {
            summaryDiv.innerText = `Error: ${error.message}`;
        }
    });

    // URL Summarization
    document.getElementById("summarizeURL").addEventListener("click", async () => {
        const url = urlInput.value;

        if (!url.trim()) {
            summaryDiv.innerText = "Please enter a URL.";
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/summarize-website", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            summaryDiv.innerText = data.summary || data.error;
        } catch (error) {
            summaryDiv.innerText = `Error: ${error.message}`;
        }
    });
});
