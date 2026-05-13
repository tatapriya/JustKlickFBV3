import { useEffect, useState } from "react";
import api from "../../api/api";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        description: "",
        image: ""
    });

    const [editId, setEditId] = useState(null);

    // LOAD
    const loadCategories = async () => {
        try {
            const res = await api.get("/categories/");
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // OPEN FORM (ADD)
    const openAddForm = () => {
        setForm({
            title: "",
            slug: "",
            description: "",
            image: ""
        });
        setEditId(null);
        setShowForm(true);
    };

    // OPEN FORM (EDIT)
    const handleEdit = (cat) => {
        setForm({
            title: cat.title,
            slug: cat.slug,
            description: cat.description,
            image: cat.image
        });

        setEditId(cat.id);
        setShowForm(true);
    };

    // SUBMIT
    const handleSubmit = async () => {

        if (!form.title) return;

        try {

            if (editId) {
                await api.put(`/categories/${editId}/`, form);
            } else {
                await api.post("/categories/", form);
            }

            setShowForm(false);
            setEditId(null);

            loadCategories();

        } catch (error) {
            console.log(error);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await api.delete(`/categories/${id}/`);
            setCategories(categories.filter(c => c.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold">
                    Categories Management
                </h1>

                <button
                    onClick={openAddForm}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Add Category
                </button>

            </div>

            {/* LIST */}
            <div className="bg-white p-4 rounded shadow">

                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex justify-between items-center border-b py-3"
                    >

                        <div className="flex items-center gap-3">

                            {cat.image && (
                                <img
                                    src={cat.image}
                                    className="w-12 h-12 object-cover rounded"
                                />
                            )}

                            <div>
                                <p className="font-semibold">
                                    {cat.title}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {cat.slug}
                                </p>
                            </div>

                        </div>

                        <div className="space-x-3">

                            <button
                                onClick={() => handleEdit(cat)}
                                className="text-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(cat.id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}

            </div>

            {/* MODAL OVERLAY */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

                    {/* CARD */}
                    <div className="bg-white w-[500px] rounded-xl shadow-lg p-6 relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-4 text-xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-bold mb-4">
                            {editId ? "Edit Category" : "Add Category"}
                        </h2>

                        <div className="space-y-3">

                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="border p-2 w-full"
                            />

                            <input
                                name="slug"
                                value={form.slug}
                                onChange={handleChange}
                                placeholder="Slug"
                                className="border p-2 w-full"
                            />

                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="Image URL"
                                className="border p-2 w-full"
                            />

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="border p-2 w-full"
                            />

                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-4 py-2 w-full rounded"
                            >
                                {editId ? "Update" : "Save"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Categories;