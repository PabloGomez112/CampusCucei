import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { globalColor } from "../GlobalStyles";
import MapIndicator from "../Components/Map/MapIndicator";
import DisplayBuilding from "../Components/Map/DisplayBuilding";
import { supabase } from "../API/SupabaseClient";

export default function Map() {
  const imagen_mapa = require("../Images/mapa_2024.png");
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDescription, setDisplayDescription] = useState("");
  const [imageUri, setImageUri] = useState(
    "https://rdzcehyrtjjdrssoifrg.supabase.co/storage/v1/object/public/cucei-buildings-photos/IMG_5718.JPEG"
  );
  const [infoDisplayerVisible, setInfoDisplayerVisibility] = useState(false);

  async function updateDisplay(id) {

    try {
      const { data: photoData, error: error } = await supabase
        .from("buildings_photos")
        .select("photo_uri")
        .eq("id_building", id)
        .single();
      const { data: buildingData, error: errorBuilding } = await supabase
        .from("building")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      } else if (errorBuilding) {
        throw errorBuilding;
      } else {
        if (photoData) {
          setImageUri(photoData.photo_uri);
        } else {
          setImageUri("");
        }

        if (buildingData) {
          setDisplayTitle(buildingData.name);
          setDisplayDescription(buildingData.description);
        } else {
          setDisplayTitle("");
          setDisplayDescription("");
        }

        setInfoDisplayerVisibility(true);
      }
    } catch (error) {
      console.log("Error: ", error);
      setInfoDisplayerVisibility(false);
    } finally {
    }
  }

  function hideInfoDisplayer() {
    setInfoDisplayerVisibility(false);
  }

  return (
      <View style={[styles.mainContainer]}>
        {infoDisplayerVisible && (
          <DisplayBuilding
            title={displayTitle}
            description={displayDescription}
            imgUri={imageUri}
            hideCallback={hideInfoDisplayer}
            
          />
        )}

        <Image source={imagen_mapa} />
        

        <MapIndicator
          leftPadding={425}
          onPressCallback={() => updateDisplay(1)}
        />
        <MapIndicator
          leftPadding={250}
          upPadding={150}
          onPressCallback={() => updateDisplay(4)}
        />
        <MapIndicator
          leftPadding={70}
          upPadding={180}
          onPressCallback={() => updateDisplay(6)}
        />
        <MapIndicator
          leftPadding={-60}
          upPadding={210}
          onPressCallback={() => updateDisplay(9)}
        />
        <MapIndicator
          leftPadding={10}
          upPadding={180}
          onPressCallback={() => updateDisplay(31)}
        />
        
        <MapIndicator
          leftPadding={2}
          upPadding={100}
          onPressCallback={() => updateDisplay(14)}
        />

        <MapIndicator
          leftPadding={-60}
          upPadding={90}
          onPressCallback={() => updateDisplay(13)}
        />


        <MapIndicator
          leftPadding={-90}
          upPadding={160}
          onPressCallback={() => updateDisplay(10)}
        />

        <MapIndicator
          leftPadding={-10}
          upPadding={240}
          onPressCallback={() => updateDisplay(7)}
        />

        <MapIndicator
          leftPadding={-90}
          upPadding={290}
          onPressCallback={() => updateDisplay(8)}
        />

        <MapIndicator
          leftPadding={-130}
          upPadding={170}
          onPressCallback={() => updateDisplay(11)}
        />


        <MapIndicator
          leftPadding={-170}
          upPadding={170}
          onPressCallback={() => updateDisplay(12)}
        />


        
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalColor.background,
    transform: [{ rotate: "90deg"}, { scale: 0.5}],
  },
});
