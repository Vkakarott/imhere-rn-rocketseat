import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import Participant from "@/src/components/Participant";

export default function Home() {
  const participants = ["Lula", "Bolsonaro", "Ciro Gomes", "Marina Silva", "João Amoêdo", "Dilma Rousseff", "José Serra", "Luciano Huck", "Michel Temer"];

  function handleParticipantAdd(name: string) {
    if (participants.includes(name)) {
      return Alert.alert("Participante existe", "Esse participante já foi adicionado ao evento.");
    }
  }

  function handleParticipantRemove(name: string ) {
    return Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => Alert.alert("Deletado!")
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
          placeholder="Nome do participante" placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd("Lula")}>
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