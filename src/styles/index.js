const globalStyles = {
    contenedor: {
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 40,
        paddingHorizontal: 20,
        transform: [{ translateY: 50 }],
         shadowColor: "#000",
         shadowOffset: {
             width: 0,
             height: 2,
         },
/* transform: [{ translateY: 50 }] es una sintaxis de objeto, y como el transform soporta multiples transformaciones, termina siendo un array*/
/*esta propiedad permite que me quede encimado */
/* Lo mueve 50px de su Xo original para abajo y mantiene los 50px hacia arriba*/
         shadowOpacity: 0.23,
         shadowRadius: 2.62,
         elevation: 4,
    }   
}

export default globalStyles