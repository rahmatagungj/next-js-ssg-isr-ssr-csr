import Head from "next/head";
import React from "react";

interface dataJson {
  name: string;
}

const Csr = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<dataJson | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  const getAllData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        "https://raw.githubusercontent.com/rahmatagungj/next-js-ssg-isr-ssr-csr/master/fake-api/name.json"
      );
      const json = await data.json();
      setData(json);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getAllData();
    return () => {
      setData(null);
    };
  }, []);

  return (
    <div>
      <Head>
        {!data && <title>Server Side Rendering</title>}
        {data && !isError && <title>Server Side Rendering - {data.name}</title>}
      </Head>
      <div className="content">
        {isLoading && <h2>Loading...</h2>}
        {isError && <h2>Oops, something went wrong!</h2>}
        {data && !isError && (
          <>
            <h2>{data.name}</h2>
            <p>This page is Rendering with SSG (Server Side Rendering)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Csr;
