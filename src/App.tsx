import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet";
import "./styles.css";
import { useState, useEffect } from "react";
import { DataBCShapes } from "./DataBCShapes";
import { FeatureCollection } from "@turf/turf";
import { TurfGeos } from "./TurfGeos";


export default function App() {
  const [DataBCGeos, setDataBCGeos] = useState(null)


  // search boundaries are blue - data filtered by databc is green, and red is filtered by turf.
  // featureCollection.features[0] = shape we send to databc
  // featureCollection.features[1] = smaller shape we test for intersect with turf
  const featureCollection: FeatureCollection = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -128.95751953125,
                48.45835188280866
              ],
              [
                -122.05810546875,
                48.45835188280866
              ],
              [
                -122.05810546875,
                51.16556659836182
              ],
              [
                -128.95751953125,
                51.16556659836182
              ],
              [
                -128.95751953125,
                48.45835188280866
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -125.33203125,
                48.96579381461063
              ],
              [
                -122.93701171874999,
                48.96579381461063
              ],
              [
                -122.93701171874999,
                50.387507803003146
              ],
              [
                -125.33203125,
                50.387507803003146
              ],
              [
                -125.33203125,
                48.96579381461063
              ]
            ]
          ]
        }
      }
    ]
  }



  return (
    <MapContainer
      id="map"
      center={[55, -122]}
      zoom={5}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <ZoomControl position="bottomleft" />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/*featureCollection && <GeoJSON data={featureCollection} key={Math.random()} />*/}
      {/*featureCollection && <DataBCShapes layerName={'WHSE_WATER_MANAGEMENT.WLS_WATER_RESERVES_POLY'} geometry={featureCollection.features[0]} shapeSetterCallback={setDataBCGeos}/>*/}
      {/*featureCollection && DataBCGeos &&  <TurfGeos data={DataBCGeos} filterGeo={featureCollection.features[1]}/>*/}
    </MapContainer>
  );
}
