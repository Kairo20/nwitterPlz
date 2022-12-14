import { authService, dbService } from "../fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    refreshUser();
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets") //nweets에서
      .where("creatorId", "==", userObj.uid) //creatorId가 userObj.uid인 것들을
      .orderBy("createdAt") //시간순서로
      .get(); //가져온다
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}> Log Out</button>
    </>
  );
};
export default Profile;
