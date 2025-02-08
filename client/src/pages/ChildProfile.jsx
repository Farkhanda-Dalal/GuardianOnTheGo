import React, { useState } from "react";
import axios from "axios";

const ChildProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    photo: null,
    emergencyContacts: [{ name: "", phone: "", relationship: "" }],
    medicalCondition: "",
    identificationMarks: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmergencyContactChange = (index, field, value) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index][field] = value;
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [
        ...formData.emergencyContacts,
        { name: "", phone: "", relationship: "" },
      ],
    });
  };

  const handleIdentificationMarksChange = (index, value) => {
    const updatedMarks = [...formData.identificationMarks];
    updatedMarks[index] = value;
    setFormData({ ...formData, identificationMarks: updatedMarks });
  };

  const addIdentificationMark = () => {
    setFormData({
      ...formData,
      identificationMarks: [...formData.identificationMarks, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/childProfile", formData);
      alert("Child profile created successfully!");
      setFormData({
        name: "",
        age: "",
        photo: null,
        emergencyContacts: [{ name: "", phone: "", relationship: "" }],
        medicalCondition: "",
        identificationMarks: [""],
      });
    } catch (error) {
      alert("Error creating child profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded-lg w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Add Child Profile</h2>

        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Emergency Contacts:</label>
          {formData.emergencyContacts.map((contact, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={contact.name}
                onChange={(e) =>
                  handleEmergencyContactChange(index, "name", e.target.value)
                }
                className="border rounded p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={contact.phone}
                onChange={(e) =>
                  handleEmergencyContactChange(index, "phone", e.target.value)
                }
                pattern="^[0-9]{10}$"
                className="border rounded p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Relationship"
                value={contact.relationship}
                onChange={(e) =>
                  handleEmergencyContactChange(
                    index,
                    "relationship",
                    e.target.value
                  )
                }
                className="border rounded p-2 w-full"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEmergencyContact}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Emergency Contact
          </button>
        </div>

        <div>
          <label className="block mb-2">Medical Condition:</label>
          <input
            type="text"
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Identification Marks:</label>
          {formData.identificationMarks.map((mark, index) => (
            <input
              key={index}
              type="text"
              value={mark}
              onChange={(e) =>
                handleIdentificationMarksChange(index, e.target.value)
              }
              className="border rounded p-2 w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addIdentificationMark}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Identification Mark
          </button>
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChildProfileForm;
