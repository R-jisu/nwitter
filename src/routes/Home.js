import React, { useEffect, useState } from "react";
import { dbService } from "fbInstnace";
import { collection, query, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const q = query(collection(dbService, "nweets"));
    onSnapshot(q, (snapshot) => {
      //데이터베이스에 무슨 일이 있을 때 알림을 받음
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
