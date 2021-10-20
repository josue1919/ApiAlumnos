var express = require('express');
var router = express.Router();
const {Student} = require('../db/students');


const student= new Student();


//traer todos los estudiantes
router.get('/get-all', async (req,res) => {

  try{

    const students = await student.getAll();
    res.status(200).json(students);
  }catch(e){

    res.status(500).json(e);
  }

});

//traer solo un estudiante
router.get('/get-one/:student_id', async (req,res) => {
  let {student_id} = req.params;

  try{

    const students = await student.getOne(student_id);
    res.status(200).json(students);
  }catch(e){

    res.status(500).json(e);
  }

});


//insertar
router.post('/add', async (req,res)=>{
let {name,grade,grupo,email}=req.body;

  try{

    const students = await student.addStudent(name,grade,grupo,email);
    res.status(200).json(students);
  }catch(e){

    res.status(500).json(e);
  }
});

//eliminar
router.delete('/delete/:student_id',async(req,res)=>{

  let{student_id}=req.params;
  try{
    
     await student.deleStuden(student_id);
    
     res.json({ message: "Alumno eliminado" });
  }catch(e){

    throw e;
  }

});

//actualizar
router.put('/update/:student_id',async(req,res)=>{

  let {student_id}=req.params;
  let {name,grade,grupo,email}=req.body;
  try{
    
     await student.updateStudent(name,grade,grupo,email,student_id);
    
    res.status(200).send(`Usuario con id: ${student_id} actualizado`);
    
  }catch(e){

    throw e;
  }

});
module.exports = router;
