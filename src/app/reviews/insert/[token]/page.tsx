"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const ReviewWithToken = () => {
  const { token } = useParams<{ token: string }>();
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState(0);
  const [universityName, setUniversityName] = useState("");
  const [universityId, setUniversityId] = useState("");


  const router = useRouter();
  const host = process.env.BE;
  useEffect(() => {
    if (!token) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${host}/university/${token}`
        );
        if (!response.ok) {

          router.push("/");
        }
        const data = await response.json();


        console.log(data)
        setUniversityName(data.university.university_name)
        setUniversityId(data.university.university_id);
      } catch (error: any) {
        console.log(error);

      }
    };

    fetchReviews();
  }, [token]);
  const handleSubmitReview = async () => {
    try {
      const response = await fetch(`${host}/insertreview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          desc,
          star,
          university_id: universityId,
        }),
      });

      const data = await response.json();
      console.log(data)
    
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-xl font-bold mb-4">Submit Review: {universityName}</h1>
      <h4 className="text-xl font-bold mb-4">id: {universityId}</h4>

      <div className="mb-4">
        <label className="block mb-2">Description:</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Stars:</label>
        <input
          type="number"
          value={star}
          onChange={(e) => setStar(Number(e.target.value))}
          className="border p-2 w-full"
          min="0"
          max="5"
        />
      </div>

      <button
        onClick={handleSubmitReview}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Submit Review
      </button>
       
    </div>
  );
};

export default ReviewWithToken;
