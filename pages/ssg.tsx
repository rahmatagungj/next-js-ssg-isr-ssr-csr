import Head from "next/head";

interface ssgProps {
  name: string;
}

const ssg = ({ name }: ssgProps) => {
  return (
    <div>
      <Head>
        <title>Static Site Generation - {name}</title>
      </Head>
      <div className="content">
        <h2>{name}</h2>
        <p>This page is Rendering with SSG (Static Site Generation)</p>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const data = await fetch(
    "https://raw.githubusercontent.com/rahmatagungj/next-js-ssg-isr-ssr-csr/master/fake-api/name.json"
  );
  const json = await data.json();

  return {
    props: {
      name: json.name,
    },
  };
}

export default ssg;
