import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto my-6">
      <header className="border-b pb-6 mb-6 flex items-center justify-between">
        <div>
          <h6 className="flex items-center gap-x-2 text-xl font-bold">
            REGEX{" "}
            <span className="bg-yellow-500 rounded-md px-4 py-1 text-black">
              HUB
            </span>
          </h6>
          <p className="text-base font-medium text-zinc-600 mt-2">
            İhtiyacınız olan regex üretim aracı!
          </p>
        </div>
        <form onSubmit={submitHandle} className="flex gap-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 w-[400px] bg-zinc-100 outline-none focus:bg-zinc-200 px-4 rounded-md text-[15px] font-medium"
            placeholder="Nasıl bir regex üretmek istiyorsunuz?"
          />
          <button
            disabled={!query}
            className="h-10 px-5 rounded-md bg-yellow-500 text-black font-bold disabled:opacity-50 cursor-pointer-events-none"
          >
            ÜRET
          </button>
        </form>
      </header>
    </div>
  );
}
