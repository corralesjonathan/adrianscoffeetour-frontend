import { useEffect } from "react";
import "../../index.css";
import { useAxios } from "../../hooks/useAxios";

export function Hero({ img }) {
  const { data, loading, error, request } = useAxios();

  useEffect(() => {
    request("/adrianscoffeetour");
  }, [request]);

  return (
    <div className="flex max-sm:flex-col w-[90vw] mt-[120px] m-auto p-[40px] max-sm:p-[20px] gap-[20px] rounded-[20px] min-h-[500px] bg-adrians-beige/40">
      <div className="flex flex-col justify-center gap-[10px] w-[60%] max-sm:w-full">
        <h1 className="text-adrians-brown text-4xl max-sm:text-3xl font-light m-0 p-0 leading-tight">
          Welcome to
          <br />
          <span className="text-adrians-red text-6xl max-sm:text-5xl font-semibold m-0 p-0">
            {data?.name}
          </span>
        </h1>
        <p className="text-adrians-brown text-xl max-sm:text-lg font-regular m-0 leading-tight">
          {error && <p>Error: {error.message}</p>}
          {loading && <p>Loading...</p>}
          {data?.description}
        </p>
      </div>
      <img
        className="w-[40%] max-sm:w-full h-[500px] md:h-[400px] max-sm:h-[300px] object-cover rounded-[20px]"
        src={img}
        alt="Hero image"
      />
    </div>
  );
}
