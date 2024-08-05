"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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

  useEffect(() => {
    if (!universityId) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${universityId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
    <div className="p-4 space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <p className="text-lg font-semibold text-gray-800">{review.desc}</p>
            <p className="text-sm text-gray-600">Stars: {review.star}</p>
            <p className="text-sm text-gray-600">University ID: {review.university_id}</p>
            <p className="text-sm text-gray-600">Verified: {review.verified ? 'Yes' : 'No'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
