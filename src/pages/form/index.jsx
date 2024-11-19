import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentSearchApp = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchage, setSearchage] = useState();
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.freetestapi.com/api/v1/students"
        );
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
   
    );

    
    setFilteredStudents(filtered)

    const filteredage = students.filter((student) =>
        student.age.includes(searchage)
      );

     
      
     setFilteredStudents(filteredage)
 };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Search</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-2 py-1"
        />
        <br />
        <input
          type="text"
          placeholder="age"
          value={searchage}
          onChange={(e) => setSearchage(e.target.value)}
          className="border px-2 py-1"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
        >
          {" "}
          Search
        </button>
      </div>

      {filteredStudents.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">gender</th>
              <th className="border px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.id}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.gender}</td>
                <td className="border px-4 py-2">{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>no datas</p>
      )}
    </div>
  );
};
export default StudentSearchApp;
