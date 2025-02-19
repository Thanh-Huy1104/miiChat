import Modal from "react-modal";
import { useState } from "react";
import {
  createHotspotDTO,
  createHotspot,
} from "../services/hotspot.service.ts";

interface CreateHotSpotProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function CreateHotSpot({
  isOpen,
  onRequestClose,
}: CreateHotSpotProps) {
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
    address: "",
    backgroundImg: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "latitude" || name === "longitude" ? Number(value) : value,
    });
  };

  // Function to convert image to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, backgroundImg: reader.result as string });
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createHotspotDTO: createHotspotDTO = {
      name: formData.name,
      description: formData.description,
      coordinates: [Number(formData.latitude), Number(formData.longitude)],
      address: formData.address,
      tags: [],
      numVotes: 0,
      backgroundImg: formData.backgroundImg, // Base64 image
      isActive: false,
    };

    await createHotspot(createHotspotDTO);
    console.log("Successfully created hotspot with image");

    onRequestClose(); // Close modal after submission
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg mx-auto absolute z-50"
      overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create HotSpot</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Hotspot Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
        />

        {/* Latitude & Longitude Inputs */}
        <div className="flex space-x-4">
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
          />
        </div>

        {/* Description Input */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
          rows={3}
        ></textarea>

        {/* Address Input */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none"
        />

        {/* Image Upload Input */}
        <div>
          <p className="text-gray-600 mb-1">Upload Background Image:</p>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Preview Image */}
        {formData.backgroundImg && (
          <div className="mt-2">
            <p className="text-gray-600">Preview:</p>
            <img
              src={formData.backgroundImg}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}