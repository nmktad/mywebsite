import { Suspense, useState } from "react";
import { type GetStaticProps, type InferGetStaticPropsType } from "next";
import { BlogCard } from "../../components/cards/BlogCard";
import { allBlogs, type Blog } from "contentlayer/generated";
import Layout from "../../components/layout/Layout";

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const meta = {
    title: "Blogs - Nathnael Mekonnen",
    description:
      "A collection of different projects and stuff i have worked on with others",
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const filteredBlogs = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Layout {...meta}>
      <div>
        <div className="relative w-full mb-4">
          <input
            type="text"
            aria-label="Search articles"
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-neutral-900 bg-white border border-neutral-200 rounded-md dark:border-neutral-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <svg
            className="absolute w-5 h-5 text-neutral-400 right-3 top-3 dark:text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!searchValue && posts.length > 4 && (
          <>
            <div className="mt-8 mb-6 flex justify-between">
              <h3 className="text-2xl font-bold tracking-tight md:text-4xl">
                Most Popular
              </h3>
              <button>See more</button>
            </div>
            {posts.slice(0, 3).map(({ title, excerpt, slug }, idx) => (
              <BlogCard key={idx} title={title} excerpt={excerpt} slug={slug} />
            ))}
          </>
        )}
        <Suspense fallback={null}>
          <div className="mt-8 mb-6 flex justify-between">
            <h3 className="text-2xl font-bold md:font-extrabold tracking-tight md:text-4xl">
              All Posts
            </h3>
          </div>
          {!filteredBlogs.length && (
            <p className="mb-4 text-neutral-600 dark:text-neutral-400">
              No posts found.
            </p>
          )}
          {filteredBlogs.map((post) => (
            <BlogCard
              key={post.title}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </Suspense>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  posts: Blog[];
}> = () => {
  const filteredPost = allBlogs.filter((post) => !post.draft);
  return { props: { posts: filteredPost } };
};

export default Blog;
