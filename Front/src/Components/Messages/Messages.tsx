import React from "react";
import { MessageInterface } from "../Contact/Contact";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DeleteAMessage from "./DeleteAMessage";

type Props = {};

interface MessagesCSSPropertieInterface {
  [key: string]: React.CSSProperties;
  container: React.CSSProperties;
  messagesDiv: React.CSSProperties;
  sender: React.CSSProperties;
  subject: React.CSSProperties;
  body: React.CSSProperties;
  oneMessageDiv: React.CSSProperties;
  title: React.CSSProperties;
  innerMessages: React.CSSProperties;
}

const Messages = ({}: Props) => {
  const navigate: NavigateFunction = useNavigate();
  const [messages, setMessages] = React.useState<MessageInterface[]>([]);
  const [trigg , setTrigg] = React.useState<boolean>(false)
  const stylingMessages = React.useState<MessagesCSSPropertieInterface>({
    container: {
      marginLeft: "5%",
      marginTop: "5%",
      width: "60%",
    },
    messagesDiv: {
      padding: "5%",
      borderRadius: "10px",
      backgroundColor: "lightgray",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    sender: {
      color: "grey",
      marginBottom: "-2%",
    },
    subject: {
      marginBottom: "-2%",
    },
    body: {},
    oneMessageDiv: {
      margin: "1%",
      borderRadius: "10px",
      padding: "1%"
    },
    title: {
      fontWeight: "bold",
      fontSize: "30px ",
    },
    innerMessages: {
      justifyItems: "right",
      backgroundColor: "white",
      justifySelf: "right",
      width: "100%",
      borderRadius: "10px",
    },
  });

  const navigateToOneMessage: (_id: string) => void = (_id) => {
   navigate("/oneMessage", { state: { _id: _id } });
  };
  const renderBody: (body: string) => string = (body) => {
    return body.length === 15 ? body : `${body.substring(0, 15)} ...`;
  };

  const handleGetMessages: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:4000/api/messages/all"
      );
      setMessages(response.data as MessageInterface[]);  
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    handleGetMessages();
  }, [trigg]);

  return (
    <div style={stylingMessages[0].container}>
      <div style={stylingMessages[0].messagesDiv}>
        <p style={stylingMessages[0].title}>Messages</p>
        <div style={stylingMessages[0].innerMessages}>
          {messages.map((element, index) => {
            return (
              <>
                <div
                  style={{
                    ...stylingMessages[0].oneMessageDiv,
                    backgroundColor: element?.treated
                      ? "lightgreen"
                      : "lightsalmon",
                  }}
                 
                >
                  <h4 
                   onClick={() => navigateToOneMessage(element?._id as string)}
                  style={stylingMessages[0].subject}>
                    {index + 1}- Subject: {element?.subject}
                  </h4>
                  <p style={stylingMessages[0].sender}>
                    From: {element?.sender}
                  </p>
                  <p style={stylingMessages[0].body}>
                    {renderBody(element?.body)}
                  </p>
                  <DeleteAMessage _id={element?._id as string}  setTrigg={setTrigg}/>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
