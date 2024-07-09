import React, { useEffect, useState } from "react";
import {
  auth,
  dbref,
  db,
  storage,
} from "../common/components/FirebaseSetup/firebaseconfig"
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
// import { child, get, ref,  } from "@firebase/database";
import { v4 as uuidv4 } from "uuid";
import { onValue, ref, remove, update, set } from "firebase/database";

const ProductItems = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isComponentUpdate, setIsComponentUpdate] = useState(null);
  // const uid = auth.currentUser.uid;
  const cardFields = [
    "Item Name",
    "Item Label",
    "Price",
    "Category",
    "Quantity",
  ];
  const uniqueId = uuidv4();
  // const userId = auth.currentUser.uid;
  // const email = auth.currentUser.email;
  const starCountRef = ref(db, `blogs/`);
  const [isLoading,setIsLoading]=useState(true);
  let records = [];

  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(false)
    },2800);
  }, [isComponentUpdate]);

  onValue(starCountRef, (snapshot) => {
    // const data = snapshot.val();
    snapshot.forEach((childSnapshot) => {
      // let key=childSnapshot.key;
      let data = childSnapshot.val();
      // console.log(data);
      records.push(data);
    });
  });
  const handleSelect = (e) => {
    setCategories(e.target.value);
  };
 
  // const deleteItemFromCart = async (id) => {
  //   try {
  //     remove(ref(db, `Products/${id}`));
  //     console.log("delte");
  //     setIsComponentUpdate("Item is Deleted");
  //   } catch (error) {
  //     console.error("Error deleting item:", error.message);
  //   }
  // };
  // const updataItemFromCart = async (id) => {
  //   try {
  //     await update(ref(db, `Products${uid}/${id}`, {}));
  //   } catch (error) {
  //     console.error("Error deleting item:", error.message);
  //   }
  // };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-5xl text-center">Blogs</h1>
      </div>
      {
        !isLoading?
      <div className="flex flex-row flex-wrap w-full ">
        {records.map((item) => {
          return (
            <>

             {<div
                key={item}
                className=" w-full card bg-base-100 shadow-xl ml-5 mt-9 "
              >
                <figure>
                  <img
                    className="object-cover w-48 h-48 "
                    src={item.ImgURL}
                    alt="Shoes"
                  />
                </figure>
                <div className="w-full card-body flex flex-wrap">
                  <h1 className="text-4xl font-bold   ">{item.BlogTitle}</h1>
                  <h1 className="text-2xl font-bold  ">{item.BlogDescription}</h1>
                </div>
              </div>}
            </>
          );
        })}
      </div>
      :
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
      }
    </div>
  );
};

export default ProductItems;
