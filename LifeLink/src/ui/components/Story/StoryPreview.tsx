import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../../constants/colors';

export type StoryItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
};

type StoryPreviewProps = {
  stories: StoryItem[];
  onStoryPress: (index: number) => void;
};

const StoryPreview: React.FC<StoryPreviewProps> = ({stories, onStoryPress}) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={false}
      style={styles.scrollView}
      alwaysBounceVertical={false}>
      {stories.map((story, index) => (
        <TouchableOpacity
          key={story.id}
          onPress={() => onStoryPress(index)}
          style={styles.circle}>
          <Image source={{uri: story.url}} style={styles.image} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollView: {
    marginHorizontal: -20,
  },
});

export default StoryPreview;
