require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
})

const addPosts = async (payload) => {
    const SQLquery = {
      text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [payload.titulo, payload.url, payload.descripcion, payload.likes,]
    }
    try {const result = await pool.query(SQLquery)
      return result.rows
    } catch (e) {
      throw new Error(e)
    }
  }

  const getPosts = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts")
        console.log(rows)
        return rows
    } catch (e) {
        console.log(e)
        console.log('error al cargar los datos de la tabla posts: ', e.code, e.message)
        throw new Error(e)
    }}

    const duplicatePost = async (payload) => {
        const SQLquery = {
          text: 'SELECT COUNT(*) as NUM FROM posts WHERE titulo=$1 AND img=$2 AND descripcion=$3',
          values: [payload.titulo, payload.url, payload.descripcion],
        }
        const { rows } = await pool.query(SQLquery)
        return rows
      } 
      
      module.exports = { addPosts, getPosts, duplicatePost }