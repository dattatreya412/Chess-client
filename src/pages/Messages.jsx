import React, { useState } from "react";
import MessagesNavBar from "./Messages/MessagesNavBar";
import NewMessageBar from "./Messages/NewMessageBar";
import MessagesList from "./Messages/MessagesList";
import ConversationHeader from "./Messages/ConversationHeader";
import MessagesContainer from "./Messages/MessagesContainer";

const Messages = () => {
  const [displayMessagesList, setDisplayMessagesList] = useState(false);
  const [presentConversation, setPresentConversation] = useState("");
  const [objectId, setObjectId] = useState("");
  const displayMessages = (item, username) => {
    console.log("trigered message ");
    console.log(item);
    setDisplayMessagesList(true);
    setPresentConversation(username);
  };
  return (
    <section className="flex  w-full h-[95vh] gap-7 p-4">
      <div className="h-full w-1/3 bg-white rounded-lg shadow-md p-4">
        <MessagesNavBar />
        <NewMessageBar setDisplayMessagesList={setDisplayMessagesList} displayMessagesList={displayMessagesList} />
        <MessagesList
          displayMessages={displayMessages}
          setObjectId={setObjectId}
        />
      </div>
      <div className="w-2/3 bg-white rounded-lg shadow-md p-4">
        <ConversationHeader
          presentConversation={presentConversation}
          displayMessagesList={displayMessagesList}
        />
        <MessagesContainer
          objectId={objectId}
          displayMessagesList={displayMessagesList}
          presentConversation={presentConversation}
        />
      </div>
    </section>
  );
};

export default Messages;
