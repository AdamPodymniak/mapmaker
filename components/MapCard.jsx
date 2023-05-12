"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MapCard = ({ map, handleTagClick }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfileClick = () => {

    if (map.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${map.creator._id}?name=${map.creator.username}`);
  };

  const handleMapClick = () => {
    router.push(`/map/${map._id}`);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={map.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {map.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {map.creator.email}
            </p>
          </div>
        </div>
      </div>

      <p
        className='my-4 font-satoshi text-sm text-gray-700 cursor-pointer'
        onClick={handleMapClick}
      >
        {map.title}
      </p>
      {map.tags.map((tag) => (
        <p
            key={tag}
            className='font-inter text-sm blue_gradient cursor-pointer'
            onClick={() => handleTagClick && handleTagClick(tag)}
        >
            {tag}
        </p>
      ))}
    </div>
  );
};

export default MapCard;