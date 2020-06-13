import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function AudioItem({ audio, onPlayAudio, onShareAudio }) {
  const { title, path } = audio.item;

  const onPlayPress = () => {
    onPlayAudio(path, title);
  };

  const onSharePress = () => {
    onShareAudio(path, title);
  };

  return (
    <View style={styles.audioRow}>
      <Button
        onPress={onPlayPress}
        onLongPress={onSharePress}
        title={title}
        buttonStyle={styles.buttonStyle}
        titleStyle={{ color: '#252a34' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  audioRow: {
    backgroundColor: '#08d9d6',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginRight: 10,
    marginVertical: 10,
    paddingVertical: 10,
  },
  audioText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
  },
});
