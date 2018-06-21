let AddChatBubble = function(isSelf, content, id = "You")
{
    if(isSelf)
    {
        let chatBubble = document.createElement("div");  chatBubble.style.cssFloat = "right";
        chatBubble.className = "ChatBubble";

        chatBubble.innerHTML = '<p class="Message" id="Content" style="background-color: greenyellow;">' + content + '</p>\n' +
            '            <p class="id" align="left" id="ID">ID: ' + id + '</p>';

        //Add Bubble
        document.getElementById("Messages").appendChild(chatBubble);
    }
    else {
        let chatBubble = document.createElement("div");  chatBubble.style.cssFloat = "left";
        chatBubble.className = "ChatBubble";

        chatBubble.innerHTML = '<p class="id" align="left" id="ID">ID: ' + id + '</p>\n' +
            '            <p class="Message" id="Content">' + content + '</p>';

        //Add Bubble
        document.getElementById("Messages").appendChild(chatBubble);
    }
};