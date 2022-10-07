import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import readingTime from "reading-time";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { format, isThisYear } from "date-fns";

export const formatShortDate = (date: string) => {
  const _date = new Date(date);

  return isThisYear(_date) ? format(_date, "MMM d") : format(_date, "MMM d, y");
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blogs/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    date: { type: "string", required: true },
    draft: { type: "boolean", default: false },
  },
  image: { type: "string", required: true },
  computedFields: {
    readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
    wordCount: {
      type: "number",
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    FormattedpublishedAtDate: {
      type: "string",
      resolve: (doc) => {
        return formatShortDate(doc.date);
      },
    },
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        // {
        //   behavior: "wrap",
        //   properties: {
        //     className: [
        //       `no-underline md:text-3xl text-2xl text-neutral-800 dark:text-neutral-200 font-bold`,
        //     ],
        //   },
        // },
      ],
    ],
  },
});

export default contentLayerConfig;
