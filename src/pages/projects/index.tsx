import Layout from "../../components/layout/Layout";

const Projects = () => {
  const meta = {
    title: "Blogs - Nathnael Mekonnen",
    description:
      "A collection of different projects and stuff i have worked on with others",
  };

  return (
    <Layout {...meta}>
      <h1 className="mb-4 text-2xl font-extrabold tracking-tight md:text-4xl">
        Projects
      </h1>
      <p className="mb-4 max-w-lg">
        List of projects I recently worked on and working on.
      </p>
      <p classname=""> coming soon </p>
    </Layout>
  );
};

export default Projects;
