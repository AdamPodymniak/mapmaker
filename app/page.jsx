import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">Amazing Maps</span>
        </h1>
        <p className="desc text-center">
            Mapmaker is an open-source app for creating modern maps and share unique travel experiences and histories
        </p>
        <Feed />
    </section>
  )
}

export default Home