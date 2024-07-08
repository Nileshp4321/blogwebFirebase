import React, { useEffect, useState } from "react";
import {
  auth,
  dbref,
  db,
  storage,
} from "../../../common/components/FirebaseSetup/firebaseconfig";
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
  const [updateBlog, setUpdateBlog] = useState({});
  const [categories, setCategories] = useState(null);
  const [isComponentUpdate, setIsComponentUpdate] = useState(null);
  const uid = auth.currentUser.uid;
  const cardFields = [
    "Item Name",
    "Item Label",
    "Price",
    "Category",
    "Quantity",
  ];
  const uniqueId = uuidv4();
  const userId = auth.currentUser.uid;
  const email = auth.currentUser.email;
  const starCountRef = ref(db, `blog/${userId}`);
  const [isLoading, setIsLoading] = useState(true);
  let records = [];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2800);
  }, [isComponentUpdate]);

  onValue(starCountRef, (snapshot) => {
    // const data = snapshot.val();
    snapshot.forEach((childSnapshot) => {
      // let key=childSnapshot.key;
      let data = childSnapshot.val();
      // console.log(data);
      records.push(data);
      // console.log(records);
    });
  });
  const handleSelect = (e) => {
    setCategories(e.target.value);
  };
  const handlCartForm = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const email = auth.currentUser.email;

    // Handle image upload
    if (imageUpload == null) {
      alert("Please Select a Image");
      return;
    }

    const uniqueId = uuidv4();
    const imageRef = storageRef(storage, `blog/${userId}/` + uniqueId);

    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);

      // Update blog object with new data including URL
      setUpdateBlog({
        id: uniqueId,
        user: email,
        BlogTitle: e.target[0].value,
        BlogDescription: e.target[1].value,
        ImgURL: url,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return; // Prevent further execution if upload fails
    }

    // Update data in Firebase database
    try {
      await update(ref(db, `blog/<span class="math-inline">\{userId\}/</span>{updateBlog.id}`), updateBlog);
      console.log("Blog updated successfully!");
      document.getElementById("my_modal_3").close(); // Close modal
    } catch (error) {
      console.error("Error updating blog:", error.message);
    } finally {
      // Clear state variables after successful update
      setImageUpload(null);
      setUpdateBlog({});
    }
  };  
  const deleteItemFromCart = async (id) => {
    // console.log(id);
    try {
      remove(ref(db, `blog/${userId}/${id}`));
      remove(ref(db, `blogs/${id}`));
      console.log("delte");
      setIsComponentUpdate("Item is Deleted");
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };
 
  const updateItemFromCart = async () => {
    if (!updateBlog.id || !updateBlog.BlogTitle || !updateBlog.BlogDescription) {
      console.error("Missing update data. Please fill all fields.");
      return;
    }
  
    const updatePath = `blog/${userId}/${updateBlog.id}`; // Construct valid path
  
    try {
      await update(ref(db, updatePath), updateBlog);
      console.log("Blog updated successfully!");
      setIsComponentUpdate("Item is Updated"); // Trigger re-render
    } catch (error) {
      console.error("Error updating blog:", error.message);
    } finally {
      // Clear state variables after successful update
      setImageUpload(null);
      setUpdateBlog({});
    }
  };
  
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-5xl text-center">Blogs</h1>
      </div>

      {!isLoading ? (
        <div className="flex flex-row w-full flex-wrap">
          {records.map((item) => {
            return (
              <>
                {item.user === email && (
                  <div
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
                    <div className="w-full card-body flex flex-wrap jutify-center">
                      <h1 className="text-xl font-bold   ">{item.BlogTitle}</h1>
                      <h1 className="text-sm font-bold  ">
                        {item.BlogDescription}
                      </h1>
                      <div className="w-42 card-actions flex flex-wrap justify-center items-center ">
                        <button
                          className="btn btn-error"
                          onClick={() => {
                            deleteItemFromCart(item.id);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                        >
                          Update
                        </button>

                        <dialog id="my_modal_3" className="modal">
                          <div className="modal-box flex flex-col items-center justify-center">
                            <form onSubmit={handlCartForm} method="dialog">
                              {/* if there is a button in form, it will close the modal */}

                              <h3 className="text-lg font-bold">
                                Update the Blog
                              </h3>
                              <div className="w-full flex flex-col justify-center items-center">
                                <div>
                                  <label className="label">Blog Title</label>
                                  <input
                                    required
                                    type="text"
                                    // value={item.BlogTitle}
                                    placeholder="Type here"
                                    className="text-gray-950 input input-bordered w-full max-w-xs rounded my-2"
                                  />
                                </div>
                                <div>
                                  <label className="label">
                                    Blog Description
                                  </label>
                                  <textarea
                                    required
                                    type="text"
                                    // value={item.BlogDescription}
                                    placeholder="Type here"
                                    className="text-gray-950 input input-bordered w-full max-w-xs rounded my-2"
                                  ></textarea>
                                </div>
                                <div className="flex justify-center items-center">
                                  <input
                                    onChange={(e) => {
                                      setImageUpload(e.target.files[0]);
                                    }}
                                    type="file"
                                    className="file-input file-input-bordered file-input-info w-full max-w-xs"
                                  />
                                </div>
                                <div className="modal-action">
                                  <button
                                    htmlFor="my_modal_6"
                                    className="btn"
                                    type="submit"
                                    onSubmit={()=>{;}}
                                  >
                                    Update Blog
                                  </button>
                                </div>
                              </div>
                            </form>
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                          </div>
                        </dialog>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default ProductItems;
