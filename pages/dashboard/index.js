import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import AudioItem from '../components/AudioItem';
import SearchInput from '../components/SearchInput';

export default function Dashboard() {
  const [error, setError] = useState(null);
  const [fileNamed, setFiledNamed] = useState('');
  const [audios, setAudios] = useState([]);
  const [filteredAudios, setFilteredAudios] = useState([]);

  useEffect(() => {
    fetchAudios();
  }, []);

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });

  const fetchAudios = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/jcerrutti/botonera-rn/master/audios.json'
    );
    const json = await response.json();
    const { audios } = json;
    setAudios(audios);
  };

  const downloadFile = async (passedFile, title) => {
    try {
      console.log(passedFile);
      const fileTitle = title.replace(/\s/g, '');
      const file = await FileSystem.downloadAsync(
        passedFile,
        FileSystem.documentDirectory + `${fileTitle}.mp3`
      );
      return file;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const playSound = async (passedFile, title) => {
    const soundObject = new Audio.Sound();
    try {
      const file = await downloadFile(passedFile, title);
      await soundObject.loadAsync({
        uri: file.uri,
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

  onShare = async (passedFile, title) => {
    try {
      const file = await downloadFile(passedFile, title);
      await Sharing.shareAsync(file.uri, {
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

  onSearchHandler = (input) => {
    if (input.length > 0) {
      const filteredAudios = audios.filter(({ title }) =>
        title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredAudios(filteredAudios);
    } else {
      setFilteredAudios([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {error && <Text>{error.message}</Text>}
      {error && <Text>{fileNamed}</Text>}
      <SearchInput onSearch={onSearchHandler} />
      <FlatList
        contentContainerStyle={styles.flatList}
        data={filteredAudios.length ? filteredAudios : audios}
        numColumns={2}
        key={2}
        renderItem={(audio) => (
          <AudioItem audio={audio} onPlayAudio={playSound} onShareAudio={onShare} />
        )}
        keyExtractor={(audio) => audio.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  flatList: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
