import React, { useState } from "react";

export function BusinessCard({ business, setBusinessData }) {
  // Company website URL
  const [URL, setURL] = useState(undefined);
  // const [email, setEmail] = useState(undefined);
  const [emailCheckbox, setEmailCheckbox] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    categories,
    email,
    get_website_url,
    id,
    location,
    name,
    phone,
    url,
    website_url,
  } = business;

  const { address1, address2, city, state, zip_code } = location;

  async function getURL(url) {
    setIsLoading(true);
    const res = await fetch("/api/yelp-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    const { websiteURL } = data;
    setURL(websiteURL);
    setIsLoading(false);
  }

  async function getEmail(url) {
    const res = await fetch("/api/website-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ URL }),
    });
    const data = await res.json();
    const { contactEmail } = data;
    setEmail(contactEmail);
  }

  function handleChange(id, value) {
    setBusinessData((businesses) => {
      return businesses.map((business) => {
        if (business.id === id) {
          business.get_website_url = value;
        }
        return business;
      });
    });
  }

  return (
    <div className="bg-black shadow sm:rounded-lg border border-white/10 mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-white-900">
          {name}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-400">
          <p>
            <strong>Business ID:</strong> {id}
          </p>
        </div>
        <div className="mt-2 max-w-xl text-sm text-gray-400">
          <p>
            <strong>Description: </strong>
            {name} is in the following categories:{" "}
            {categories.map((entry) => entry.alias).join(", ")}.
          </p>
        </div>
        <div className="mt-2 max-w-xl text-sm text-gray-400">
          <p>
            <strong>Phone number:</strong> {phone}
          </p>
        </div>
        <div className="mt-2 max-w-xl text-sm text-gray-400">
          <p>
            <strong>Location:</strong> {address1} {address2}, {city},{" "}
            {state}, {zip_code}
          </p>
        </div>
        {website_url !== undefined && (
          <div className="mt-2 max-w-xl text-sm text-gray-400">
            <p>
              <strong>URL:</strong> {website_url}
            </p>
          </div>
        )}
        {email !== undefined && (
          <div className="mt-2 max-w-xl text-sm text-gray-400">
            <p>
              <strong>Email:</strong> {email}
            </p>
          </div>
        )}
        {/* {URL === undefined && (
          <div className="mt-5">
            <button
              onClick={() => getURL(url)}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isLoading ? "Loading..." : "Get URL"}
            </button>
          </div>
        )} */}
        {/* {URL !== undefined && email === undefined && (
          <div className="mt-5">
            <button
              onClick={() => getEmail(URL)}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isLoading ? "Loading..." : "Get Email"}
            </button>
          </div>
        )} */}
        <div className="relative flex items-start mt-5">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              checked={emailCheckbox}
              onChange={(event) => {
                const value = event.target.checked;
                setEmailCheckbox(value);
                handleChange(id, value);
              }}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label
              htmlFor="comments"
              className="font-medium text-white-900"
            >
              {isLoading ? "Loading..." : "Get URL"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
