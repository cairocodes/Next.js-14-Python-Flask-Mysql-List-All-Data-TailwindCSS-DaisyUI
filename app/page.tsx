"use client";
  
import React, { useEffect, useState } from "react";
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import Link from "next/link";

export default function Home() {
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
 
    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:5000/users");
            console.log(result.data);
            setUSerData(result.data)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }

  return (
<div className="w-screen py-20 flex justify-center flex-col items-center">
      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold">Next.js 14 Python Flask Mysql List All Data | TailwindCSS DaisyUI</h1>
      </div>    
      <div className="overflow-x-auto">
          <div className="mb-2 w-full text-right">
            <Link
              href="#"
              className="btn btn-primary">
              Create
            </Link>
          </div>
        <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Password</th>
            <th className="py-3 px-6 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            {userData.map((rs, index) => (
            <tr key={rs.id} className="bg-white border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{rs.name}</td>
                <td className="py-3 px-6">{rs.email}</td>
                <td className="py-3 px-6">{rs.password}</td>
                <td className="flex justify-center gap-1 py-3">
                    <button className="btn btn-active btn-primary">Edit</button>
                    <button className="btn btn-active btn-secondary">Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
      </div>  
    </div>
  );
}
