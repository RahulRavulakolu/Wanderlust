const maptoken = mapboxToken;

            mapboxgl.accessToken = maptoken;

            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12', // MANDATORY
                center: listing.geometry.coordinates, // MANDATORY: [longitude, latitude]
                zoom: 9 // MANDATORY: starting zoom level,
            });
        
const customMarker = new mapboxgl.Marker({
    element: createCustomMarkerElement(),
    anchor: 'bottom' // optional: aligns the image from the bottom
})
.setLngLat(listing.geometry.coordinates) // MANDATORY: [longitude, latitude]
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking </p>`)) // optional: adds a popup with the listing title
.addTo(map); // MANDATORY: adds the marker to the map

function createCustomMarkerElement() {
    // Create the outer wrapper (transparent black circle)
    const wrapper = document.createElement('div');
    wrapper.className = 'marker-wrapper';

    // Create the icon image
    const icon = document.createElement('div');
    icon.className = 'custom-marker';
    icon.style.backgroundImage = 'url("/images/homepage.png")'; // Your icon
    icon.style.width = '60px';
    icon.style.height = '60px';
    icon.style.backgroundSize = 'cover';

    // Center the icon inside the circle
    wrapper.appendChild(icon);
    return wrapper;
}

