"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateMap = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [map, setMap] = useState({ title: "", tags: "" });

  const createMap = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/map/new", {
        method: "POST",
        body: JSON.stringify({
          title: map.title,
          userId: session?.user.id,
          tags: map.tags.split(" "),
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      map={map}
      setMap={setMap}
      submitting={submitting}
      handleSubmit={createMap}
    />
  );
};

export default CreateMap;