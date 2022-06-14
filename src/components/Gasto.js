import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import globalStyles from '../styles';
import {formatearCantidad, formatearFecha} from '../helpers';

const diccionarioIconos = {
  ahorro: require('../img/icono_ahorro.png'),
  casa: require('../img/icono_casa.png'),
  comida: require('../img/icono_comida.png'),
  gastos: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
};

// En diccionarioIconos, yo tengo un objeto y para acceder a dichas propiedades coloco []
/* mi diccionarioIconos es un objeto */
/* al estar mapeados el require aplica automáticamente */
/* para acceder a las propiedades de un objeto lo colcoamos entre [] */

const Gasto = ({gasto, setModal, setGasto}) => {
  const {nombre, categoria, cantidad, fecha} = gasto;

  const handleAcciones = () => {
    setModal(true);
    setGasto(gasto);
  };

  return (
    <Pressable onLongPress={handleAcciones}>
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          <View style={styles.contenedorImagen}>
            <Image
              style={styles.imagen}
              source={diccionarioIconos[categoria]}
            />
            <View style={styles.contenedorTexto}>
              <Text style={styles.categoria}>{categoria}</Text>
              <Text style={styles.nombre}>{nombre}</Text>
              <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
            </View>
          </View>
          <Text style={styles.cantidad}>{formatearCantidad(cantidad)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent:
      'space-between' /*agrupa uno del lado izq y otro del derecho*/,
    alignItems: 'center',
  },
  contenedorImagen: {
    flexDirection: 'row' /*de izq a derecha */,
    alignItems: 'center',
    flex: 1,
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  contenedorTexto: {
    flex: 1,
  },
  categoria: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  nombre: {
    fontSize: 22,
    color: '#64748B',
    marginBottom: 5,
  },
  cantidad: {
    fontWeight: 20,
    fontWeight: '700',
  },
  fecha: {
    fontWeight: '700',
    color: '#DB2777',
  },
});

export default Gasto;

/* c/elemento tiene display de flex y flex direction column, para cambiar colocar flexdirection row, para cambiar */
/*se usa alingitem para centrar vetricalmente*/