import { openDatabaseSync } from 'expo-sqlite';

// Abrir la base de datos de forma síncrona
const db = openDatabaseSync('users.db');

// Crear la tabla si no existe
export const setupDatabase = async () => {
  try {
    console.log("Configurando base de datos...");

    await db.execAsync(`PRAGMA journal_mode = WAL;`);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        dni TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    console.log('Tabla creada correctamente');
  } catch (error) {
    console.log('Error creando la tabla:', error);
  }
};

// Verificar si hay usuarios en la base de datos
export const checkUsers = async () => {
  try {
    const users = await db.getAllAsync(`SELECT * FROM users;`);
    console.log('Usuarios en la base de datos:', users);
  } catch (error) {
    console.log('Error consultando usuarios:', error);
  }
};

// Insertar un usuario de prueba si no existe
export const insertTestUser = async () => {
  try {
    console.log("Intentando insertar usuario de prueba...");

    await db.runAsync(
      `INSERT OR IGNORE INTO users (nombres, apellidos, dni, email, password)
       VALUES (?, ?, ?, ?, ?);`,
      ['Juan', 'Perez', '12345678', 'admin', 'admin']
    );

    console.log('Usuario de prueba insertado');
    await checkUsers(); // Verifica si el usuario se insertó
  } catch (error) {
    console.log('Error insertando usuario:', error);
  }
};

// Verificar credenciales de usuario
export const validateUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Faltan campos');
  }
  
  try {
    console.log("Validando usuario con email:", email);
    
    const user = await db.getFirstAsync(
      `SELECT * FROM users WHERE email = ? AND password = ?;`,
      [email, password]
    );

    return user ? true : false;
  } catch (error) {
    console.log('Error en la validación:', error);
    throw new Error('Error en la base de datos');
  }
};

// Llamar las funciones al iniciar la app
(async () => {
  await setupDatabase();
  await insertTestUser();
})();
