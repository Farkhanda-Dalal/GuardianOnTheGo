import { useState } from "react";

export default function AddCoGuardians() {
  const [phone, setPhone] = useState("");
  const [phoneList, setPhoneList] = useState([]);

  const addPhoneToSocket = () => {
    if (phone && /^\d{10}$/.test(phone)) {
      setPhoneList([...phoneList, phone]);
      setPhone("");
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  const removePhone = (index) => {
    const updatedList = phoneList.filter((_, i) => i !== index);
    setPhoneList(updatedList);
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-md p-4 bg-white shadow-xl rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Phone Socket Manager</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="tel"
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter 10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={addPhoneToSocket}
          >
            Add to Socket
          </button>
        </div>

        {phoneList.length > 0 ? (
          <ul className="space-y-2">
            {phoneList.map((number, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm"
              >
                <span>{number}</span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removePhone(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No phone numbers added yet.</p>
        )}
      </div>
    </div>
  );
}
