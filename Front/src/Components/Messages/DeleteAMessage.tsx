import axios, { AxiosResponse } from "axios";
import React from "react";

type Props = {
  _id: string;
  setTrigg: React.Dispatch<React.SetStateAction<boolean>>;
};
const DeleteAMessage = ({ _id, setTrigg }: Props) => {

  const handleDeleteMessage: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await axios.delete(
        `http://localhost:4000/api/messages/delete/${_id}`
      );
      if (response.data) {
        setTrigg((trigg) => !trigg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDeleteMessage}
      style={{
        borderRadius: "5px",
        fontFamily: "Helvetica",
        color: "white",
        backgroundColor: "lightslategray",
        border:"none",
        padding: "1%"
      }}
    >
      Delete This Message
    </button>
  );
};

export default DeleteAMessage;
