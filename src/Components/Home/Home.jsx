import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../AuthProvider";
import { auth, firestore, storage } from "../../Firebase/firebase";
import VideoCard from "../VideoCard/VideoCard";
import "./home.css";
const Home = () => {
    let user = useContext(AuthContext);
    let [posts,setPosts] = useState(null);

    useEffect(()=>{
      let unsub = firestore.collection("posts").onSnapshot((querySnapshot)=>{
        let docArr = querySnapshot.docs;
        let arr = [];
        docArr.map((data)=>{
          //let {} = data.data();
          arr.push({
            id:data.id,
            ...data.data(),
          });
        });
        setPosts(arr);
      });
      return ()=>{
        unsub();
      }
    },[]);
    const handleUploadFile=(e)=>{
      let videoObj= e.currentTarget.files[0];
      let {name,type,size} = videoObj;
      size = size/1000000;
      if(size>20){
        alert("File size greater than 10mb");
        return;
      }
      if(type.split("/")[0]!="video"){
        alert("File is not a video");
        return;
      }
      let uploadTask = storage.ref(`posts/${user.uid}/${Date.now()}-${name}`).put(videoObj);
      uploadTask.on("state_changed",null,null,fun3);
      function fun3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          firestore.collection("posts").add({
            name:user.displayName,
            comments:[],
            likes:[],
            videoUrl:url
          });
        });
      }
    }
    return (
      <>
      {user ? "" : <Redirect to="/login" />}
      <div className="screen">
      <div className="video-container">
        {posts?posts.map((e1,idx)=>{
          return <VideoCard data={e1} key={e1.id}/>
        }):""}
      </div>
      </div>
      <button className="home-logout-btn"
        onClick={() => {
          auth.signOut();
        }}
      >
        LOGOUT
      </button>
      <input type="file" onChange={handleUploadFile}/>
      </>
    );
}
 
export default Home;