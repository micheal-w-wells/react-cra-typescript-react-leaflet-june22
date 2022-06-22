// Mike Wells - getting GeoJSON from DataBC:

import proj4 from 'proj4';
import { useEffect, useState } from 'react';
import reproject from 'reproject';
const { stringify } = require('wkt');
import { GeoJSON } from "react-leaflet";
import  axios  from 'axios';
// Water reserves layer:
//https://catalogue.data.gov.bc.ca/dataset/water-reserve-polygons/resource/5d5d2979-6201-4990-87fa-3c7ac81d9144


// get capabilities request: https://openmaps.gov.bc.ca/geo/pub/WHSE_WATER_MANAGEMENT.WLS_WATER_RESERVES_POLY/ows?service=WMS&request=GetCapabilities
//

proj4.defs(
    'EPSG:3005',
    '+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs'
  );

const wktConvert = (input: any) => {
    return stringify(input);
};

const albersToGeog = (featureCollection: any) => {
    try {
      const reprojected = reproject.reproject(featureCollection, proj4('EPSG:3005'), proj4.WGS84);
      return reprojected;
    } catch (e) {
      console.log('error converting back to geog from albers:');
      console.log(JSON.stringify(e));
      console.log(e);
    }
  };

export const buildURLForDataBC = (
    layerName: string,
    geoJSON: Object,
    dataBCAcceptsGeometry: boolean,
    pageSize?: number,
    startIndex?: number
  ) => {
      try
      {

    let baseURL =
      'https://openmaps.gov.bc.ca/geo/pub/wfs?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&outputFormat=json&typeName=pub:';
    const paging = '&startindex=' + startIndex + '&count=' + pageSize;
    const projection = '&SRSNAME=EPSG:3005';

    const reprojected = reproject.reproject(geoJSON, proj4.WGS84, proj4('EPSG:3005'));
    //console.dir(reprojected)
    const reprojectedAsWKT = wktConvert(reprojected);
    const customCQL = '&CQL_FILTER=WITHIN(GEOMETRY,' + reprojectedAsWKT + ')';
    const encodedCQL = dataBCAcceptsGeometry ? encodeURI(customCQL) : '';
    return baseURL + layerName + paging + projection + encodedCQL;
      }
      catch(e)
      {
          console.log('Unable to build URL')
          console.dir(e)
      }
      return ''
  };




  const getGeoJSON = async (layerName: string, intersectingGeo: Object) => 
  {
      try {

    const url = buildURLForDataBC(layerName, intersectingGeo, true)
    const response = await axios.get(url)
    console.log('response')
    console.dir(response)
    const returnVal = albersToGeog(response.data)
    return returnVal;
      }
      catch(e)
      {
          console.log('error gettting geojson')
          console.dir(e)
      }
  }



  export const DataBCShapes = (props: any) => {

    const [intersectingShapes, setIntersectingShapes] = useState(null)

    useEffect(()=> {
        if(props.geometry)
        {
            getGeoJSON(props.layerName, props.geometry).then((returnVal) => { 
                setIntersectingShapes(returnVal)
                if(props.shapeSetterCallback)
                {
                    props.shapeSetterCallback(returnVal)
                }
            })
        }
    },[])

    return intersectingShapes? <GeoJSON data={intersectingShapes} style={{color: 'green'}} key={Math.random()}/> : <></>
  }
