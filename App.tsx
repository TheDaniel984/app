import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<ApiResponse>(
        "https://rickandmortyapi.com/api/character",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log(response.data);
      setCharacters(response.data.results);
      
    } catch (err) {
      console.log(err);
      setError("Erro ao carregar personagens");
    } finally {
      setLoading(false);
    }
  }

  const renderCharacter = ({ item }: { item: Character }) => (
    <View style={styles.characterCard}>
      <Image source={{ uri: item.image }} style={styles.characterImage} />
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterDetails}>
          {item.species} - {item.status}
        </Text>
        <Text style={styles.characterLocation}>
          Localização: {item.location.name}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando personagens...</Text>
        <StatusBar style='auto' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <StatusBar style='auto' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personagens de Rick and Morty</Text>
      
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
      
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  list: {
    width: '100%',
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  characterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  characterDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  characterLocation: {
    fontSize: 12,
    color: '#888',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});