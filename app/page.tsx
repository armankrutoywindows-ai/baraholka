'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  contact: string;
  is_sold: boolean;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setListings(data);
    } else {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center py-6 mb-8 border-b">
          <h1 className="text-3xl font-bold text-green-600">Барахолка колледжа</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors">
            Добавить объявление
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <div className="text-2xl font-bold text-green-600 mb-4">{listing.price} ₸</div>
              <div className="flex justify-between items-center text-sm text-slate-500">
                <span className="bg-slate-100 px-2 py-1 rounded">{listing.category}</span>
                <span>{listing.contact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
