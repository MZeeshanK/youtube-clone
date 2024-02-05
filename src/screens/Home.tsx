import VideoGridItem from "../components/VideoGridItem";
import { videos } from "../data/Home";

export default function Home() {
  return (
    <main
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {videos.map((video) => (
        <VideoGridItem key={video.id} {...video} />
      ))}
    </main>
  );
}
