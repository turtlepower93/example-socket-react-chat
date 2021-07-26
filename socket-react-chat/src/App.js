import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:4000");

export default function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', ({name, message}) => {
      setChat([...chat, {name, message}])
    })
  })

  const onTextChange = e => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const onMessageSubmit = e => {
    e.preventDefault();
    const {name, message} = state;
    console.log(name,)
    socket.emit('message', {name, message})
    setState({message: '', name})

  }

  const renderChat = () => {
    return (
      chat.map(({name, message}, index) => {
return(        <div key={index}>
          <h3>{name} <span>{message}</span></h3>
        </div>)
      })
    )
  }


  return (
    <div className="Card">
      <form onSubmit={onMessageSubmit}>
        <div className="Card">
          <h1>Messanger</h1>
          <div className="name-field">
            <input
              name="name"
              onChange={(e) => onTextChange(e)}
              value={state.name}
            ></input>
          </div>
          <div>
            <input
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
            ></input>
          </div>
        </div>
        <button onClick={onMessageSubmit}>Send message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}
