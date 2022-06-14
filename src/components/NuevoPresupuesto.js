import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

import globalStyles from '../styles';

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  handleNuevoPresupuesto,
}) => {
  // para ver errores con Astorage, se puede utilizar Try Catch
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir presupuesto</Text>

      <TextInput
        keyboardType="numeric" /* esto es prop, solo permite escribir numeros*/
        placeholder="Agrega tu presupuesto:
                Ej. 300" /*en el placeholder escribo un ejemplo de lo que iria en el input*/
        style={styles.input}
        value={presupuesto.toString()} /*convierte el valor en string, el cual no va a mutar el arreglo original, mateniendo el valor de presupuesto */
        /*en presupeusto guardo lo que el usuario escribe*/
        /*Para leer lo que voy colcoando*/
        onChangeText={
          setPresupuesto
        } /*es una prop, en el cual voy a guardar el valor que tenga de presupuesto, de esta manera ya lo va leyendo*/
        /*se le pasa una funcion para guardar en un lado lo que voy escribiendo*/
      />

      <Pressable
        style={styles.boton}
        onPress={() => handleNuevoPresupuesto(presupuesto)}>
        <Text style={styles.botonTexto}>Agregar presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NuevoPresupuesto;

/*marginHorizontal: es un margen a izq y derecha */
