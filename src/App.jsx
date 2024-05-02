import PostCard from "./components/Parts/PostCard";

function App() {
  return (
    <>
      <div className="grid grid-cols-4 items-center justify-center p-10">
        <PostCard
          title="Hello"
          content="Ad ipsum minim minim do minim elit minim. Eiusmod aute officia mollit pariatur officia amet dolore anim exercitation consequat cillum deserunt occae..."
          posted="2022-04-29"
        />
      </div>
    </>
  );
}

export default App;
