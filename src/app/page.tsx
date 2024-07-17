import services from "@/services";
import { Metadata } from "next";
import Link from "next/link";
import { sans } from "./fonts";
import Color from "colorjs.io";
import { Post } from "@/types/posts";

export const metadata: Metadata = {
  title: "overreacted — A blog by Dan Abramov",
  description: "A personal blog by Dan Abramov",
  alternates: {
    types: {
      "application/atom+xml": "https://overreacted.io/atom.xml",
      "application/rss+xml": "https://overreacted.io/rss.xml",
    },
  },
};

const assignDatesToPosts = (posts: Post[]): Post[] => {
  const baseDate = new Date();
  return posts.map((post) => {
    const daysAgo = posts.length - post.id;
    const postDate = new Date(baseDate);
    postDate.setDate(baseDate.getDate() - daysAgo);
    return { ...post, date: postDate };
  });
};

const sortPostsByDate = (posts: Post[]) => {
  return posts.reverse().sort((a, b) => {
    if (typeof b.date === "number" && typeof a.date === "number") {
      return a.date - b.date;
    } else return 0;
  });
};

export async function getPosts() {
  const response = await services.fetchPosts();
  const postsWithDates = assignDatesToPosts(response.data);
  const sortedPost = sortPostsByDate(postsWithDates);
  return sortedPost;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      {posts.map((post) => (
        <div key={post.id} className="relative -top-[10px] flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              className="block py-4 hover:scale-[1.005]"
              href={"/" + post.id + "/"}
            >
              <article>
                <PostTitle
                  post={post}
                  lastPostDate={posts[posts.length - 1].date as Date}
                />

                <p className="text-[13px] text-gray-700 dark:text-gray-300">
                  {(post.date as Date).toDateString()}
                </p>
                <p className="mt-1">{post.body}</p>
              </article>
            </Link>
          ))}
        </div>
      ))}
    </main>
  );
}

function PostTitle({ post, lastPostDate }: { post: Post; lastPostDate: Date }) {
  let lightStart = new Color("lab(63 59.32 -1.47)");
  let lightEnd = new Color("lab(33 42.09 -43.19)");
  let lightRange = lightStart.range(lightEnd);
  let darkStart = new Color("lab(81 32.36 -7.02)");
  let darkEnd = new Color("lab(78 19.97 -36.75)");
  let darkRange = darkStart.range(darkEnd);
  let today = new Date();
  let timeSinceFirstPost = today.valueOf() - new Date(lastPostDate).valueOf();
  let timeSinceThisPost = today.valueOf() - new Date(post.date).valueOf();
  let staleness = timeSinceThisPost / timeSinceFirstPost;

  return (
    <h2
      className={[
        sans.className,
        "text-[28px] font-black",
        "text-[--lightLink]",
      ].join(" ")}
      style={
        {
          "--lightLink": lightRange(staleness).toString(),
          "--darkLink": darkRange(staleness).toString(),
        } as React.CSSProperties
      }
    >
      {post.title}
    </h2>
  );
}
