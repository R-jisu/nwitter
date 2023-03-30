import { dbService, storageService } from "fbInstnace";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function NweetFactory({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (evnet) => {
    evnet.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const nweetObj = {
      text: nweet,
      creaatedAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    try {
      await addDoc(collection(dbService, "nweets"), nweetObj);
      setNweet("");
      setAttachment("");
    } catch (error) {
      console.error("Error adding documents: ", error);
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input onChange={onFileChange} type="file" accept="image/*" />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="img" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
    </>
  );
}

export default NweetFactory;
