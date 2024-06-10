import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet} from 'react-native';
import {getLast5EarthQuakes} from '../../../../services/kandilli_api/getLast5';
import EarthquakeDetails from '../../../components/EarthquakeDetails/EarthquakeDeatils';
import Screen from '../../../components/Screen/Screen';
import Spacer from '../../../components/Spacer/Spacer';
import StoryPreview, {StoryItem} from '../../../components/Story/StoryPreview';
import StoryViewer from '../../../components/Story/StoryViewer';
import SubHeader from '../../../components/SubHeader/SubHeader';

const HomeScreen = () => {
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const stories: StoryItem[] = [
    {
      id: '1',
      type: 'image',
      url: 'https://cdn1.ntv.com.tr/gorsel/WOGIXTo1zk6fNLC35ivK3g.jpg?width=1000&mode=crop&scale=both',
    },
    {
      id: '2',
      type: 'image',
      url: 'https://cdn1.ntv.com.tr/gorsel/-wkMF_KU0USMQLiuginGKg.jpg?width=1000&mode=crop&scale=both',
    },
    {
      id: '3',
      type: 'image',
      url: 'https://www.odemis.bel.tr/images/genel/deprem03.jpg',
    },
    {
      id: '4',
      type: 'image',
      url: 'https://sakarya.afad.gov.tr/kurumlar/sakarya.afad/40448/pics/Afett.600px.jpg',
    },
    {
      id: '5',
      type: 'image',
      url: 'https://lh4.googleusercontent.com/proxy/EJjjNkKgsA9HlOP1uXNMSSGM2Z72Ts51jmGLhpp_KaCWks5vZk5-yeCp7jaPSwAjWJVYvt51WY-xINS4uxrFIA3cXiXzv5wA11-n6lCBfgjT9AOTJ_Zo6LN0znvkEqC3utSRsyQjOnrK077vjMBkOCA',
    },
  ];

  const handleStoryPress = (index: number) => {
    setSelectedStoryIndex(index);
    setShowStoryViewer(true);
  };

  return (
    <Screen containerStyle={styles.container} useScrollView useSafeArea={false}>
      <Spacer height={20} />
      <SubHeader value="needToKnow" />
      <StoryPreview stories={stories} onStoryPress={handleStoryPress} />

      <SubHeader value="last5earthquakes" />
      <Spacer height={10} />
      <EarthquakeDetails />
      <Modal
        visible={showStoryViewer}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStoryViewer(false)}>
        <StoryViewer
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={() => setShowStoryViewer(false)}
        />
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
