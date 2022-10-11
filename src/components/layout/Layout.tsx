import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import cn from "classnames";
import Head from "next/head";
import useDelayedRender from "use-delayed-render";
import styles from "../../styles/layout.module.css";

const Layout = ({ children, ...otherMeta }: { children: React.ReactNode }) => {
  const router = useRouter();

  const meta = {
    title: "Nathnael Mekonnen – Software Developer",
    description: `Software developer and future pianist`,
    image: "",
    type: "website",
    date: null,
    ...otherMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#161716" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Nathnael Mekonnen" />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:url"
          content={`https://nathnaelmekonnen.com${router.asPath}`}
        />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:site" content="@nmktad" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
        <link
          rel="canonical"
          href={`https://nmktad.vercel.app/${router.asPath}`}
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#01bf71" />
      </Head>
      <div className="bg-neutral-50 dark:bg-neutral-900 max-w-2xl mx-auto min-h-screen px-4 md:px-0">
        <nav className="z-20 flex justify-between items-center w-full font-sora border-neutral-200 dark:border-neutral-700 pt-8 pb-10 text-neutral-900 dark:text-neutral-100 bg-opacity-60">
          <div className="flex flex-col md:flex-row items-center">
            <NavItem href="/" text="home" />
            <NavItem href="/projects" text="projects" />
            <NavItem href="/blog" text="blog" />
            <MobileMenu />
          </div>
          <ToggleTheme />
        </nav>
        <section>{children}</section>
        <footer className="py-24 flex justify-center items-center font-sora text-neutral-600 dark:text-neutral-400 mx-auto w-full mb-8">
          <div className="flex flex-col justify-between gap-4 font-medium lg:flex-row">
            <div className="flex space-x-5">
              <Link href="/blog">
                <a className="text-gray-500 hover:text-gray-600 transition">
                  Posts
                </a>
              </Link>
              <Link href="/tweets">
                <a className="text-gray-500 hover:text-gray-600 transition">
                  Tweets
                </a>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const NavItem = ({ href, text }: { href: string; text: string }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={cn(
          isActive
            ? "font-semibold text-neutral-800 dark:text-neutral-200"
            : "font-normal text-neutral-600 dark:text-neutral-400",
          "text-base hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </Link>
  );
};

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div>Loading</div>;

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-9 h-9 bg-neutral-200 rounded-lg dark:bg-neutral-600 flex items-center justify-center  hover:ring-2 ring-neutral-300  transition-all"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-5 h-5 text-neutral-800 dark:text-neutral-200"
        >
          {theme === "dark" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
      )}
    </button>
  );
};

export default Layout;

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button
        className={cn(
          styles.burger,
          "transition-opacity border-0 bg-transparent w-9 h-9 relative",
          "visible md:hidden"
        )}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            "w-full h-screen opacity-0 mt-16 left-0 transition",
            "z-50 flex flex-col absolute px-7 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
            isMenuRendered && styles.menuRendered
          )}
        >
          <li
            className=" text-sm font-semibold"
            style={{ transitionDelay: "150ms" }}
          >
            <Link href="/">
              <a className="flex w-auto pb-4">Home</a>
            </Link>
          </li>

          <li
            className=" text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: "250ms" }}
          >
            <Link href="/project">
              <a className="flex w-auto pb-4">Projects</a>
            </Link>
          </li>
          <li
            className=" text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: "250ms" }}
          >
            <Link href="/blog">
              <a className="flex w-auto pb-4">Blog</a>
            </Link>
          </li>
          <li
            className=" text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: "275ms" }}
          >
            <Link href="/snippets">
              <a className="flex w-auto pb-4">Snippets</a>
            </Link>
          </li>
          <li
            className=" text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: "300ms" }}
          >
            <Link href="/newsletter">
              <a className="flex w-auto pb-4">Newsletter</a>
            </Link>
          </li>
          <li
            className=" text-gray-900 dark:text-gray-100 text-sm font-semibold"
            style={{ transitionDelay: "325ms" }}
          >
            <Link href="/tweets">
              <a className="flex w-auto pb-4">Tweets</a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 transition text-neutral-900 dark:text-neutral-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 transition text-neutral-900 dark:text-neutral-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
