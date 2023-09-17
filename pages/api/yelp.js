const apiKey =
  "07zuneEA8JMaYDX63TqF6kEWB3iZfI2wY3pQpli4wVVt6JJwXl5b816GhkcayARacvaf0MKWj6qEMgWCQEKX-5MFCMGkKfLgJUzC92VAYuZfU2A6QkAynBL34b_GZHYx";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

export default async function handler(req, res) {
  const { query, city, state } = req.body;
  const URL = `https://api.yelp.com/v3/businesses/search?location=${city}%20${state}&term=${query}&limit=50`;
  const response = await fetch(URL, options);
  const data = await response.json();
  return res.status(200).json(data);
}
