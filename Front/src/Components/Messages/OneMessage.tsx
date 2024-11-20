import axios, { AxiosResponse } from "axios";
import React from "react";
import { Location, useLocation } from "react-router-dom";
import { MessageInterface } from "../Contact/Contact";

type Props = {};

interface OneMessageCSSPropertiesInterface {
  [key: string]: React.CSSProperties,
  id: React.CSSProperties,
  bigDiv : React.CSSProperties,
  subject:React.CSSProperties,
  span : React.CSSProperties,
  button: React.CSSProperties,
  name : React.CSSProperties,
  body: React.CSSProperties,

}

const OneMessage = ({}: Props) => {
  const location: Location<{ _id: string }> = useLocation();
  const [message, setMessage] = React.useState<MessageInterface | undefined>();
  const [trigg, setTrigg] = React.useState<boolean>(false);
  const styling = React.useState<OneMessageCSSPropertiesInterface>({
    id:{
        fontSize: "10px",
        color:"GrayText",
        textDecoration :'underline',
        fontWeight :"initial",
        marginBottom:"3%"
    },
    bigDiv:{
       margin:"10%",
       backgroundColor:"lightgray",
       padding: "3%",
       borderRadius:"5px"
    },
    subject:{
       color : "red"
    },
    span:{
       fontWeight: "bold"
    },
    name :{
        
    },
    button:{
       border: "none",
       padding: "1%",
       borderRadius: "5px",
       color:"white"
    },
    body:{
        backgroundColor:"white",
        padding:"2%",
        marginBottom :"2%",
        borderRadius: "5px"
    }
  });

  const fetchOneMessage: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `http://localhost:4000/api/messages/one/${location.state?._id}`
      );
      setMessage(response.data as MessageInterface);
    } catch (error) {}
  };

  const setMessageToTreated: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await axios.put(
        `http://localhost:4000/api/messages/update/${location.state?._id}`,
        { treated: true }
      );
      if (response.data) {
        setTrigg(!trigg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchOneMessage();
  }, [trigg]);

  return (
    <div style={styling[0].bigDiv}>
      <h4 style={styling[0].id}>DB:id:{message?._id}</h4>
      <p style={styling[0].subject}><span style={styling[0].span}>Subject: </span>{message?.subject}</p>
      <p style={styling[0].name} ><span  style={styling[0].span}>Sender's Name: </span>{message?.sender}</p>
      <p><span  style={styling[0].span}>Email: </span>{message?.email}</p>
      <p>{message?.phoneNumber}</p>
      <div style={styling[0].body}>
      <p>{message?.body}</p>
      </div>
      <button
        onClick={setMessageToTreated}
        style={{ ...styling[0].button, backgroundColor: !message?.treated ? "red" : "lightseagreen" }}
      >
        {!message?.treated ? "Treated ?" : "This is treated"}
      </button>
    </div>
  );
};

export default OneMessage;
