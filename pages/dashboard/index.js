import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'

import Constants from 'expo-constants';

import AudioItem from '../components/AudioItem';

import audios from '../../server/audios';

export default function Dashboard() {
  const [error, setError] = useState(null);
  const [fileNamed, setFiledNamed] = useState('');

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  });

  const playSound = async (passedFile) => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });
    const soundObject = new Audio.Sound();
    try {
      const file = await FileSystem.downloadAsync(
        passedFile,
        FileSystem.documentDirectory  + 'audio.mp3'
      );
      await soundObject.loadAsync({
        uri: file.uri
      });
      await soundObject.setVolumeAsync();
      await soundObject.setStatusAsync({
        volume: 1.0,
      });
      await soundObject.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  onShare = async (passedFile) => {
    try {
      debugger
      const myFile = await FileSystem.downloadAsync(
        passedFile,
        FileSystem.documentDirectory  + 'audio.mp3'
      )
      debugger
      await Sharing.shareAsync(myFile.uri, {
        dialogTitle: 'Compartir audio del poder',
        mimeType: 'audio/mpeg',
        UTI: 'audio/mpeg',
      });
    } catch (error) {
      console.log('error aca', error.message);
      setFiledNamed(file.localUri);
      setError(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {error && <Text>{error.message}</Text>}
        {error && <Text>{fileNamed}</Text>}
        {audios.map((audio) => (
          <AudioItem
            key={audio.title}
            audio={audio}
            onPlayAudio={playSound}
            onShareAudio={onShare}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  audioView: {
    borderColor: '#000',
    borderStyle: 'solid',
    alignItems: 'center',
    borderWidth: 1,
  },
});
