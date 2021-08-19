import Head from "next/head";
import { useState, useEffect } from "react";

interface dataJson {
  name: string;
}

const csr = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<dataJson | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const getAllData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch("http://localhost:3000/api/name");
      const json = await data.json();
      setData(json);
    } catch (e) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
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

export default csr;
