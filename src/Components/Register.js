import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore/lite";

function Register() {

const [Name, setName] = useState("");
const [Email, setEmail] = useState("");
const [Pass, setPass] = useState("");
const [Username, setUsername] = useState("");
const [attachment, setAttachment] = useState("");
const [X1,setX]=useState(0);
const [Y1,setY]=useState(0);

  const history = useHistory();
  const toLogin = () => {
    history.push("/login");
  };
  
  useEffect(() => {
    if(X1!==0 && Y1!==0){
      alert("Coordinates marked")
    }
  },[X1,Y1]);

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

  

  const postIt = () => {
    if (Email.includes("@gmail.com")) {
      if (
        Name !== "" &&
        Email !== "" &&
        Username !== "" &&
        Pass !== "" &&
        attachment !== "" &&
        X1 !==0 &&
        Y1 !==0

      ) {
        sendIt();
      } else {
        alert("Some datas are missing");
      }
    } else {
      alert("Enter valid email id");
    }
  };

  const sendIt = async () => {
    await addDoc(collection(db, "auth"), {
      username: Username,
      pass: Pass,
      email: Email,
      name: Name,
      attachment: attachment,
      posX:X1,
      posY:Y1
    })
      .then(function (res) {
        alert("Data is sucessfully added");
      })
      .catch(function (err) {
        console.log(err);
        alert("Data can not be stored");
      });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onFileChange = async () => {
    var fileInput = document.querySelector("#input");
    if (fileInput) {
      var file = fileInput.files[0];
      const base64String = await toBase64(file);
      setAttachment(base64String);
    }
  };

  var X, Y;
  // var Point = 1;
  // console.log(Point);
  function FindPosition(oElement)
  {
    if( typeof( oElement.offsetParent ) != "undefined" )
    {
      for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent )
      {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
  }
   
  function GetCoordinates(e)
  {
   var PosX ;
   var PosY ;
   var ImgPos;
   ImgPos = FindPosition(attachment);
   if (!e) var e = window.event;
   if (e.pageX || e.pageY)
   {
    PosX = e.pageX;
    PosY = e.pageY;
   }
   else if (e.clientX || e.clientY)
     {
      PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
   };
   console.log(PosX , PosY)
   setX(PosX)
   setY(PosY)


  //  switch (Point) {
  //    case 1: X1 = PosX;
  //            Y1 = PosY;
  //       Point = 2;
  //       document.getElementById("x1").innerHTML = PosX;
  //       document.getElementById("y1").innerHTML = PosY;
  //       break;
  //   case 2:
  //    X2 = PosX;
  //    Y2 = PosY;
  //    Point = 3;
  //    document.getElementById("x2").innerHTML = PosX;
  //    document.getElementById("y2").innerHTML = PosY;
  //    document.form1.drawbutton.disabled = false;
  //   break;
  //   case 3:
  //    X3 = PosX;
  //    Y3 = PosY;
  //    Point = 0;
  //    document.getElementById("x3").innerHTML = PosX;
  //    document.getElementById("y3").innerHTML = PosY;
  //    document.form1.drawbutton.disabled = false;
  //   break;
   
  //    default:
  //      break;
  //  }
  }
  return (
    <div className="register__body">
    <div className="register">
      <p className="reg__title">REGISTER</p>
      <div className="reg__input">
        <input
          type="text"
          placeholder="FullName"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <input
          onChange={onFileChange}
          id="input"
          type="file"
          accept=".jpg,.jpeg,.png"
        />
      </div>
      <p className="reg__submit" onClick={postIt}>
        Register
      </p>
      <p className="reg__login" onClick={toLogin}>
        Already have an account
      </p>
    </div>
      <div className="attachment"><img className="" alt="" src={attachment}  onMouseDown={GetCoordinates} id="myImgId"></img></div>
    </div>
  );
}




export default Register;
