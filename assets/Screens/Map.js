import { StyleSheet, View, Image} from "react-native";
import React, { useRef, useState } from "react";
import { globalColor } from "../GlobalStyles";
import MapIndicator from "../Components/Map/MapIndicator";
import DisplayBuilding from "../Components/Map/DisplayBuilding";
import { supabase } from "../API/SupabaseClient";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated";

export default function Map() {
  const imagen_mapa = require("../Images/mapa_2024.png");
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDescription, setDisplayDescription] = useState("");
  const [imageUri, setImageUri] = useState(
    "https://rdzcehyrtjjdrssoifrg.supabase.co/storage/v1/object/public/cucei-buildings-photos/IMG_5718.JPEG"
  );
  const [infoDisplayerVisible, setInfoDisplayerVisibility] = useState(false);


  const zoomValue = useSharedValue(0.5)
  const mapXCenter = useRef(0)
  const mapYCenter = useRef(0)
  const focalX = useSharedValue(0)
  const focalY = useSharedValue(0)

  const pinchZoom = Gesture.Pinch().onUpdate((e) => 
  {
    zoomValue.value = e.scale
  })

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [{scale: zoomValue.value}]
  }))

  async function updateDisplay(id) {

    try {
      const { data: photoData, error: error } = await supabase
        .from("buildings_photos")
        .select("photo_uri")
        .eq("id_building", id);

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
          setImageUri(photoData.map(item => item.photo_uri));
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
    <GestureHandlerRootView style={{flex: 1, transform: [{rotate: '90deg'}]}}>
    <View style={{ zIndex: 100}}>
            {infoDisplayerVisible && (
    <View style={{transform: [{scale: 0.52}], top: 260}}>
      <DisplayBuilding
        title={displayTitle}
        description={displayDescription}
        imgUri={imageUri}
        hideCallback={hideInfoDisplayer}
      />
    </View>)}
    </View>

      <GestureDetector gesture={pinchZoom}>
      <Animated.View style={[styles.mainContainer, zoomStyle]}>
        
        <Image source={imagen_mapa} onLayout={(event) => {
          const {width, height} = event.nativeEvent.layout;
          mapXCenter.value = width / 2
          mapYCenter.value = height / 2
        }}/>
        

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

        <MapIndicator
          leftPadding={-220}
          upPadding={180}
          onPressCallback={() => updateDisplay(17)}
        />

        <MapIndicator
          leftPadding={-260}
          upPadding={170}
          onPressCallback={() => updateDisplay(18)}
        />


        <MapIndicator
          leftPadding={-300}
          upPadding={160}
          onPressCallback={() => updateDisplay(19)}
        />

        <MapIndicator
          leftPadding={-310}
          upPadding={120}
          onPressCallback={() => updateDisplay(20)}
        />



        <MapIndicator
          leftPadding={-340}
          upPadding={100}
          onPressCallback={() => updateDisplay(21)}
        />

        <MapIndicator
          leftPadding={-385}
          upPadding={210}
          onPressCallback={() => updateDisplay(33)}
        />


        <MapIndicator
          leftPadding={-430}
          upPadding={200}
          onPressCallback={() => updateDisplay(22)}
        />

        <MapIndicator
          leftPadding={-335}
          upPadding={260}
          onPressCallback={() => updateDisplay(23)}
        />


        <MapIndicator
          leftPadding={-380}
          upPadding={330}
          onPressCallback={() => updateDisplay(25)}
        />


        <MapIndicator
          leftPadding={-390}
          upPadding={270}
          onPressCallback={() => updateDisplay(26)}
        />


        <MapIndicator
          leftPadding={-230}
          upPadding={50}
          onPressCallback={() => updateDisplay(34)}
        />


        <MapIndicator
          leftPadding={-200}
          upPadding={70}
          onPressCallback={() => updateDisplay(28)}
        />



        <MapIndicator
          leftPadding={-140}
          upPadding={100}
          onPressCallback={() => updateDisplay(32)}
        />


        <MapIndicator
          leftPadding={-180}
          upPadding={100}
          onPressCallback={() => updateDisplay(35)}
        />


        <MapIndicator
          leftPadding={-140}
          upPadding={50}
          onPressCallback={() => updateDisplay(29)}
        />


        <MapIndicator
          leftPadding={-170}
          upPadding={20}
          onPressCallback={() => updateDisplay(36)}
        />



        <MapIndicator
          leftPadding={330}
          upPadding={150}
          onPressCallback={() => updateDisplay(5)}
        />

        

        <MapIndicator
          leftPadding={390}
          upPadding={150}
          onPressCallback={() => updateDisplay(3)}
        />




        
      </Animated.View>
      </GestureDetector>



      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalColor.background,
    transform: [{scale: 0.5}],
  },
});
