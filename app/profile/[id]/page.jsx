"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userMaps, setUserMaps] = useState([]);

  useEffect(() => {
    const fetchMaps = async () => {
      const response = await fetch(`/api/users/${params?.id}/maps`);
      const data = await response.json();

      setUserMaps(data);
    };

    if (params?.id) fetchMaps();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional maps and be inspired by the power of their imagination`}
      data={userMaps}
    />
  );
};

export default UserProfile;