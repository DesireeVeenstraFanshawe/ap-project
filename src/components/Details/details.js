import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./details.css";

import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import MapMarker from "../MapMarker/mapMarker";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadVenue() {
      setErr("");
      setLoading(true);

      try {
        if (!id) {
          setErr("No restaurant id provided.");
          setVenue(null);
          return;
        }

        const snap = await getDoc(doc(db, "restaurants", id));
        if (!snap.exists()) {
          setErr("Restaurant not found.");
          setVenue(null);
          return;
        }

        setVenue({ id: snap.id, ...snap.data() });
      } catch (e) {
        setErr(e?.message || "Failed to load restaurant details.");
        setVenue(null);
      } finally {
        setLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  // Generate random busyness (keeps your feature)
  function busyAtRandom(min, max) {
    const tempNum = Math.floor(Math.random() * (max - min)) + min;
    if (tempNum === 1) return "Empty";
    if (tempNum === 2) return "Not too busy";
    return "Packed";
  }

  const events = useMemo(
    () => (Array.isArray(venue?.events) ? venue.events : []),
    [venue]
  );

  // Map center (fallback to Calgary if no coordinates exist)
  const mapCenter = useMemo(() => {
    const lat = Number(venue?.coordinates?.[0]);
    const lng = Number(venue?.coordinates?.[1]);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return { lat: 51.0447, lng: -114.0719 }; // Calgary fallback
    }

    return { lat, lng };
  }, [venue]);

  return (
    <>
      <Header />

      <section id="detailSection">
        {loading ? (
          <p>Loading...</p>
        ) : err ? (
          <section>
            <p className="errorText">{err}</p>
            <button
              className="backBtn"
              type="button"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </section>
        ) : (
          <>
            <h1>{venue?.name || "Restaurant"}</h1>

            {/* Address / Price / Rating */}
            <section id="venueDesc">
              <h2>Address</h2>
              <p>{venue?.address || "Address not provided."}</p>

              {venue?.priceLevel && (
                <p>
                  <strong>Price:</strong>{" "}
                  <span className="venuePCost">{venue.priceLevel}</span>
                </p>
              )}

              {typeof venue?.rating === "number" && (
                <p>
                  <strong>Rating:</strong> {venue.rating}
                </p>
              )}
            </section>

            {/* About / Offers */}
            {(venue?.about || venue?.offers) && (
              <section>
                <h2>More Info</h2>

                {venue?.about && (
                  <p>
                    <strong>About:</strong> {venue.about}
                  </p>
                )}

                {venue?.offers && (
                  <p>
                    <strong>Offers:</strong> {venue.offers}
                  </p>
                )}
              </section>
            )}

            {/* MAP */}
            <section id="mapSection">
              <hr />
              <h2>Location</h2>
              <p>{venue?.address || "Address not provided."}</p>

              <APIProvider apiKey="AIzaSyDy-6rkV4XH2UXvyubcwT3PLH9H-Hef0vI">
                <Map
                  defaultZoom={15}
                  defaultCenter={mapCenter}
                  mapId={"8e0468e996c5bdf3b9dbf482"}
                  style={{
                    width: "100%",
                    height: "350px",
                    borderRadius: "12px",
                  }}
                >
                  <AdvancedMarker position={mapCenter}>
                    <MapMarker frequency={busyAtRandom(1, 3)} />
                  </AdvancedMarker>
                </Map>
              </APIProvider>

              <hr />
            </section>

            {/* Deals + Events */}
            <section id="offersSection">
              <hr />
              <h2>Deals & Events</h2>

              <h3>Happy Hour</h3>
              {venue?.hasHappyHour ? (
                <p>
                  {venue?.happyHourDetails ||
                    "Happy hour is available, but details were not added yet."}
                </p>
              ) : (
                <p>No happy hour listed.</p>
              )}

              <h3>Daily Specials</h3>
              {venue?.hasDailySpecials ? (
                <p>
                  {venue?.dailySpecialsDetails ||
                    "Daily specials are available, but details were not added yet."}
                </p>
              ) : (
                <p>No daily specials listed.</p>
              )}

              <h3>Events</h3>
              {venue?.hasEvents ? (
                events.length === 0 ? (
                  <p>Events are available, but none were added yet.</p>
                ) : (
                  <ul style={{ marginTop: "0.5rem" }}>
                    {events.map((ev, idx) => (
                      <li key={idx} style={{ marginBottom: "0.75rem" }}>
                        <strong>{ev.title || "Event"}</strong>
                        {(ev.day || ev.time) && (
                          <span>
                            {" "}
                            — {ev.day || "Day TBD"}
                            {ev.time ? ` at ${ev.time}` : ""}
                          </span>
                        )}
                        {ev.details && <div>{ev.details}</div>}
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <p>No events listed.</p>
              )}

              <hr />
            </section>
          </>
        )}
      </section>
    </>
  );
}