import React from "react";
import axios from "axios";

type Props = {};
export interface MessageInterface {
  _id?: string;
  subject: string;
  body: string;
  sender: string;
  email: string;
  treated?: boolean;
  phoneNumber: string;
  __v?: number;
}

interface ContactFromCssProperties {
  smallerDiv: React.CSSProperties;
  bigDiv: React.CSSProperties;
  input: React.CSSProperties;
  button: React.CSSProperties;
  textArea: React.CSSProperties;
  label: React.CSSProperties;
  successDiv: React.CSSProperties;
  failureDiv: React.CSSProperties;
  title: React.CSSProperties;
}

function Contact({}: Props) {
  const messageRef = React.useRef<MessageInterface>({
    subject: "",
    body: "",
    email: "",
    phoneNumber: "",
    sender: "",
  });

  const styling = React.useState<ContactFromCssProperties>({
    input: {
      borderRadius: "7px",
      height: "25px",
      borderWidth: "3px",
      marginTop: "5px",
    },
    bigDiv: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    smallerDiv: {
      display: "flex",
      flexDirection: "column",
      width: "600px"
    },
    button: {
      padding: "1%",
      marginTop: "4%",
      borderRadius: "20px",
      border: "0px",
      backgroundColor: "#90e0ef",
      fontFamily: "Helvetica",
      fontWeight: "bold",
      fontSize: "15px",
      height: "40px",
    },
    textArea: {
      padding: "1%",
      borderWidth: "3px",
      borderRadius: "7px",
      height: "100px",
    },
    label: {
      padding: "1%",
      fontWeight: "bold"
    },
    successDiv: {
      display: "flex",
      justifyContent: "center",
      width: "600px",
      backgroundColor: "green",
      alignContent: "center",
      borderRadius: "10px",
      color: "white",
    },
    failureDiv: {
      display: "flex",
      justifyContent: "center",
      width: "600px",
      backgroundColor: "red",
      alignContent: "center",
      borderRadius: "10px",
      color: "white",
      marginTop: "10px",
    },
    title: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      color: "blue",
      fontSize: "30px",
      fontWeight: "bold"
    },
  });

  const [inserted, setInserted] = React.useState<boolean>(false);
  const [failed, setFailed] = React.useState<boolean>(false);

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    messageRef.current.sender = e.target.value;
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    messageRef.current.email = e.target.value;
  };
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    messageRef.current.subject = e.target.value;
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    messageRef.current.phoneNumber = e.target.value;
  };
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    messageRef.current.body = e.target.value;
  };

  const sendMessage: () => Promise<void> = async () => {
    console.log(messageRef.current);
    try {
      await axios.post(
        `http://localhost:4000/api/messages/create`,
        messageRef.current as object
      );
      setInserted(true);
      setTimeout(() => {
        setInserted(false);
      }, 2000);
    } catch (error) {
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 2000);
      console.error(error);
    }
  };

  return (
    <div style={styling[0].bigDiv}>
      <div style={styling[0].title}>
        <p>Send us a Message</p>
      </div>
      <div style={styling[0].smallerDiv}>
        <label style={styling[0].label}>Sender's Name</label>
        <input
          onChange={handleSenderChange}
          style={styling[0].input}
          defaultValue={messageRef.current.sender}
        />
        <label style={styling[0].label}>Phone</label>
        <input
          onChange={handlePhoneNumberChange}
          style={styling[0].input}
          defaultValue={messageRef.current.phoneNumber}
        />
        <label style={styling[0].label}>Email</label>
        <input
          onChange={handleEmailChange}
          style={styling[0].input}
          defaultValue={messageRef.current.email}
        />
        <label style={styling[0].label}>Subject</label>
        <input
          onChange={handleSubjectChange}
          style={styling[0].input}
          defaultValue={messageRef.current.subject}
        />
        <label style={styling[0].label}>Message</label>
        <textarea
          onChange={handleBodyChange}
          style={styling[0].textArea}
          defaultValue={messageRef.current.body}
        ></textarea>
        <button onClick={sendMessage} style={styling[0].button}>
          Send
        </button>
      </div>
      {inserted && (
        <div style={styling[0].successDiv}>
          <p>Your Message has been Inserted !</p>
        </div>
      )}
      {failed && (
        <div style={styling[0].failureDiv}>
          <p>Error sending you message !</p>
        </div>
      )}
    </div>
  );
}

export default Contact;
