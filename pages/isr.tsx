import Head from "next/head";

interface ssgProps {
  name: string;
}

const isr = ({ name }: ssgProps) => {
  return (
    <div>
      <Head>
        <title>Inceremental Site Generation - {name}</title>
      </Head>
      <div className="content">
        <h2>Hello my name is {name}</h2>
        <p>This page is Rendering with ISG (Inceremental Site Generation)</p>
      </div>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const data = await fetch("http://localhost:3000/api/name");
  const json = await data.json();

  return {
    props: {
      name: json.name,
    },
    revalidate: 60,
  };
}

export default isr;
