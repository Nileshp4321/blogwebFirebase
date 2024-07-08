import React, { useState } from "react";
import {getDownloadURL,ref as storageRef,uploadBytes,} from "firebase/storage";
import {
  auth,
  provider,
  db,
  dbref,
  storage
} from "../../../common/components/FirebaseSetup/firebaseconfig";
import { child, get, ref, set } from "@firebase/database";
import { v4 as uuidv4 } from 'uuid';
const Cart = ({setaActiveComponent}) => {
  const [imageUpload,setImageUpload]=useState(null);
  const [urlofImg,setUrlOfImg]=useState(null);
  const [categories,setCategories]=useState(null);
  const cardFields = [
    "Blog title",
    "Blog Descriptin",
  ];
  const handleSelect=(e)=>{
    setCategories(e.target.value)
  }
  const handlCartForm = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const email = auth.currentUser.email;
    // get(child(dbref, "userInfo" + userId)).then((snapshot) => {
    //   if (snapshot.exists) {
    //     console.log(snapshot.val().Email);
    //   }
    // });
    // console.log(storage);
    if(imageUpload==null){
      alert("Please Select a Image")
      return ;
    }
    const uniqueId=uuidv4();
    const imageRef = storageRef(storage,`blog/${userId}` + uniqueId);
      uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            // setUrlOfImg(url)
            set(ref(db, `blog/${userId}/${uniqueId}`), {
              id:uniqueId,
              user:email,
              BlogTitle:e.target[0].value,
              BlogDescription:e.target[1].value,
              ImgURL:url
          });
          set(ref(db, `blogs/${uniqueId}`), {
            id:uniqueId,
            user:email,
            BlogTitle:e.target[0].value,
            BlogDescription:e.target[1].value,
            ImgURL:url
        });
         setaActiveComponent("Products");
      
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (
    <form onSubmit={handlCartForm} className="max-w-md h-screen flex flex-col justify-center items-center mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <h1 className="text-4xl  text-blue-400 text-center">Add BLog</h1>
      </div>
      {cardFields.map((item) => {
        return (
          <div key={item} className="relative z-0 w-full mb-5 group">
            <label
              htmlFor={`${item}`}
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {item}
            </label>
            {item !== "Category" && (
              <textarea
                rows="3" cols="30"
                type={"text"}
                name={`${item}`}  
                id={`${item}`}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder={item}
                required
              />
            )}
            {/* <textarea>
  Welcome to TinyMCE!
</textarea> */}
          </div>
        );
      })}
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e)=>{
            setImageUpload(e.target.files[0]);
          }}
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
        />
      </div>
      <div className="flex flex-row justify-center">
      <button
        width={100}
        type="reset"
         className="text-white btn btn-error m-2 w-full"
      >
        Reset
      </button>
      <button
        width={100}
        type="submit"
        className="text-white btn btn-primary m-2 w-full"
      >
        Add
      </button>
      </div>
    </form>
  );
};

export default Cart;
