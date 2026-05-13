import { useEffect, useState } from "react";
import axios from "axios";

function Listings() {

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const initialState = {
        category: "",
        category_title: "",
        category_slug: "",
        name: "",
        slug: "",
        city: "",
        area: "",
        state: "",
        address: "",
        image: "",
        image_url: "",
        rating: "",
        reviews: "",
        fee: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        courses: "",
        facilities: "",
        is_recommended: false,
        is_active: true
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://127.0.0.1:8000/api/listings/");
            setListings(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const openAddModal = () => {
        setFormData(initialState);
        setEditId(null);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setFormData(item);
        setEditId(item.id);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editId) {

                const res = await axios.put(
                    `http://127.0.0.1:8000/api/listings/${editId}/`,
                    formData
                );

                setListings(
                    listings.map(i => i.id === editId ? res.data : i)
                );

            } else {

                const res = await axios.post(
                    "http://127.0.0.1:8000/api/listings/",
                    formData
                );

                setListings([...listings, res.data]);
            }

            setShowModal(false);

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/listings/${id}/`);
            setListings(listings.filter(i => i.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-4">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">

                <h1 className="text-2xl font-bold">Listings</h1>

                <button
                    onClick={openAddModal}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Add Listing
                </button>

            </div>

            {/* TABLE */}
            <div className="bg-white shadow rounded overflow-hidden">

                {loading ? (
                    <p className="p-4">Loading...</p>
                ) : (

                    <table className="w-full">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Image</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">City</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {listings.map(item => (

                                <tr key={item.id} className="border-t">

                                    {/* IMAGE */}
                                    <td className="p-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-14 object-cover rounded"
                                        />
                                    </td>

                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.city}</td>
                                    <td className="p-3">{item.category}</td>

                                    <td className="p-3 flex gap-2">

                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 pb-10 overflow-y-auto">

                    <div className="bg-white w-[90%] max-w-4xl p-6 rounded-xl shadow-lg">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-xl font-bold">
                                {editId ? "Edit Listing" : "Add Listing"}
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-600 hover:text-red-600 text-2xl font-bold"
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">

                            <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2" />

                            <input name="category_title" placeholder="Category Title" value={formData.category_title} onChange={handleChange} className="border p-2" />

                            <input name="category_slug" placeholder="Category Slug" value={formData.category_slug} onChange={handleChange} className="border p-2" />

                            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2" />

                            <input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} className="border p-2" />

                            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2" />

                            <input name="area" placeholder="Area" value={formData.area} onChange={handleChange} className="border p-2" />

                            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-2" />

                            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 col-span-2" />

                            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border p-2 col-span-2" />

                            <input name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} className="border p-2" />

                            <input name="reviews" placeholder="Reviews" value={formData.reviews} onChange={handleChange} className="border p-2" />

                            <input name="fee" placeholder="Fee" value={formData.fee} onChange={handleChange} className="border p-2" />

                            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2" />

                            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2" />

                            <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="border p-2" />

                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 col-span-2" />

                            <input name="courses" placeholder="Courses" value={formData.courses} onChange={handleChange} className="border p-2 col-span-2" />

                            <input name="facilities" placeholder="Facilities" value={formData.facilities} onChange={handleChange} className="border p-2 col-span-2" />

                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="is_recommended" checked={formData.is_recommended} onChange={handleChange} />
                                Recommended
                            </label>

                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                                Active
                            </label>

                            <div className="col-span-2 flex justify-end gap-3 mt-4">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    {editId ? "Update" : "Create"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Listings;