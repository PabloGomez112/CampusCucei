import Carousel from 'react-native-reanimated-carousel';
import { View, Text, Dimensions, Image } from 'react-native';
import { useActionState, useRef } from 'react';
import {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from 'react-native-reanimated';


const windowWidth = Dimensions.get('window').width;


function MyCarousel({data}) {


  const progress = useSharedValue(0);


  const onPressPagination = (index) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Carousel
        width={windowWidth + 330}
        height={windowWidth} // Adjust height as needed
        data={data}
        onProgressChange={progress}
        renderItem={({ index }) => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 100, 
            }}
          >
            <Image style={{height: 600, width: 750}}source={{uri: data[index]}}></Image>
          </View>

        )}
      />

        <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />

    </View>
  );
}

export default MyCarousel;