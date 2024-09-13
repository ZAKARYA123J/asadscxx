"use client"
import React, { useState } from "react";

export default function Update({ detailId, dataId }) {
  const [formData, setFormData] = useState({
    constructionyear: "",
    surface: "",
    rooms: "",
    bedrooms: null,
    livingrooms: "",
    kitchen: "",
    bathrooms: "",
    furnished: "",
    floor: "",
    elevator: "",
    parking: "",
    balcony: "",
    pool: "",
    facade: "",
    documents: "",
    postId: dataId,
  });

  console.log("detail", detailId, "data", dataId);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://immoceanrepo.vercel.app/api/details/${detailId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        console.log("Update successful");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Construction Year:
        <input
          type="text"
          name="constructionyear"
          value={formData.constructionyear}
          onChange={handleChange}
        />
      </label>
      <label>
        Surface:
        <input
          type="text"
          name="surface"
          value={formData.surface}
          onChange={handleChange}
        />
      </label>
      <label>
        Rooms:
        <input
          type="text"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Bedrooms:
        <input
          type="text"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Livingrooms:
        <input
          type="text"
          name="livingrooms"
          value={formData.livingrooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Kitchen:
        <input
          type="text"
          name="kitchen"
          value={formData.kitchen}
          onChange={handleChange}
        />
      </label>
      <label>
        Bathrooms:
        <input
          type="text"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Furnished:
        <input
          type="text"
          name="furnished"
          value={formData.furnished}
          onChange={handleChange}
        />
      </label>
      <label>
        Floor:
        <input
          type="text"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
        />
      </label>
      <label>
        Elevator:
        <input
          type="text"
          name="elevator"
          value={formData.elevator}
          onChange={handleChange}
        />
      </label>
      <label>
        Parking:
        <input
          type="text"
          name="parking"
          value={formData.parking}
          onChange={handleChange}
        />
      </label>
      <label>
        Balcony:
        <input
          type="text"
          name="balcony"
          value={formData.balcony}
          onChange={handleChange}
        />
      </label>
      <label>
        Pool:
        <input
          type="text"
          name="pool"
          value={formData.pool}
          onChange={handleChange}
        />
      </label>
      <label>
        Facade:
        <input
          type="text"
          name="facade"
          value={formData.facade}
          onChange={handleChange}
        />
      </label>
      <label>
        Documents:
        <input
          type="text"
          name="documents"
          value={formData.documents}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}
