import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");

  const [age, setAge] = useState("");

  const [editId, setEditId] = useState(null);

  // Read Data
  const getStudents = () => {
    axios.get("http://localhost:3000/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add Student

  const addStudent = () => {

    axios.post("http://localhost:3000/add", {
      name,
      age,
    })
      .then(() => {
        alert("Student Added");
        setName("");
        setAge("");
        getStudents();
      })
      .catch((err) => console.log(err));

  };

  // Delete Student

  const deleteStudent = (id) => {

    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(() => {
        alert("Deleted");
        getStudents();
      })
      .catch((err) => console.log(err));

  };

  // Edit Button

  const editStudent = (student) => {

    setEditId(student.id);
    setName(student.name);
    setAge(student.age);

  };

  // Update Student

  const updateStudent = () => {

    axios.put(`http://localhost:3000/update/${editId}`, {

      name,
      age,

    })

      .then(() => {

        alert("Updated");

        setName("");
        setAge("");
        setEditId(null);

        getStudents();

      })

      .catch((err) => console.log(err));

  };

  return (

    <div className="container">

      <h1>Student CRUD</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      {
        editId ?

          <button onClick={updateStudent}>
            Update
          </button>

          :

          <button onClick={addStudent}>
            Add
          </button>

      }

      <hr />

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Age</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            students.map((student) => (

              <tr key={student.id}>

                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.age}</td>

                <td>

                  <button onClick={() => editStudent(student)}>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default App;