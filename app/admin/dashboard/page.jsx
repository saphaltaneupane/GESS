"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// --- UPDATED CLOUDINARY CONFIG FROM YOUR IMAGE ---
const CLOUD_NAME = "dix50h3ie";
const UPLOAD_PRESET = "school_gallery";
// --------------------------------------------------

const EMPTY_NOTICE = { title: "", description: "", date: "" };
const EMPTY_GALLERY = { name: "" };

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [activeTab, setActiveTab] = useState("notices");

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_NOTICE);
  const [editId, setEditId] = useState(null);

  const [galleryItems, setGalleryItems] = useState([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState(EMPTY_GALLERY);
  const [selectedFile, setSelectedFile] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login/admin");
      else {
        setEmail(user.email);
        setAuthReady(true);
      }
    });
    return () => unsub();
  }, [router]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const qNotices = query(
        collection(db, "notices"),
        orderBy("createdAt", "desc"),
      );
      const snapNotices = await getDocs(qNotices);
      setNotices(snapNotices.docs.map((d) => ({ id: d.id, ...d.data() })));

      const qGallery = query(
        collection(db, "gallery"),
        orderBy("createdAt", "desc"),
      );
      const snapGallery = await getDocs(qGallery);
      setGalleryItems(snapGallery.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authReady) loadAllData();
  }, [authReady]);

  // NOTICE HANDLER (KEPT EXACTLY THE SAME)
  const handleSaveNotice = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, updatedAt: serverTimestamp() };
      if (editId) {
        await updateDoc(doc(db, "notices", editId), data);
      } else {
        await addDoc(collection(db, "notices"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }
      setShowModal(false);
      setForm(EMPTY_NOTICE);
      setEditId(null);
      loadAllData();
    } catch (err) {
      alert(err.message);
    }
    setSaving(false);
  };

  // GALLERY HANDLER (USING CORRECT NEW CLOUD NAME)
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image");

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      const data = await response.json();

      if (data.secure_url) {
        await addDoc(collection(db, "gallery"), {
          name: galleryForm.name,
          path: data.secure_url,
          createdAt: serverTimestamp(),
        });

        setShowGalleryModal(false);
        setGalleryForm(EMPTY_GALLERY);
        setSelectedFile(null);
        loadAllData();
        alert("Upload Successful!");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const col = activeTab === "notices" ? "notices" : "gallery";
      await deleteDoc(doc(db, col, deleteId));
      setDeleteId(null);
      loadAllData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!authReady)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">
        Loading Auth...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <header className="bg-slate-900/50 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/10 sticky top-0 z-40">
        <h1 className="font-black text-xl tracking-tight">
          ADMIN <span className="text-red-500">PANEL</span>
        </h1>
        <div className="flex gap-6 items-center">
          <nav className="flex gap-4 bg-black/30 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("notices")}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition ${activeTab === "notices" ? "bg-red-600 text-white" : "text-slate-400"}`}
            >
              Notices
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition ${activeTab === "gallery" ? "bg-red-600 text-white" : "text-slate-400"}`}
            >
              Gallery
            </button>
          </nav>
          <button
            onClick={() => signOut(auth)}
            className="bg-white/10 hover:bg-red-600 px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {activeTab === "notices" ? (
          <>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black">Notices</h2>
                <p className="text-slate-400">Manage school announcements.</p>
              </div>
              <button
                onClick={() => {
                  setForm(EMPTY_NOTICE);
                  setEditId(null);
                  setShowModal(true);
                }}
                className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-xl font-bold transition-all"
              >
                + Create Notice
              </button>
            </div>
            <div className="grid gap-4">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="bg-slate-900 border border-white/5 p-5 rounded-2xl flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-slate-500 font-bold">{n.date}</p>
                    <h3 className="font-bold text-lg">{n.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(n.id);
                        setForm(n);
                        setShowModal(true);
                      }}
                      className="p-2 text-blue-400 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(n.id)}
                      className="p-2 text-red-400 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black">Gallery</h2>
                <p className="text-slate-400">
                  Upload event photos (Cloudinary Hosting).
                </p>
              </div>
              <button
                onClick={() => setShowGalleryModal(true)}
                className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-xl font-bold transition-all"
              >
                + Upload Photo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-white/5 p-4 rounded-2xl flex items-center gap-4"
                >
                  <div className="w-16 h-16 relative bg-black rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.path}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{item.name}</p>
                    <p className="text-xs text-slate-500 truncate">
                      Hosted on Cloudinary
                    </p>
                  </div>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="text-red-400 p-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* NOTICE MODAL (UNTOUCHED) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl text-white">
            <h2 className="text-2xl font-black mb-6">
              {editId ? "Update Notice" : "New Notice"}
            </h2>
            <form onSubmit={handleSaveNotice} className="space-y-6">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="Title"
                className="w-full bg-slate-800 border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-red-500"
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="w-full bg-slate-800 border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-red-500"
              />
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description"
                className="w-full bg-slate-800 border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-red-500"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-800 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-red-600 py-3 rounded-xl font-bold"
                >
                  {saving ? "Saving..." : "Save Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-black mb-2">Upload Photo</h2>
            <form onSubmit={handleSaveGallery} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Category Name (e.g. Sports Day)
                </label>
                <input
                  type="text"
                  value={galleryForm.name}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, name: e.target.value })
                  }
                  required
                  placeholder="Sports Day 2024"
                  className="w-full bg-slate-800 border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-red-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Select Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  required
                  className="w-full bg-slate-800 border-white/5 rounded-xl px-4 py-3 outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="flex-1 bg-slate-800 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-red-600 py-3 rounded-xl font-bold"
                >
                  {saving ? "Uploading..." : "Upload Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[60]">
          <div className="bg-slate-900 p-8 rounded-3xl max-w-sm text-center border border-white/10">
            <p className="text-xl font-bold mb-6 text-white">
              Delete this permanently?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 bg-slate-800 rounded-xl text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-600 rounded-xl font-bold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
