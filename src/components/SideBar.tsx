import { Children, ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import Button, { buttonStyles } from "./Button";

import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  LucideIcon,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  Trophy,
} from "lucide-react";
import { playlists, subscriptions } from "../data/SideBar";
import { useSideBarContext } from "../context/SideBarContext";
import { PageHeaderFirstSection } from "./PageHeader";

export default function SideBar() {
  const { isLargeOpen, isSmallOpen, close } = useSideBarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        } `}
      >
        <SmallSideBarItem Icon={Home} isActive title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/" />
        <SmallSideBarItem Icon={Clapperboard} title="Subscription" url="/" />
        <SmallSideBarItem Icon={Library} title="Library" url="/" />
      </aside>

      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 absolute lg:sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>

        <LargeSideBarSection>
          <LargeSideBarItem
            isActive
            IconOrImageUrl={Home}
            title="Home"
            url="/"
          />
          <LargeSideBarItem
            IconOrImageUrl={Clapperboard}
            title="Subscriptions"
            url="/"
          />
        </LargeSideBarSection>

        <hr />

        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem
            IconOrImageUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSideBarItem
            IconOrImageUrl={History}
            title="History"
            url="/history"
          />
          <LargeSideBarItem
            IconOrImageUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSideBarItem
            IconOrImageUrl={Clock}
            title="Watch Later"
            url="/playlists?list=WL"
          />

          {playlists.map((playlist) => (
            <LargeSideBarItem
              key={playlist.id}
              IconOrImageUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>

        <hr />

        <LargeSideBarSection title="Subscriptions" visibleItemCount={5}>
          {subscriptions.map((subscription) => (
            <LargeSideBarItem
              key={subscription?.id}
              IconOrImageUrl={subscription?.imgUrl}
              title={subscription?.channelName}
              url={`/@${subscription?.id}`}
            />
          ))}
        </LargeSideBarSection>

        <hr />

        <LargeSideBarSection title="Explore">
          <LargeSideBarItem
            IconOrImageUrl={Flame}
            title="Trending"
            url="/trending"
          />

          <LargeSideBarItem
            IconOrImageUrl={Music2}
            title="Music"
            url="/music"
          />

          <LargeSideBarItem
            IconOrImageUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />

          <LargeSideBarItem IconOrImageUrl={Radio} title="Live" url="/live" />

          <LargeSideBarItem
            IconOrImageUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />

          <LargeSideBarItem
            IconOrImageUrl={Newspaper}
            title="News"
            url="/news"
          />

          <LargeSideBarItem
            IconOrImageUrl={Trophy}
            title="Sports"
            url="/sports"
          />

          <LargeSideBarItem
            IconOrImageUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />

          <LargeSideBarItem
            IconOrImageUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />

          <LargeSideBarItem
            IconOrImageUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSideBarSection>
      </aside>
    </>
  );
}

type SmallSideBarItemProps = {
  Icon: LucideIcon;
  title: string;
  url: string;
  isActive?: boolean;
};
function SmallSideBarItem({
  Icon,
  title,
  url,
  isActive = false,
}: SmallSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `py-4 px-1 flex flex-col items-center rounded-lg gap-1 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const childrenArray = Children.toArray(children).flat();
  const showExpandedButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <section>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}

      {visibleChildren}

      {showExpandedButton && (
        <Button
          onClick={() => setIsExpanded((curr) => !curr)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </section>
  );
}

type LargeSideBarItemProps = {
  IconOrImageUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};
function LargeSideBarItem({
  IconOrImageUrl,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImageUrl === "string" ? (
        <img src={IconOrImageUrl} className="h-6 w-6 rounded-full" />
      ) : (
        <IconOrImageUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
