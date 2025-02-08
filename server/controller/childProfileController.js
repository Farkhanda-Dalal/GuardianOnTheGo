import ChildProfile from '../model/ChildProfileSchema.js';

// Controller to handle creating a child profile
export const createChildProfile = async (req, res) => {
  try {
    const { name, age, medicalCondition, emergencyContacts, identificationMarks } = req.body;

    let photo = null;
    if (req.file) {
      photo = req.file.path; // Assuming you handle file upload elsewhere
    }

    const newChildProfile = new ChildProfile({
      name,
      age,
      photo,
      medicalCondition,
      emergencyContacts,
      identificationMarks
    });

    await newChildProfile.save();

    res.status(201).json({ message: 'Child profile created successfully!' });
  } catch (error) {
    console.error('Error creating child profile:', error);
    console.error(req.body);
    res.status(500).json({ message: 'Error creating child profile. Please try again.' });
  }
};
