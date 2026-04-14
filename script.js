const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const emptyState = document.getElementById("emptyState");
const chips = document.querySelectorAll(".chip");

// Add message
function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    messageDiv.innerText = text;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


// Thinking
function showThinking() {
    const thinking = document.createElement("div");
    thinking.classList.add("thinking");
    thinking.id = "thinking";
    thinking.innerText = "Thinking...";
    chatArea.appendChild(thinking);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function removeThinking() {
    const thinking = document.getElementById("thinking");
    if (thinking) thinking.remove();
}

function setLoading(state) {
    userInput.disabled = state;
    sendBtn.disabled = state;
}

function hideEmptyState() {
    if (emptyState) emptyState.style.display = "none";
}

// 🚀 MAIN CHANGE: API CALL
async function handleSend() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    try {
        const response = await fetch("https://chatbot-4hkf.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        addMessage(data.reply, "bot");

    } catch (error) {
        addMessage("Error connecting to server.", "bot");
    }
}

// Events
sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleSend();
});

// Chips
chips.forEach(chip => {
    chip.addEventListener("click", () => {
        userInput.value = chip.innerText;
        handleSend();
    });
});
