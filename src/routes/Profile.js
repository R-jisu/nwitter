import { authService, dbService } from "fbInstnace";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Profile({ refreshUser, userObj }) {
  const name = userObj.displayName ?? "User";
  const [NewDisplayName, setNewDistplayName] = useState(name);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();

    history.push("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {});
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDistplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== NewDisplayName) {
      await updateProfile(userObj, { displayName: NewDisplayName });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={NewDisplayName}
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
