import { useState } from "react";

import PageHeader from "./components/PageHeader";
import CategoryPills from "./components/CategoryPills";
import VideoGridItem from "./components/VideoGridItem";
import SideBar from "./components/SideBar";

import { categories, videos } from "./data/Home";
import SideBarProvider from "./context/SideBarContext";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SideBarProvider>
      <main className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <SideBar />
          <section className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </SideBarProvider>
  );
}
