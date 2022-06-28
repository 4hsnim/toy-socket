import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from'axios'



function Test() {
  const socket = io.connect("http://3.39.223.175/");
  const [messageList, setMessageList] = useState([]);
  const [name,setName] = useState("")
  const [message,setMessage] = useState("")

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeMessage = (e) => {
    setMessage(e.target.value)
  }
  // 전송하기 버튼 함수
  const sendMessage = async () =>{
    if(message !== ""){
      const messageData = {
        "message": message,
        "name": name
      }
      await socket.emit("chatting",messageData)
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  }

  // useEffect(() => {
  //   const SERVER_URL = "http://3.39.223.175/";

  //   axios.get(`${SERVER_URL}/chat/lists`, {}).then((response) => {
  //     console.log(response);
  //     setMessageList(response.data);
  //     console.log(messageList);
  //   });

  //   socket.on("receive_message", (data) => {
  //     console.log(data);
  //     setMessageList((list) => [...list, data]);
  //   });

  //   const filteredList = messageList.filter((message, index) => {
  //     if (message.room == room) {
  //       return true;
  //     }
  //   });
  //   console.log(filteredList);


  // }, [room]);


  return (
    <>
      <form onSubmit={sendMessage}>
        <h1>이름</h1>
        <input
        type="text"
        onChange={onChangeName}
        />
        <h1>메세지</h1>
        <input
        type="text"
        onChange={onChangeMessage}
        />
        <button>제출하기</button>
      </form>
    </>
  );
}

export default Test;
