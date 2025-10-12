import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditUser() {

  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(`http://localhost:4000/data/user/${id}`)
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/data/edit/${id}`, {
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>EditUser</div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            value={data.name}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={data.email}
          />
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            onChange={handleChange}
            value={data.phone}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default EditUser;
