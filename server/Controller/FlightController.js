
const User = require( '../model/user.js');
const Flight =require( '../model/flight.js');
let alert = require('alert'); 
let logedin = false;
const  home= async (req,res)=>
{
 
};


const createUser = async (req,res)=>{
    
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);

    }catch (error){
        res.status(409).json({message: error.message})

    }
};

const userLogin = async (req,res)=>{
    const userData = req.body;
    console.log(req.body)
    try{
         const currentUser = await User.find({userName:userData.userName});
         if(currentUser[0].password==userData.password){
             logedin=true;
             res.send("login")
         }
         else{
             res.send("invalid password")
         }

    }catch (error){
        console.log(error.message)
        res.send("invalid user Name")

    }
};

const createFlight=(req,res)=>
{
    if(!logedin){
        res.send("Login First");
      }
      else{
    try{
    const flight=new Flight(
        {
            Flight_No : req.body.Flight_No,
            From: req.body.From,
            To : req.body.To,
            DateD:req.body.DateD,
            DateA: req.body.DateA,
            FirstSeats:req.body.FirstSeats,
            BusinessSeats: req.body.BusinessSeats,
            EconomySeats:req.body.EconomySeats

        }
    );
    
    flight.save().then((result)=>{
        res.send("User created successfully");
    }).catch((err)=>
    { 
        res.send("error try using valid Data");
    });
    }
    catch(error){
        res.send("error try using valid Data");
    }
}
 
};

const deleteFlight = (req,res)=>{
    if(!logedin){
        res.send("Login First");
      }
      else{
    Flight.findByIdAndRemove(req.params.id).then(result =>{

        res.send("User Deleted successfully");
    }).catch(err => {
        res.send("error");
      });
    }

  };

  const getUpdateFlight = (req,res)=>{
    if(!logedin){
        res.send("Login First");
      }
      else{
      
    const id = req.params.id;
        Flight.findById(id).then((result)=>{
            res.status(200).json(result);

        }).catch((err)=>{
            res.status(409).json({message: err.message})
        })
    }

};

  const updateFlight = (req,res)=>{
      if(!logedin){
        res.send("Login First");
      }
      else{
    validateRec(req).then((valid)=>{
        if(valid){
        Flight.findByIdAndUpdate(req.params.id,req.body).then(result =>{
            res.send("User updated successfully");
        }).catch(err => {
            res.send("error");
          });
        }
        else{
            res.send("invalid Data");
        }

    }).catch(err =>{
        res.send("error");

    })
      }

  };

  const validateRec = async (req)=>{
    const data = req.body;
    const val ={};
    if(data.Flight_No==null || data.Flight_No=="" )
        return false;
    if(data.From==null || data.From=="")
        return false;
    if(data.To==null || data.To=="")
        return false;
    if(data.FirstSeats==null || data.FirstSeats=="")
        return false;
    if(data.EconomySeats==null || data.EconomySeats=="")
       return false;
    if(data.BusinessSeats==null || data.BusinessSeats=="")
       return false;
    if(data.DateA==null || data.DateA=="")
       return false;
    if(data.DateD==null || data.DateD=="")
       return false;
    return true;
    

  };

  const findAllFlights = (req, res) => {  
      if(!logedin){
        res.send([]);
      } 
      else{                             ``
    Flight.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    }
    };

    const findFlights = (req,res)=>{
        const data = req.body;
        const val ={};
        if(data.Flight_No!=null && data.Flight_No!="" )
            Object.assign(val,{Flight_No:data.Flight_No})
        if(data.From!=null && data.From!="")
            Object.assign(val,{From:data.From})
        if(data.To!=null && data.To!="")
            Object.assign(val,{To:data.To})

        if(data.FirstSeats!=null && data.FirstSeats!=""){
            Object.assign(val,{FirstSeats:data.FirstSeats})
        }
        if(data.EconomySeats!=null && data.EconomySeats!="")
            Object.assign(val,{EconomySeats:data.EconomySeats})
        if(data.BusinessSeats!=null && data.BusinessSeats!="")
            Object.assign(val,{BusinessSeats:data.BusinessSeats})

        Flight.find(val).then((result)=>{
            resData =  filterDate(result,data) ;
            if(!logedin){
                res.send([])
            }
            else{
                res.status(200).json(resData);
            }
            
        }).catch (error=>{
            res.send("error");
        })
    };
    function filterDate(result,data){
        ans=[];
        for(let i = 0 ; i <result.length;i++){
            let temp = result[i]
            x=(formatDate(result[i].DateD)==formatDate(data.DateD))||data.DateD==''||data.DateD==null;
            y=formatDate(result[i].DateA)==formatDate(data.DateA)||data.DateA==''||data.DateA==null;
            if(x && y)
              ans.push(temp);
        }
        return ans;

    }



    module.exports=
    {
        createFlight,
        deleteFlight,
        getUpdateFlight,
        updateFlight,
        findAllFlights,
        findFlights,
        home,
        userLogin,
        createUser
    }

    function formatDate(dateVal) {
        if(dateVal=="")
           return "Nan";
        if(dateVal==null)
           return "Nan";
        var newDate = new Date(dateVal);
      
        var sMonth = padValue(newDate.getMonth() + 1);
        var sDay = padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        var sHour = newDate.getHours();
        var sMinute = padValue(newDate.getMinutes());
        var sAMPM = "AM";
      
        var iHourCheck = parseInt(sHour);
      
        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = "12";
        }
      
        sHour = padValue(sHour);
      
        return sMonth + "/" + sDay + "/" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
      }
      
      function padValue(value) {
        return (value < 10) ? "0" + value : value;
      }