/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import { MdLocationOn } from "react-icons/md";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Page = () => {

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1IjoidmFuY3VvbmciLCJhIjoiY202cTNmNDNyMDg2ejJsb3JldHdzZ2tvZyJ9.xmFs2pCe15C9ItaJ0XOeHw";

        const map = new mapboxgl.Map({
            container: mapContainerRef.current || '',
            style: "mapbox://styles/mapbox/satellite-streets-v12",
            center: [105.8412, 21.0285], // Hanoi, Vietnam
            zoom: 14, // Adjusted zoom to show multiple cities
        });

        // Add markers for the cities
        const cities = [
            { name: "Ha Noi - Suit Shop", coordinates: [105.8412, 21.0285] as [number, number] },
            { name: "Ho Chi Minh City - Suit Shop", coordinates: [106.7074, 10.7769] as [number, number] },
            { name: "Da Nang - Suit Shop", coordinates: [108.2022, 16.0544] as [number, number] },
        ];

        cities.forEach(city => {
            const marker = new mapboxgl.Marker()
                .setLngLat(city.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // Add popups
                        .setHTML(`<h3>${city.name}</h3>`)
                )
                .addTo(map);
        });

        // Cleanup on component unmount
        return () => map.remove();
    }, []);

    return (
        <div className='flex flex-col gap-7 justify-center items-center mt-8 px-3.5 md:px-7 xl:px-16'>
            <p className='font-semibold text-xl'>STORE SYSTEM</p>

            <div className='py-5 w-[100%] md:w-[50%] text-center bg-gray-100 shadow-md rounded-lg'>
                <p className='font-semibold'>LIST OF STORE</p>
                <div className='flex justify-evenly sm:text-base text-sm mt-5'>
                    <div className='flex items-center gap-2 text-nowrap'>
                        <MdLocationOn />
                        <p>Ha Noi</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <MdLocationOn />
                        <p>Ho Chi Minh</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <MdLocationOn />
                        <p>Da Nang</p>
                    </div>
                </div>
            </div>

            <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
        </div>
    )
}

export default Page
