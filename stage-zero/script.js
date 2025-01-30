// Function to update UTC time
function updateUTCTime() {
    const utcTimeElement = document.getElementById("utc-time");
    setInterval(() => {
        const now = new Date();
        const utcTime = now.toISOString().split("T")[1].split(".")[0]; // Get HH:MM:SS from UTC
        utcTimeElement.textContent = utcTime;
    }, 1000);
}

// Call the function when the page loads
updateUTCTime();
