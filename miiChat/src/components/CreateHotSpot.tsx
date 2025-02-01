import Modal from 'react-modal';
import { useState } from 'react';
import { createHotspotDTO, createHotspot } from "../services/hotspot.service.ts";

interface CreateHotSpotProps {
    isOpen: boolean,
    onRequestClose: () => void
}





export default function CreateHotSpot({ isOpen, onRequestClose }: CreateHotSpotProps) {
    const [formData, setFormData] = useState({
        hotSpotID: '',
        name: '',
        latitude: null,
        longitude: null,
        description: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        const createHotspotDTO: createHotspotDTO = {
            name: formData.name,
            description: formData.description,
            coordinates: [45.497406, -73.577102],
            address: '',
            tags: [],
            numVotes: 0
        }

        createHotspot(createHotspotDTO).then(() =>
            console.log("successfully created hotspot")
        );
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
               className="bg-white p-6 flex-1 rounded-2xl shadow-xl max-w-xl h-[70%] w-full mx-auto absolute z-50"
               overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <h2>Create HotSpot</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
                <input type={"text"} name={"longitude"} placeholder={"longitude"} value={formData.longitude} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <button type="submit">Create</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
}
