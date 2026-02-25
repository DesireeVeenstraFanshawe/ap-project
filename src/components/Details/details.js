import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./details.css";

import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
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


      /* Generate random busyness */
    function busyAtRandom(min, max) {
        let tempNum = Math.floor(Math.random() * (max - min) ) + min;
        if (tempNum === 1) {
            return "Empty"
        } if (tempNum === 2) {
            return "Not too busy"
        } if (tempNum === 3) {
            return "Packed"
        }
    }

  const events = Array.isArray(venue?.events) ? venue.events : [];

  return (
    <>
      <Header />

      <section id="detailSection">
        {loading ? (
          <p>Loading...</p>
        ) : err ? (
          <section>
            <p className="errorText">{err}</p>
            <button className="backBtn" type="button" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </section>
        ) : (
          <>
            <h1>{venue?.name || "Restaurant"}</h1>

            {/* Address */}
{/*             <section id="venueDesc">
              
            </section> */}
            <section id="venueDesc">
              <h2>Address</h2>
              <p>{venue?.address || "Address not provided."}</p>

              {venue?.priceLevel && (
                <p>
                  <strong>Price:</strong> {venue.priceLevel}
                </p>
              )}

              {typeof venue?.rating === "number" && (
                <p>
                  <strong>Rating:</strong> {venue.rating}
                </p>
              )}
            </section>

            {venue?.about && (
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
                {venue?.rating && (
                  <p>
                    <strong>Rating:</strong> {venue.rating}
                  </p>
                )}
                {venue?.priceLevel && (
                  <p>
                    <strong>Price:</strong> <strong className="venuePCost"> {venue.priceLevel}</strong> 
                  </p>
                )}
              </section>
            )}

            <section id="mapSection">
              <hr />
              <h2>Location</h2>
              <p>{venue?.address || "Address not provided."}</p>
              <hr></hr>
               <APIProvider apiKey="AIzaSyDy-6rkV4XH2UXvyubcwT3PLH9H-Hef0vI">
                    <Map
                        defaultZoom={15}
                        defaultCenter={{ lat: Number(venue.coordinates[0]), lng: Number(venue.coordinates[1])}}
                        mapId={"8e0468e996c5bdf3b9dbf482"}
                        >
                        <AdvancedMarker position={{ lat: Number(venue.coordinates[0]), lng: Number(venue.coordinates[1]) }}>
                            <MapMarker frequency={busyAtRandom(1, 3)}/>
                        </AdvancedMarker>
                    </Map>
                </APIProvider>
              
                <h2>About</h2>
                <p>{venue.about}</p>
              </section>
            )}

            <section id="offersSection">
              <hr />
              <h2>Deals & Events</h2>

              {/* Happy Hour */}
              <h3>Happy Hour</h3>
              {venue?.hasHappyHour ? (
                <p>{venue?.happyHourDetails || "Happy hour is available, but details were not added yet."}</p>
              ) : (
                <p>No happy hour listed.</p>
              )}

              {/* Daily Specials */}
              <h3>Daily Specials</h3>
              {venue?.hasDailySpecials ? (
                <p>{venue?.dailySpecialsDetails || "Daily specials are available, but details were not added yet."}</p>
              ) : (
                <p>No daily specials listed.</p>
              )}

              {/* Events */}
              <h3>Events</h3>
              {venue?.hasEvents ? (
                events.length === 0 ? (
                  <p>Events are available, but none were added yet.</p>
                ) : (
                  <ul style={{ marginTop: "0.5rem" }}>
                    {events.map((ev, idx) => (
                      <li key={idx} style={{ marginBottom: "0.5rem" }}>
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