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

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/universities");
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
    <div>
      <h1>Universities</h1>
      {universities.length === 0 ? (
        <p>No universities found.</p>
      ) : (
        <ul className="space-y-4">
          {universities.map((university) => (
            <li
              key={university._id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <a href={`/reviews/${university.university_id}`}>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {university.university_name}
                </h2>
                <p className="text-gray-600">ID: {university.university_id}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UniversitiesPage;
