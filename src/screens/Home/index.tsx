import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import Participant from "@/src/components/Participant";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Esse participante já foi adicionado ao evento.");
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string ) {
    return Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      }, 
      {
        text: "Cancelar",
        style: "cancel"
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>
      <Text style={styles.eventDate}>
        Data do evento
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do participante" 
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Participant 
            key={item}
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>
            Ninguem chegou no evento ainda? Adicione participantes!
          </Text>
        )}
      />     
    </View>
  );
}