import MapCard from "./MapCard";

const Profile = ({ name, desc, data }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((map) => (
          <MapCard
            key={map._id}
            map={map}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;