import { authService, dbService } from "../fbase";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets") //nweets에서
      .where("creatorId", "==", userObj.uid) //creatorId가 userObj.uid인 것들을
      .orderBy("createdAt") //시간순서로
      .get(); //가져온다

    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}> Log Out</button>
    </>
  );
};
export default Profile;
