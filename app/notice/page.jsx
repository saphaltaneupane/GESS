"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, "notices"),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        setNotices(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error loading notices:", err);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="bg-red-600 py-12 px-4 border-b-8 border-red-800 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Notice Board
        </h1>
        <p className="text-red-100 mt-2 font-bold tracking-widest text-sm uppercase">
          Ganesh English Secondary School
        </p>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
            <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">
              No official notices posted yet.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {notices.map((n) => (
              <div key={n.id} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest">
                    Notice
                  </span>
                  <span className="text-slate-400 text-xs font-bold tabular-nums uppercase tracking-wider">
                    {n.date}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-5">
                  {n.title}
                </h2>
                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-red-600 shadow-sm">
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed whitespace-pre-line font-medium">
                    {n.description}
                  </p>
                </div>
                <div className="mt-16 h-px bg-slate-100 w-full"></div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
