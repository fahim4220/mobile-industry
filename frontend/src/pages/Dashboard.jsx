import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_URL = "https://your-backend-url.onrender.com/api/sales";

export default function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [newSale, setNewSale] = useState({ name: '', sales: '' });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get(API_URL);
      setSalesData(res.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const handleAddSale = async () => {
    if (!newSale.name || !newSale.sales) return;
    try {
      const res = await axios.post(API_URL, {
        name: newSale.name,
        sales: parseInt(newSale.sales)
      });
      setSalesData([...salesData, res.data]);
      setNewSale({ name: '', sales: '' });
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        <input type="text" placeholder="Model Name" value={newSale.name} onChange={(e) => setNewSale({ ...newSale, name: e.target.value })} />
        <input type="number" placeholder="Sales Volume" value={newSale.sales} onChange={(e) => setNewSale({ ...newSale, sales: e.target.value })} />
        <button onClick={handleAddSale}>Add New Sale</button>
      </div>
    </div>
  );
}