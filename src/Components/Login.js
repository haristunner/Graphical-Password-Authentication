import React, { Component, useEffect, useState } from 'react'
import { useHistory,Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { collection, getDocs } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore/lite";
import './Login.css'

function Login() {
  const [username, setusername] = useState('')
  const [currentpassword, setPassword] = useState('')
  const [values,setValue]=useState(false)
  const [error,setError]=useState("")
  // const [picture,setPicture]=useState('')
  const history = useHistory();
  const [datas, setDatas] = useState([])
  const [X1, setX] = useState(0);
  const [Y1, setY] = useState(0);
  const firebaseConfig = {
    apiKey: "AIzaSyAdwiwaWq0myt37nfw5_ke14TLoKqjwFZ4",
    authDomain: "gpas-515a4.firebaseapp.com",
    projectId: "gpas-515a4",
    storageBucket: "gpas-515a4.appspot.com",
    messagingSenderId: "330033909879",
    appId: "1:330033909879:web:faabe5e397fb2f41d9f672",
    measurementId: "G-ZLJ1WM94W1",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const authdocs = collection(db, "auth");
  const toReg = () => {
    history.push("/");
  }
  useEffect(() => {
    getData();
  }, [])
  const getData = async () => {
    const data = await getDocs(authdocs);
    setDatas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  // console.log(datas)
  var picture;
  var posx;
  var posy;
  var password;
  
  datas.map((doc) => {
    if (doc.username === username) {
      picture = doc.attachment;
      posx = doc.posX;
      posy = doc.posY;
      password=doc.pass;
    }
  })
  // var correctPos = Math.sqrt((X1 - posx) ** 2 + (Y1 - posy) ** 2)
  // if(currentpassword===password){
  //   if (correctPos < 20) {
  //     setValue(true);
  //    }
  // }
  // else{
  //   setError("wrong Password!")
  // }
  function FindPosition(oElement) {
    if (typeof (oElement.offsetParent) != "undefined") {
      for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      
      return [posX, posY];
    }
    else {
      return [oElement.x, oElement.y];
    }
  }
  // function passwordvalid(e) {
  //   if(password===e.target.value){

  //   }
  // }
  function GetCoordinates(e) {
    var PosX;
    var PosY;
    var ImgPos;
    ImgPos = FindPosition(picture);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
      PosX = e.pageX;
      PosY = e.pageY;
    }
    else if (e.clientX || e.clientY) {
      PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    };
    // console.log(PosX, PosY)
    setX(PosX)
    setY(PosY)  
    var correctPos = Math.sqrt((X1 - posx) ** 2 + (Y1 - posy) ** 2)
      console.log(correctPos)
      if(currentpassword===password){
      if (correctPos < 20) {
        setValue(true);
        setError('')
       }
       else{
         setValue(false)
         setError("wrong coordinates")
       }
      }
    else{
      setError("wrong Password!")
      setValue(false)
    }
  }
  return (
    // <>
    <div>
      <div className='register__body'>
        <div className="register">
          {error&&<h1>{error}</h1>}
          <p className="reg__title">LOGIN</p>
          <div className="reg__input">
            <input type="text" placeholder="UserName" onChange={(e) => setusername(e.target.value)} />
            <input type="password" placeholder="Password"onChange={(e)=>setPassword(e.target.value)} />
          </div>
          {values&&<Link to ="/Dashboard"><p className="reg__submit">Login</p></Link>}
          <p className="reg__login" onClick={toReg}>Create new account</p>
        </div>
        <div className='attachment'>
          <img src={picture} alt="" onMouseDown={GetCoordinates} />
        </div>
      </div>
      <div>
      {/* <h1>{password}</h1> */}
    </div>
    </div>
  )
}

export default Login;