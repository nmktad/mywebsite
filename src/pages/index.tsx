import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import React from "react";
import Layout from "../components/layout/Layout";

const Home = ({ profile }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, bio, imageURL } = profile;

  return (
    <Layout>
      <section className="flex md:gap-6 flex-col md:justify-between md:flex-row  font-sans text-neutral-600 dar:text-neutral-400">
        <div className="flex gap-2 md:gap-4 flex-col md:m-auto">
          <div>
            <h1 className="text-4xl text-neutral-800 dark:text-neutral-200 font-bold md:font-extrabold mb-2">
              {name}
            </h1>
            <h2 className="mb-4 md:max-w-md">{bio}</h2>
          </div>
          <ul className="transition-transform ease-in-out flex gap-8 md:gap-6 items-center fill-neutral-800 dark:fill-neutral-200">
            <SocialLink href="https://github.com/nmktad">
              <svg
                className="w-8 md:w-6 fill-neutral-800 dark:fill-neutral-200"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
              >
                <path d="M11 .5C5.202.5.5 5.323.5 11.267c0 4.758 3.01 8.79 7.181 10.214a.82.82 0 00.178.019c.39 0 .54-.286.54-.534 0-.258-.01-.933-.015-1.833a4.802 4.802 0 01-1.059.126c-2.02 0-2.48-1.57-2.48-1.57-.478-1.242-1.167-1.575-1.167-1.575-.914-.642-.005-.66.066-.66h.004c1.055.093 1.608 1.115 1.608 1.115.525.919 1.228 1.176 1.857 1.176a2.953 2.953 0 001.2-.28c.093-.695.365-1.168.665-1.44-2.33-.272-4.781-1.195-4.781-5.32 0-1.177.408-2.138 1.078-2.888-.108-.272-.469-1.369.103-2.85a.874.874 0 01.235-.023c.38 0 1.237.145 2.653 1.13a9.76 9.76 0 015.259 0c1.416-.985 2.273-1.13 2.653-1.13a.874.874 0 01.235.023c.571 1.481.21 2.578.103 2.85.67.755 1.078 1.716 1.078 2.888 0 4.134-2.456 5.043-4.796 5.31.375.333.713.99.713 1.993 0 1.439-.014 2.601-.014 2.953 0 .253.145.539.534.539a.9.9 0 00.188-.019c4.176-1.425 7.181-5.46 7.181-10.214C21.5 5.323 16.798.5 11 .5z"></path>
              </svg>
            </SocialLink>
            <SocialLink href="https://twitter.com/nmktad">
              <svg
                className="w-8 md:w-6 fill-neutral-800 dark:fill-neutral-200"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 18"
              >
                <path d="M23.25 2.133a9.46 9.46 0 01-2.65.717A4.57 4.57 0 0022.63.338c-.908.53-1.9.903-2.932 1.101A4.647 4.647 0 0016.327 0c-2.55 0-4.615 2.034-4.615 4.542a4.37 4.37 0 00.119 1.036A13.158 13.158 0 012.315.83a4.485 4.485 0 00-.627 2.283c0 1.575.821 2.967 2.062 3.782a4.57 4.57 0 01-2.1-.567v.056c0 2.204 1.595 4.036 3.704 4.454-.397.105-.805.159-1.216.159-.291 0-.582-.028-.868-.085.587 1.805 2.294 3.118 4.315 3.155a9.356 9.356 0 01-6.835 1.88A13.063 13.063 0 007.816 18c8.501 0 13.146-6.923 13.146-12.928 0-.197-.006-.394-.015-.586a9.304 9.304 0 002.303-2.353z"></path>
              </svg>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/nmktadesse">
              <svg
                className="w-8 md:w-6 fill-neutral-800 dark:fill-neutral-200"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
              >
                <path d="M19.82.5H2.294C1.337.5.5 1.19.5 2.135v17.566c0 .951.837 1.799 1.794 1.799h17.521c.963 0 1.685-.854 1.685-1.8V2.136C21.506 1.19 20.778.5 19.82.5zM7.01 18.005H4V8.65H7.01v9.354zM5.61 7.228h-.022c-.963 0-1.586-.716-1.586-1.613C4.002 4.7 4.642 4 5.626 4c.984 0 1.587.695 1.608 1.614 0 .897-.624 1.613-1.625 1.613zm12.395 10.777h-3.009V12.89c0-1.225-.438-2.063-1.526-2.063-.832 0-1.324.563-1.543 1.111-.082.197-.104.465-.104.739v5.328H8.815V8.65h3.008v1.301c.438-.623 1.122-1.52 2.713-1.52 1.975 0 3.469 1.301 3.469 4.108v5.465z"></path>
              </svg>
            </SocialLink>
          </ul>
        </div>
        <div className="hidden md:block p-2 rounded-full shadow-sm shadow-[#251e40]">
          <div className="rounded-full shadow p-2 shadow-[#392c72]">
            <div className="shadow rounded-full  shadow-[#443592]">
              <div className="relative w-44 rounded-full overflow-hidden h-44">
                <Image
                  alt={name}
                  height={176}
                  width={176}
                  src={imageURL}
                  sizes="30vw"
                  priority
                  className="rounded-full filter grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const SocialLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li className="transition-transform hover:scale-125 duration-50">
    <a href={href} rel="noreferrer noopener" target="_blank">
      {children}
    </a>
  </li>
);

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://api.github.com/users/nmktad");
  const {
    bio,
    avatar_url,
    name,
    email,
    company,
    location,
  }: {
    bio: string;
    avatar_url: string;
    name: string;
    email: string | null;
    company: string | null;
    location: string;
  } = await res.json();

  return {
    props: {
      profile: {
        bio,
        imageURL: avatar_url,
        name,
        email,
        company,
        location,
      },
    },
    revalidate: 10,
  };
}

export default Home;
