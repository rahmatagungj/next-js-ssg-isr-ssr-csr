import Head from "next/head";

interface ssrProps {
  name: string;
}

const ssr = ({ name }: ssrProps) => {
  return (
    <div>
      <Head>
        <title>Server Side Rendering - {name}</title>
      </Head>
      <div className="content">
        <h2>{name}</h2>
        <p>This page is Rendering with SSG (Server Side Rendering)</p>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
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

export default ssr;
