import { useState } from 'react';

const GenerateLink = () => {
  const [universityId, setUniversityId] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  
  const host = process.env.BE;
  const handleGenerateLink = async () => {
    try {
      const response = await fetch(`${host}/onetimelink`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ university_id: universityId }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setMessage('One-time link created successfully!');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error: Failed to generate one-time link');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Generate One-Time Link</h1>
      <div className="mb-4">
        <label className="block mb-2">University ID:</label>
        <input
          type="text"
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button
        onClick={handleGenerateLink}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Link
      </button>
      {message && <p className="mt-4">{message}</p>}
      {token && (
        <div className="mt-4">
          <p>One-Time Token:</p>
          <p className="font-mono bg-gray-200 p-2 rounded">http://localhost:3000/reviews/insert/{token}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateLink;
