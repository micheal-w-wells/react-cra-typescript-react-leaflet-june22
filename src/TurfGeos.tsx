import { useEffect, useState } from "react"
import * as booleanIntersects from "@turf/boolean-intersects"
import { Feature, FeatureCollection } from "@turf/turf"
import { GeoJSON } from "react-leaflet"

export const TurfGeos = (props: any) => {
    const [filteredGeos, setFilteredGeos] = useState<FeatureCollection>()

    useEffect(()=> {
        if(props.data && props.filterGeo)
        {
            const filteredGeos: Feature[] = props.data.features.filter((feature: any) => 
                { return  booleanIntersects.default(feature, props.filterGeo)}
            )
            let featureCollection: FeatureCollection = {
                "type": "FeatureCollection",
                "features": []
            }
            const returnVal = {...featureCollection, features: [...filteredGeos]}
            console.dir(returnVal)

            setFilteredGeos(returnVal)
        }

    },[])

    return filteredGeos? <GeoJSON data={filteredGeos} style={{color: 'red', fillColor: 'red'}} key={Math.random()}/> : <></>

}