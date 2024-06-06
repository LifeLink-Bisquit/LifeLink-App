import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

type StoryItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
};

type StoryViewerProps = {
  stories: StoryItem[];
  initialIndex: number;
  onClose: () => void;
};

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<Swiper>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleIndexChanged = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handleStoryPress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (currentIndex < stories.length - 1) {
      swiperRef.current?.scrollBy(1);
    } else {
      onClose();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleStoryPress}>
      <Swiper
        ref={swiperRef}
        loop={false}
        index={currentIndex}
        onIndexChanged={handleIndexChanged}
        showsPagination={false}>
        {stories.map(story => (
          <View key={story.id} style={styles.storyContainer}>
            <Image source={{uri: story.url}} style={styles.image} />
          </View>
        ))}
      </Swiper>
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <ProgressBar
            key={index}
            progress={
              currentIndex === index ? progress : currentIndex > index ? 1 : 0
            }
            color="#fff"
            style={styles.progressBar}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  video: {
    width,
    height,
  },
  progressContainer: {
    position: 'absolute',
    top: 40,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  progressBar: {
    flex: 1,
    height: 2,
    marginHorizontal: 2,
  },
});

export default StoryViewer;
