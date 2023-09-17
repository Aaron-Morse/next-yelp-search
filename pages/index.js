import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Form } from "./Form.js";
import { BusinessCard } from "./BusinessCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [businessData, setBusinessData] = useState("");
  console.log(businessData);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Form
        businessData={businessData}
        setBusinessData={setBusinessData}
      />
      {businessData.length > 0 &&
        businessData.map((business) => (
          <BusinessCard
            business={business}
            setBusinessData={setBusinessData}
            key={business.id}
          />
        ))}
    </main>
  );
}
