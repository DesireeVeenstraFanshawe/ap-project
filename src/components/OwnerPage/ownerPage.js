import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

import "./ownerPage.css";

export default function OwnerPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/sign-up-in");
      else {
        setUser(u);
        loadRestaurants(u.uid);
      }
    });

    return () => unsub();
  }, [navigate]);

  async function loadRestaurants(uid) {
    const q = query(collection(db, "restaurants"), where("ownerUid", "==", uid));
    const snap = await getDocs(q);
    setRestaurants(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  async function handleAddRestaurant(e) {
    e.preventDefault();
    setErr("");

    if (!name.trim() || !address.trim()) {
      setErr("Please enter a name and address.");
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, "restaurants"), {
        name: name.trim(),
        address: address.trim(),
        cityId: "calgary",
        ownerUid: user.uid,
        rating: 0,
        priceLevel: "$",
        offers: "",
        about: "",
        hasEvents: false,
        hasHappyHour: false,
        hasDailySpecials: false,
        createdAt: Date.now(),
      });

      setName("");
      setAddress("");

      await loadRestaurants(user.uid);
    } catch (e) {
      setErr(e?.message || "Failed to add restaurant.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Header />

      <section className="ownerWrap">
        <h1>Business Dashboard</h1>

        <h2>Create Restaurant</h2>
        {err && <p className="ownerError">{err}</p>}

        <form onSubmit={handleAddRestaurant} className="ownerForm">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
          />

          <input
            type="text"
            placeholder="Address (Calgary)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={saving}
          />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Restaurant"}
          </button>
        </form>

        <hr className="ownerHr" />

        <h2>Your Restaurants</h2>

        {restaurants.length === 0 ? (
          <p>No restaurants yet.</p>
        ) : (
          <div className="ownerList">
            {restaurants.map((r) => (
              <div key={r.id} className="ownerCard">
                <div>
                  <strong>{r.name}</strong>
                  <p className="ownerAddr">{r.address}</p>
                </div>

                <div className="ownerActions">
                  <button onClick={() => navigate(`/details/${r.id}`)}>View Public</button>
                  <button onClick={() => navigate(`/owner-details/${r.id}`)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}