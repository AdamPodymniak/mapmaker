"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [myMaps, setMyMaps] = useState([]);

  useEffect(() => {
    const fetchMaps = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/maps`);
      const data = await response.json();

      setMyMaps(data);
    };

    if (session?.user.id) fetchMaps();
  }, [session?.user.id]);

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myMaps}
    />
  );
};

export default MyProfile;