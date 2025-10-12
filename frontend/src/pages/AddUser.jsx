import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [error, setError] = useState("");
  const [data, setData] = useState([
    { name: "", email: "", phone: "", image: null },
  ]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  function handleChange(e, i) {
    const { name, value } = e.target;
    const updated = [...data];
    updated[i][name] = value;
    setData(updated);
  }

  function handleFileChange(e, i) {
    const file = e.target.files[0];
    const updated = [...data];
    updated[i].image = file;
    setData(updated);
  }

  function addMoreUser() {
    setData([...data, { name: "", email: "", phone: "", image: null }]);
  }

  function removeUser(index) {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      for (let i = 0; i < data.length; i++) {
        const frm = new FormData();
        frm.append("name", data[i].name);
        frm.append("email", data[i].email);
        frm.append("phone", data[i].phone);
        frm.append("image", data[i].image);

        await axios.post("http://localhost:4000/data/add", frm, {
          withCredentials: true,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error is:", error);
      setError(error?.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <h3>Add User</h3>
        <button onClick={addMoreUser} type="button">
          +
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div id="parent_div">
        {data.map((item, i) => (
          <div key={i} style={{ marginBottom: "20px", marginTop: "10px" }}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={item.name}
                onChange={(e) => handleChange(e, i)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={item.email}
                onChange={(e) => handleChange(e, i)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={item.phone}
                onChange={(e) => handleChange(e, i)}
                required
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <input
                type="file"
                ref={(el) => (inputRefs.current[i] = el)}
                onChange={(e) => handleFileChange(e, i)}
                required
              />
              {data.length > 1 && (
                <button type="button" onClick={() => removeUser(i)}>
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddUser;
