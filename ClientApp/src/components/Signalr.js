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
    }, [list]);

    const content = () =>
      list.map((message, index) => <p key={index}>{message}</p>);
    console.log(list);
    return <>{content()}</>;
  };

  return <Messages hubConnection={hubConnection} />;
};
