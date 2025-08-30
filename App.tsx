import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEvent } from 'expo';

  interface Joke{
    categories?: string
    created_at?: string
    icon_url?: string
    id?: number
    updated_at?: string
    url?: string
    value?: string
  }

export default function App() {
  const [Joke, setJoke] = useState<Joke>({})

  useEffect(() =>{
    getJoke();
  },[]);

  async function getJoke() {
    try{
      const response = await axios.get<Joke>(
        "https://api.chucknorris.io/jokes/random",
        {
          headers:{
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setJoke(response.data);

      
      } catch (erro){
        console.log(erro);
      }
    }


    return(
      <View style={styles.container}>
      <text>a piada do dia é:{Joke.value ?? "carregando..."}</text>
      <StatusBar style='auto'></StatusBar>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
