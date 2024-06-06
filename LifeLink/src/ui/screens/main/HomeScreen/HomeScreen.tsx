import React, {useState} from 'react';
import {Modal, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
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
      url: 'https://fastly.picsum.photos/id/821/200/300.jpg?hmac=-CLZlHMcIt8hXlUFZ4-3AvLYDsUJSwUeTri-zHDlnoA',
    },
    {
      id: '2',
      type: 'image',
      url: 'https://fastly.picsum.photos/id/98/200/300.jpg?hmac=b1gHu5QkH33ZHWHl0HPyu_uftF3gRbFhu0l6v88RrZA',
    },
    {
      id: '3',
      type: 'image',
      url: 'https://fastly.picsum.photos/id/96/200/300.jpg?hmac=q257RPq4_aD8wno1Mkb4eP37WQzxDcNNLPu_HBwKdag',
    },
    {
      id: '4',
      type: 'image',
      url: 'https://fastly.picsum.photos/id/96/200/300.jpg?hmac=q257RPq4_aD8wno1Mkb4eP37WQzxDcNNLPu_HBwKdag',
    },
    {
      id: '5',
      type: 'image',
      url: 'https://fastly.picsum.photos/id/96/200/300.jpg?hmac=q257RPq4_aD8wno1Mkb4eP37WQzxDcNNLPu_HBwKdag',
    },
    {
      id: '6',
      type: 'image',
      url: 'https://fastly.picsum.photos/id/96/200/300.jpg?hmac=q257RPq4_aD8wno1Mkb4eP37WQzxDcNNLPu_HBwKdag',
    },
    {
      id: '7',
      type: 'image',
      url: 'https://fastly.picsum.photos/id/96/200/300.jpg?hmac=q257RPq4_aD8wno1Mkb4eP37WQzxDcNNLPu_HBwKdag',
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
      <SubHeader value="news" />
      <SubHeader value="news" />
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
