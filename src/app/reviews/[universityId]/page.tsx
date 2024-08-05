"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface IReviews {
  _id: string;
  desc: string;
  star: number;
  university_id: string;
  verified: boolean;
}

const Reviews = () => {
  const { universityId } = useParams<{ universityId: string }>();

  const [reviews, setReviews] = useState<IReviews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const host = process.env.BE;
  useEffect(() => {
    if (!universityId) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${host}/reviews/${universityId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [universityId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-4 min-h-screen p-24">
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="p-6">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105"
              >
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {review.desc}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Stars: {review.star}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  University ID: {review.university_id}
                </p>
                <p className="text-sm text-gray-600">
                  Verified: {review.verified ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
