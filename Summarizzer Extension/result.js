// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Fetch stored data (from localStorage or passed data)
    const data = JSON.parse(localStorage.getItem("summaryData"));

    // Check if data exists
    if (data) {
        // Dynamically populate the content
        document.getElementById("summary-title").textContent = data.title || "No Title Provided";
        document.getElementById("summary-source").textContent = data.source || "No Source Provided";
        document.getElementById("summary-text").textContent = data.summary || "No Summary Available";
        document.getElementById("summary-date").textContent = data.date || "No Date Provided";
    } else {
        // If no data is available, show an error message
        document.getElementById("summary-text").textContent = "Error: No data available to display.";
    }

    // Add functionality to the back button
    document.getElementById("back-button").addEventListener("click", () => {
        // Navigate back to the popup.html
        window.location.href = "popup.html";
    });
});
