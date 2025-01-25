document.getElementById("translateBtn").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;
    const translatedTextElement = document.getElementById("translatedText");
    const sourceLanguage = document.getElementById("sourceLanguage").value;
    const targetLanguage = document.getElementById("targetLanguage").value;
    const rtlEnabled = document.getElementById("rtlToggle").checked;

    // Check if input is empty
    if (!inputText.trim()) {
        translatedTextElement.textContent = "Please enter some text to translate.";
        return;
    }

    // Set RTL for target text
    if (rtlEnabled && (targetLanguage === "ar" || targetLanguage === "he")) {
        document.body.style.direction = "rtl";
    } else {
        document.body.style.direction = "ltr";
    }

    // Use a translation API (you can replace with a real API)
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLanguage}|${targetLanguage}`);
        const data = await response.json();

        if (data.responseData.translatedText) {
            translatedTextElement.textContent = data.responseData.translatedText;
        } else {
            translatedTextElement.textContent = "Translation failed. Please try again.";
        }
    } catch (error) {
        translatedTextElement.textContent = "An error occurred. Please try again later.";
    }
});
