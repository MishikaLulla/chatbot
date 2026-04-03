const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const emptyState = document.getElementById("emptyState");
const chips = document.querySelectorAll(".chip");

// Add message
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
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
    const text = userInput.value.trim();
    if (text === "") return;

    hideEmptyState();
    addMessage(text, "user");
    userInput.value = "";

    setLoading(true);
    showThinking();

    try {
        const response = await fetch("https://chatbot-4hkf.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        removeThinking();
        addMessage(data.reply, "bot");

    } catch (error) {
        removeThinking();
        addMessage("Error connecting to server.", "bot");
    }

    setLoading(false);
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
