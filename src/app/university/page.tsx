"use client";
import React, { useEffect, useState } from "react";

interface IUniversity {
  _id: string;
  university_id: string;
  university_name: string;
}

const UniversitiesPage: React.FC = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const host = process.env.BE;
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${host}/universities`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUniversities(data);
      } catch (error: any) {
        setError(error.message);
        
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-10  ">
      <h1 className="text-3xl font-bold text-center mb-6">
        University's Review
      </h1>
      {universities.length === 0 ? (
        <p className="text-center text-gray-500">No universities found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-24 overflow-y-scroll ">
          {universities.map((university) => (
            <div
              key={university._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <a
                href={`/reviews/${university.university_id}`}
                className="block"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {university.university_name}
                </h2>
                <p className="text-gray-500 text-sm">
                  ID: {university.university_id}
                </p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UniversitiesPage;
