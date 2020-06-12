import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AudioItem({ audio, onPlayAudio, onShareAudio }) {
  const { title, path } = audio;

  const onPlayPress = () => {
    onPlayAudio(path);
  };

  const onSharePress = () => {
    onShareAudio(path);
  };

  return (
    <View style={styles.audioRow}>
      <Text style={styles.audioText} key={title}>
        {title}
      </Text>
      <Button
        onPress={onPlayPress}
        style={styles.actionButton}
        icon={<Icon name="play" size={15} color="white" />}
      />
      <Button
        onPress={onSharePress}
        style={styles.actionButton}
        buttonStyle={{ backgroundColor: '#2D7D14' }}
        icon={<Icon iconContainerStyle={styles.shareButton} name="share" size={15} color="white" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  audioRow: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'flex-start',
  },
  audioText: {
    fontSize: 20,
  },
  actionButton: {
    marginLeft: 10,
  },
});
