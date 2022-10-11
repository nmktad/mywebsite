import { allBlogs, type Blog } from "contentlayer/generated";
import { type GetStaticProps, type InferGetStaticPropsType } from "next/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Suspense, useEffect } from "react";
import useSWR from "swr";
import Layout from "src/components/layout/Layout";

const SingleBlog = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MDXContent = useMDXComponent(post.body.code);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${post.slug}`, {
        method: "POST",
      });
    
      process.env.NODE_ENV === "production" && registerView()
  }, [post.slug]);

  const { data } = useSWR<{ total: number }>(
    `/api/views/${post.slug}`,
    async (url) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  const views = data?.total as number;

  const meta = {
    title: `${post.title} - Nathnael Mekonnen`,
    description: post.excerpt,
    date: new Date(post.date).toISOString(),
    type: "article",
  };

  return (
    <Layout {...meta}>
      <article className="flex flex-col items-start mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          {post.title}
        </h1>
        <div className="my-2 flex justify-between w-full space-x-2 text-md dark:text-neutral-100/50 text-sm md:text-base text-neutral-400/100">
          <div className="flex gap-2">
            <span>{post.FormattedpublishedAtDate}</span>
            <div> &middot; </div>
            {views && (
              <span>{`${
                views > 0 ? views.toLocaleString() : "···"
              } views`}</span>
            )}
          </div>
          <div className="flex gap-2">
            <span>{post.readingTime.text}</span>
            <div> &middot; </div>
            <span>{post.wordCount} words</span>
          </div>
        </div>
        <Suspense fallback={null}>
          <div className="w-full mt-2 text-base md:text-lg no-underline prose dark:prose-invert dark:prose-a:text-neutral-300 prose-a:no-underline prose-a:hover:text-neutral-800 dark:prose-a:hover:text-neutral-200 prose-a:text-neutral-700 text-neutral-600 dark:text-neutral-400 max-w-full">
            <MDXContent {...post.body} components={{}} />
          </div>
        </Suspense>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  post: Blog;
}> = ({ params }) => {
  const post = allBlogs.find((post: Blog) => post.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return { props: { post } };
};

export const getStaticPaths = () => {
  return {
    paths: allBlogs.map((post: Blog) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export default SingleBlog;
