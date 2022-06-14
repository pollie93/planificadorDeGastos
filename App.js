import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import {generarId} from './src/helpers';

/* Recordar en el return renderizo mi componente que estoy extrayendo del Header*/

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  // ALMACENAMIENTO LLAVE - VALOR ('LLAVE', VALOR)
  // sistema de almacenamiento disponible en forma global
  // permite extraer datos en cualquier lugar, guardando en un componente y extraerlo en otro componente
  // extraigo nombre
  // no se pueden almacenar arreglos o numeros
  // Si hay que almacenar algo grande, es conveniente guardarlo, antes de nombre c JSON.stringify
  // El presupuesto se guarda, cuando es valido

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem('planificador_presupuesto')) ?? 0;

        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestoStorage();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos');

        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          'planificador_gastos',
          JSON.stringify(gastos),
        );
      } catch (error) {
        console.log(error);
      }
    };
    guardarGastosStorage();
  }, [gastos]);

  //aca estoy validando que el presupuesto sea valido, esto es cuando isValidPresupuesto es true
  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor', 'Ok');
    }
  };

  const handleGasto = gasto => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    //if (Object.values(gasto).includes('')) valido objeto completo
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastosActualizados);
    } else {
      // Añadir el nuevo gasto al state//
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };

  const eliminarGasto = id => {
    Alert.alert(
      'Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'Cancel'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(
              gastoState => gastoState.id !== id,
            );

            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ],
    );
  };

  const resetearApp = () => {
    Alert.alert(
      'Deseas resetear la app?',
      'Esrto eliminará presupuesto y gastos',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Sí, Eliminar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();

              setIsValidPresupuesto(false);
              setPresupuesto(0);
              setGastos([]);
            } catch (error) {}
          },
        },
      ],
    );
  };

  // else { /*1ero titulo, 2do mensaje, 3ero boton */
  //     Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor', 'OK')
  /*handleNuevoPresupuesto toma un presupuesto, es mi funcion*/
  console.log('gastos', gastos);
  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              presupuesto={
                presupuesto
              } /*aca le estoy pasando el valor de presupuesto */
              gastos={gastos}
              resetearApp={resetearApp}
            />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;

/* backgroundColor: '#F5F5F5',este es color gris claro */
/* flex: 1 p/que crezca todo verticalmente*/
