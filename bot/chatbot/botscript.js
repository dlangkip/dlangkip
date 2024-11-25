// Configuration Constants
const API_KEY = "AIzaSyAZq21x018PledvppB7oPKtiIa1RvPNWVY";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
const WHATSAPP_NUMBER = "+254700760386";

// Modal Elements
const chatToggler = document.querySelector(".chat-toggler");
const chatModal = document.querySelector(".chat-modal");
const whatsappOption = document.querySelector(".whatsapp-option");
const botOption = document.querySelector(".bot-option");
const closeButtons = document.querySelectorAll(".close-chat");

// Chatbot Elements
let chatbox;
let chatInput;
let sendChatBtn;
let userMessage = null;
let inputInitHeight;

// WhatsApp Elements
const messageInput = document.querySelector("#messageInput");
const whatsappButton = document.querySelector(".whatsapp-link");

// Toggle Functions
function toggleModal() {
    document.body.classList.toggle("show-modal");
}

function closeAllChats() {
    document.body.classList.remove("show-modal", "show-whatsapp", "show-bot", "show-chatbot");
    if (messageInput) {
        messageInput.style.height = "45px"; // Reset WhatsApp input field height
    }
}

function openWhatsAppChat() {
    closeAllChats();
    initializeWhatsAppChat();
    document.body.classList.add("show-whatsapp");
}

function openBotChat() {
    closeAllChats();
    initializeChatbot();
    document.body.classList.add("show-bot", "show-chatbot");
}

// WhatsApp Chat Functions
function initializeWhatsAppChat() {
    // Setup WhatsApp button
    if (whatsappButton) {
        whatsappButton.addEventListener("click", sendWhatsAppMessage);
    }

    // Setup auto-resize for textarea
    if (messageInput) {
        messageInput.addEventListener("input", autoResizeTextArea);
    }
}

function autoResizeTextArea() {
    messageInput.style.height = "45px";
    messageInput.style.height = messageInput.scrollHeight + "px";
}

function sendWhatsAppMessage() {
    // Get the message value entered by the user
    const message = messageInput ? encodeURIComponent(messageInput.value.trim()) : '';

    if (message) {
        // Create WhatsApp URL with phone number and message
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, "_blank");
        
        // Reset input after sending the message (optional)
        if (messageInput) {
            messageInput.value = ''; // Reset message input
            messageInput.style.height = "auto"; // Reset height
        }
        closeAllChats();
    }
}

// Chatbot Functions
function initializeChatbot() {
    // Initialize chatbot elements
    chatbox = document.querySelector(".chatbox");
    chatInput = document.querySelector(".chat-input textarea");
    sendChatBtn = document.querySelector("#send-btn");
    const closeBtn = document.querySelector(".close-btn");

    // Set initial height
    inputInitHeight = chatInput.scrollHeight;

    // Adjust the height dynamically as the user types
    chatInput.addEventListener("input", () => {
        chatInput.style.height = "auto"; // Reset height to calculate the new height
        chatInput.style.height = `${chatInput.scrollHeight}px`; // Adjust to content
    });

    // Setup chat event listeners
    setupChatEventListeners();

    // Setup close button
    closeBtn.addEventListener("click", closeAllChats);
}

function setupChatEventListeners() {
    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
}

function handleChat() {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = "45px";

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

function createChatLi(message, className) {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);

    // Check if the message is outgoing or incoming, and set the appropriate icon
    let chatContent =
        className === "outgoing"
            ? `<p></p>`
            : `<i class="fas fa-robot"></i><p></p>`; // Use Font Awesome Robot icon

    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;

    return chatLi;
}

const generateResponse = async (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                role: "user",
                parts: [{ text: userMessage }],
            }],
        }),
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || 'Something went wrong');

        messageElement.textContent = data.candidates[0].content.parts[0].text
            .replace(/\*\*(.*?)\*\*/g, "$1"); // Strip markdown (bold)

    } catch (error) {
        messageElement.classList.add("error");
        messageElement.textContent = error.message;
    } finally {
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
}

// Event Listeners
chatToggler?.addEventListener("click", toggleModal);
whatsappOption?.addEventListener("click", openWhatsAppChat);
botOption?.addEventListener("click", openBotChat);
closeButtons?.forEach(button => {
    button.addEventListener("click", closeAllChats);
});

// Close modal when clicking outside
chatModal?.addEventListener("click", (e) => {
    if (e.target === chatModal) {
        closeAllChats();
    }
});

// Handle escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAllChats();
    }
});

// Initialize the chat on page load
initializeWhatsAppChat();
