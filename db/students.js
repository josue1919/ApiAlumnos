const db = require("../tools/postgre");
//clase para las consultas



class Student {

  //traer todos los alumnos de manera decendente
  async getAll() {
    try {
      const students = await db.query("Select * from student ORDER BY student_id DESC");
      return students.rows;
    } catch (e) {
      throw e;
    }
  }

  //seleccionar un solo alumno

  async getOne(student_id) {
    try {
      const studentsById = await db.query(
        "Select * from student WHERE student_id = $1",
        [student_id]
      );

      return studentsById.rows;
    } catch (e) {
      throw e;
    }
  }

  //metodo para insertar
  async addStudent(nombre, grade, grupo, email) {
    try {
      const addNewStudent = await db.query(
        "insert into student (student_id,name,grade,grupo,email) Values ((SELECT CONCAT(CONCAT((SELECT SUBSTRING((SELECT EXTRACT(YEAR FROM NOW()))::TEXT, 3)),  (SELECT (SELECT EXTRACT(MONTH FROM NOW()))::TEXT)),	(SELECT REPEAT('0', 4 - (LENGTH((SELECT COUNT(*) + 1 FROM student)::TEXT)::INTEGER))),(SELECT COUNT(*) + 1 FROM student))),$1,$2,$3,$4)",
        [nombre, grade, grupo, email]
      );
      return addNewStudent.rows;
    } catch (e) {
      throw e;
    }
  }

  //metodo para eliminar
  async deleStuden(student_id) {
    try {
      const deleteStudents = await db.query(
        "delete from student WHERE student_id=$1",
        [student_id]
      );
      return deleteStudents.rows;
    } catch (e) {
      throw e;
    }
  }

  //metodo para actualizar
  async updateStudent(name, grade, grupo, email, student_id) {
    try {
      const updateStudents = await db.query(
        "update student set name=$1,grade=$2,grupo=$3,email=$4 WHERE student_id=$5",
        [name, grade, grupo, email, student_id]
      );
      return updateStudents.rows;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = { Student };
