// Configuración de PayPal
// Reemplazar estos valores con sus credenciales reales de PayPal
const paypalConfig = {
  // Para desarrollo (sandbox)
  sandbox: {
    clientId: "Aa5YbEwY3hb6ctMSyCXNCP_wmS12tPodowOrmuqkESpxQWN3pk6IgqbAvN7fnVUPfraDv4uU-EpFpphn",
    // Deje este campo en blanco si no tiene un token de cliente
    dataClientToken: ""
  },
  // Para producción
  production: {
    clientId: "",
    // Deje este campo en blanco si no tiene un token de cliente
    dataClientToken: ""
  },
  // Cambie a 'production' cuando esté listo para ir a producción
  environment: "sandbox"
};

export default paypalConfig;
