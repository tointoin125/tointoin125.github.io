let currentLanguage = localStorage.getItem('language') || 'en'; // Default language

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguageContent();
}

function updateLanguageContent() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.placeholder) {
                    element.placeholder = translations[currentLanguage][key];
                }
            } else if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'LI') {
                 // Check if the element contains only text or also child elements
                 // A simple approach: replace innerHTML if it's primarily text, otherwise be cautious
                 // For simplicity here, we replace innerText, which is safer but might break complex structures.
                 // A more robust solution might involve traversing child nodes.
                 element.innerText = translations[currentLanguage][key];
            } else {
                 // Default fallback for other elements or complex content
                 element.textContent = translations[currentLanguage][key];
            }
        } else {
            console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`);
        }
    });
    // Update language selector display if it exists
    const langSelector = document.getElementById('language-selector');
    if (langSelector) {
        langSelector.value = currentLanguage;
    }
    console.log(`Language updated to: ${currentLanguage}`);
}

// Initial content update on load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure translations are loaded before updating content
    if (typeof translations !== 'undefined') {
        updateLanguageContent();
    } else {
        console.error("Translations object not found. Make sure translations.js is loaded before language.js");
    }

    // Add event listener for language selector if it exists
    const langSelector = document.getElementById('language-selector');
    if (langSelector) {
        langSelector.addEventListener('change', (event) => {
            setLanguage(event.target.value);
        });
    }
});
