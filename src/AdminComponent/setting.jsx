import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext";
import { API_URL } from "../config";
import "./styleAdmin/myAccount.css";
import { MdOutlineEdit } from "react-icons/md";
import Loading from "../functions/loading";
import { AdminContext } from "../AdminContext";
export default function Setting() {
  const { user, loadUser } = useAuth();
  const [photo, setPhoto] = useState("");
  const [open, setOpen] = useState(false);
  const { adminList, loadAdmin } = useContext(AdminContext);

  console.log(user);
  const userId = user.id;
  console.log(userId);
  console.log(adminList);

  const [loading, setLoading] = useState(false);

  function uploadPhoto(e) {
    let files = e.target.files;
    setPhoto(files);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();

    data.append("username", e.target.username.value);
    data.append("email", e.target.email.value);
    data.append("phone", e.target.phone.value);
    for (let i = 0; i < photo.length; i++) {
      data.append("avatar", photo[i]);
    }
    fetchData(data);
  }

  function fetchData(input) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setLoading(true);
    axios
      .put(`${API_URL}/updateAdminInfo/${userId}`, input, config)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        alert("Admin Updated");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  if (!loadAdmin) return <Loading />;
  if (!loadUser) return <Loading />;
  return (
    <section id="contract-section">
      <h1>Settings</h1>
      <span id="myAccountBox">
        <h3>My Account</h3>
        <hr />
      </span>
      {loading && <Loading id="idLoaAcc" />}
      {!loading && (
        <form onSubmit={handleSubmit} id="myAccountContent">
          <div id="myAccountInner">
            <span id="avatarBox">
              <img
                src={adminList.find((ad) => ad.id === userId).avatar[0]}
                alt=""
                id="avatarAdmin"
              />

              <MdOutlineEdit
                size={34}
                id="editAvatarIcon"
                onClick={() => setOpen(!open)}
              />
            </span>
            <div id="myAccountContentInputs">
              <span>
                <label htmlFor="">Fullname </label>

                <input
                  type="text"
                  disabled
                  defaultValue={
                    adminList.find((ad) => ad.id === userId).username
                  }
                  name="username"
                />
              </span>

              <span>
                <label htmlFor="">Email </label>

                <input
                  type="text"
                  defaultValue={adminList.find((ad) => ad.id === userId).email}
                  name="email"
                />
              </span>

              <span>
                <label htmlFor="">Phone </label>

                <input
                  type="number"
                  defaultValue={adminList.find((ad) => ad.id === userId).phone}
                  name="phone"
                />
              </span>
              <button id="btnEdit" type="submit">
                Edit
              </button>
            </div>
          </div>
          {open && (
            <span>
              <input type="file" multiple onChange={uploadPhoto} name="photo" />
            </span>
          )}
        </form>
      )}
    </section>
  );
}
