import { useState } from "react"
import Header from "../Header/Header"
import "./details.css"

/* import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps" */


export default function Details (props) {
    const [open, setOpen] = useState(false)


    return (
        <>
            <Header/>
            <section id="detailSection">
                <h1>Phil's Bar & Burgers</h1>
                <section id="imageSection">
                    <p>Images here</p>
                </section>
                <section className="venueRankings">
                    <p className="frequencyStatus">Not too busy</p>
                    <p className="venueCost">$</p>
                    <p className="venueScore">4.3</p>
                </section>
                <section id="venueDesc">
                    <h2>About</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem vitae est ornare luctus. 
                        Pellentesque a arcu nec lectus mattis euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem vitae est ornare luctus. 
                        Pellentesque a arcu nec lectus mattis euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                    </p>
                </section>
                <section id="offersSection">
                    <hr></hr>
                    <h2>Food & Drink Offered</h2>
                    
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at lorem vitae est ornare luctus. 
                        Pellentesque a arcu nec lectus mattis euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                    </p>
                    <hr></hr>
            </section>
            <section id="mapSection">
                    <h2>Location</h2>
                    
{/*                     <APIProvider>
                        <Map
                            defaultZoom={13}
                            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
                            mapId={"8e0468e996c5bdf3b9dbf482"}
                            >
                            <AdvancedMarker position={{ lat: -33.860664, lng: 151.208138 }} onClick={() => setOpen(true)}>
                                <Pin/>
                            </AdvancedMarker>
                            {open && (
                                <InfoWindow position={{ lat: -33.860664, lng: 151.208138 }} onCloseClick={() => setOpen(false)}>
                                    <p>I'm in Sydney!</p>
                                </InfoWindow>
                            )}
                        </Map>
                    </APIProvider> */}

                    <hr></hr>
            </section>
        </section>
        </>
        

    )
}