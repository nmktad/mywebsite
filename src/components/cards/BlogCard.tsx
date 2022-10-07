import Link from "next/link";
import useSWR from "swr";

export const BlogCard = ({
  slug,
  title,
  excerpt,
}: {
  slug: string;
  title: string;
  excerpt: string;
}) => {
  const { data } = useSWR<{ total: number }>(
    `/api/views/${slug}`,
    async (url: string) => {
      const res = await fetch(url);
      return res.json();
    }
  );

  const views = data?.total as number;

  return (
    <Link href={`/blog/${slug}`}>
      <a className="w-full">
        <div className="w-full mb-8 p-4 border rounded-md">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-2 text-lg font-medium text-neutral-900 md:text-xl dark:text-neutral-100">
              {title}
            </h4>
            <p className="w-32 mb-4 text-left text-neutral-500 md:text-right leading-7 md:mb-0">
              {`${views ? views.toLocaleString() : "···"} views`}
            </p>
          </div>
          <p className="max-w-4xl text-neutral-600 dark:text-neutral-400">
            {excerpt}
          </p>
        </div>
      </a>
    </Link>
  );
};
