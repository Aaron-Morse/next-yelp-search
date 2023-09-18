import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export function Form({ businessData, setBusinessData }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleBusinessData(data) {
    let { businesses } = data;
    // Slicing first 5 entries for testing
    businesses = businesses.slice(0, 5);
    businesses = businesses.map((business) => ({
      email: undefined,
      get_website_url: true,
      website_url: undefined,
      ...business,
    }));
    setBusinessData(businesses);
  }

  async function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    const res = await fetch("/api/yelp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, city, state }),
    });
    const data = await res.json();
    handleBusinessData(data);
    setQuery("");
    setCity("");
    setState("");
    setIsLoading(false);
  }

  // The two functiosn below do not work correctly

  async function getURL(url) {
    // setIsLoading(true);
    const res = await fetch("/api/yelp-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    const { websiteURL } = data;
    // setIsLoading(false);
    return websiteURL;
  }

  function getSelectedUrls() {
    setBusinessData((businesses) => {
      return businesses.map((business) => {
        const websiteURL = getURL(business.url);
        if (websiteURL) {
          business.url = websiteURL;
        }
        return business;
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            Yelp Search
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Select your keyword(s) and a location to search Yelp's
            data.
          </p>
        </div>
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            Search Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Use specific keywords to look up businesses.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="search-term"
                className="block text-sm font-medium leading-6 text-white"
              >
                Search Term
              </label>
              <div className="mt-2">
                <input
                  required
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  id="search-term"
                  name="search-term"
                  type="text"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-white"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  required
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-white"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  required
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
        {businessData.length > 0 && (
          <button
            type="button"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => getSelectedUrls()}
          >
            {isLoading ? "Loading..." : "Get URL(s)"}
          </button>
        )}
        {businessData.length > 0 && (
          <button
            type="button"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => setBusinessData("")}
          >
            Clear Results
          </button>
        )}
      </div>
    </form>
  );
}
