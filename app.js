/////////////////this is a promises or sync restfull api
// const express = require("express");
// require("./db/connection");
// const Student = require("./models/students");
// const app = express();
// ////manually host port no (3000 for localuse only)
// const port = process.env.PORT || 3000;
// //route folder is defined
// app.use(express.json());
// // app.get("/",(req,res)=>{
// // 	res.send("Hello from the other sides by zain.");

// // })
// //create a new student
// app.post("/students",(req,res) =>{
// 	console.log(req.body);
// 	const user = new Student(req.body);
// ///dave to data base
// 	user.save().then(() =>{
// 	res.status(201).send(user);

// 	}).catch((e)=>{
// 	res.status(400).send(e);

// 	})
// 	//in express to recognizeorshowa json object we 
// 	///use express.json

// 	//res.send("Hello from the other sides.");
// })
// app.listen(port, ()=>{
// 	console.log(`connection is setup at ${port}`);
// })







/////RestApi in async method



const express = require("express");
require("./db/connection");
const Student = require("./models/students");
const app = express();
////manually host port no (3000 for localuse only)
const port = process.env.PORT || 3000;
 app.use(express.json());
///post is create
app.post("/students",async(req,res)=>{
	try{
	const user =new Student(req.body);

	const createUser = await user.save();
	res.status(201).send(createUser);
	}catch(e){
	res.status(400).send(e);

}
})



///get is read
//for all data
// app.get("/students",async(req,res)=>{
// 	try{
// 		const studentsData = await Student.find();
// 		res.send(studentsData);
// 	}catch(e){
// 		res.send(e);
// 	}
// })


//get data by id
app.get("/students/:id",async(req,res)=>{
	try{
		const _id =req.params.id;
		const studentData = await Student.findById({_id});
		if(!studentData){
			return res.status(404).send();
		}
		else{
		res.status(500).send(studentData);
		}
	}catch(e){
		res.send(e);
	}
})///create new request and put value of id in url and we 
///will get data
//now create a request in postman and send






/////put and patch are update


app.patch("/students/:id",async(req,res)=>{
	try{
		const _id =req.params.id;
		const studentData = await Student.findByIdAndUpdate(_id,req.body,{
			new:true}
		);
		if(!studentData){
			return res.status(404).send();
		}
		else{
		res.status(500).send(studentData);
		}
	}catch(e){
		res.send(e);
	}
})


//////delete

app.delete("/students/:id",async(req,res)=>{
	try{
		const _id =req.params.id;
		const studentData = await Student.findByIdAndDelete(_id);
		if(!req.params.id){
			return res.status(404).send();
		}
		else{
		res.status(500).send(studentData);
		}
	}catch(e){
		res.send(e);
	}
})
//create a new router
const router = new express.Router();

///define
router.get("/zain",async(req,res)=>{
res.send("zain is here");
}
///register
app.use(router);



app.listen(port, ()=>{
	console.log(`connection is setup at ${port}`);
})