import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

export const Signalr = () => {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/message")
    .build();

  hubConnection.start();
  const Messages = (messageProps) => {
    const [date, setDate] = useState();
    const [list, setList] = useState([]);

    useEffect(() => {
      messageProps.hubConnection.on("sendToReact", (message) => {
        setList([...list, message]);
        setDate(new Date());
      });
    }, []);

    const content = () =>
      list.map((message, index) => <p key={index}>{message}</p>);

    return <>{content()}</>;
  };

  return (
    <>
      <Messages hubConnection={hubConnection} />
      <SendMessage />
    </>
  );
};

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    if (e && e.target) {
      setMessage(e.target.value);
    }
  };

  const onSend = (e) => {
    fetch("/api/message", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Message: message,
      }),
    });
    setMessage(" ");
  };

  return (
    <>
      {" "}
      <label>Enter your message</label>{" "}
      <input type="text" onChange={onChange} value={message} />{" "}
      <button type="button" onClick={onSend}>
        {" "}
        Send{" "}
      </button>
    </>
  );
};
