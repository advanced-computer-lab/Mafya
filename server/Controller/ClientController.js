const Client =require( '../model/client.js');
const Booking =require( '../model/booking');
const Flight =require( '../model/flight');
const  asyncHandler = require("express-async-handler");
const  createTokens = require( "../utils/generateToken");
const flightController=require('../Controller/FlightController');
const Token = require("../model/token.js");

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mafyaair@gmail.com',
    pass: '19021902'
  }
});

const sendMail=(email,message,subject)=>{
  var mailOptions = {
      from: 'mafyaair@gmail.com',
      to: email,
      subject: subject,
      text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error.message);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 

}





const signUp = asyncHandler(async (req,res)=>{
    
    try{

        const client = new Client(req.body);
        await client.save();
        const tok = createTokens.generateToken(client._id);
        const  t = new Token({token:tok});
        await t.save();       
        res.status(201).json({
            _id: client._id,
            name: client.name,
            email: client.email,
            age: client.age,
            passport: client.passport,
            isAdmin:client.isAdmin,
            token: tok,
            refreshToken: createTokens.generateRefreshToken(client._id)
          });

    }catch (error){
      res.send(["This Email is already used"]);

    }
});

const SignIn =asyncHandler(async (req,res)=>{
    const content = req.body;

    const client = await Client.findOne({ email:content.email });
    const tok = createTokens.generateToken(client._id);
    const  t = new Token({token:tok});
    await t.save();
    if (client && (await client.matchPassword(content.password))) {
      res.json({
        _id: client._id,
        name: client.name,
        email: client.email,
        age: client.age,
        passport: client.passport,
        isAdmin:client.isAdmin,
        token: tok,
        refreshToken:createTokens.generateRefreshToken(client._id)
      });
    } else {
      res.send(["Invalid Email or Password"]);
      
    }
});


const book = asyncHandler(async (req,res)=>{

          const emad= await Flight.findById(req.body.flightId);
          
          if(req.body.FirstNumberOfSeats>emad.FirstSeats||
            req.body.BusinessNumberOfSeats>emad.BusinessSeats||
            req.body.EconomyNumberOfSeats>emad.EconomySeats ||
            req.body.FirstSeatsNumbers.length!=req.body.FirstNumberOfSeats||
            req.body.BusinessSeatsNumbers.length!=req.body.BusinessNumberOfSeats||
            req.body.EconomySeatsNumbers.length!=req.body.EconomyNumberOfSeats
            ){
                res.send("Sorry sets you choose more than available ");
            }
            else if(!(isSubset(emad.FirstSeatsNumbers,req.body.FirstSeatsNumbers)&&
                    isSubset(emad.BusinessSeatsNumbers,req.body.BusinessSeatsNumbers)&&
                    isSubset(emad.EconomySeatsNumbers,req.body.EconomySeatsNumbers))){

                      res.send("Seats unavailable");

                    }
            else{


              
                emad.FirstSeats-=req.body.FirstNumberOfSeats
                emad.BusinessSeats-=req.body.BusinessNumberOfSeats
                emad.EconomySeats-=req.body.EconomyNumberOfSeats

                emad.ReservedFirstSeats+=req.body.FirstNumberOfSeats;
                emad.ReservedBusinessSeats+=req.body.BusinessNumberOfSeats;
                emad.ReservedEconomySeats+=req.body.EconomyNumberOfSeats;

                emad.FirstSeatsNumbers = removeSubset(emad.FirstSeatsNumbers,req.body.FirstSeatsNumbers);
                emad.BusinessSeatsNumbers = removeSubset(emad.BusinessSeatsNumbers,req.body.BusinessSeatsNumbers);
                emad.EconomySeatsNumbers = removeSubset(emad.EconomySeatsNumbers,req.body.EconomySeatsNumbers);

                emad.ReservedFirstSeatsNumbers = combine(emad.ReservedFirstSeatsNumbers,req.body.FirstSeatsNumbers)
                emad.ReservedBusinessSeatsNumbers = combine(emad.ReservedBusinessSeatsNumbers,req.body.BusinessSeatsNumbers)
                emad.ReservedEconomySeatsNumbers = combine(emad.ReservedEconomySeatsNumbers,req.body.EconomySeatsNumbers)

                try{
                 const booking = new Booking(req.body);
                 await booking.save();
                  await Flight.findByIdAndUpdate(req.body.flightId,emad)
                  var currentClient = await Client.findById(booking.clientId);
                  
                  sendMail(currentClient.email,"your flight has been booked successfully you can check details in your profile",'Ticket Reservation')

                  res.send(booking)
          
              }catch (error){
                  console.log(error.message)
                  res.send("can not book");
              }
              }

});
const deleteClientFlight = async(req,res)=>{
  const bookingId=req.params.id;
  try{
    const book = await Booking.findById(bookingId);
    await cancelBooking(bookingId);
    var currentClient = await Client.findById(book.clientId);
    sendMail(currentClient.email,"your flight has been canceled successfully",'Ticket cancellation')
    res.send("User Deleted successfully");

  }
  catch(err){
      console.log(err.message)
      res.send("error");
  }

}

const cancelBooking=async(bookingId)=>{
  
  const book = await Booking.findById(bookingId);
  const flightId = book.flightId;
  const emad= await Flight.findById(flightId);
  


  emad.FirstSeats+=book.FirstNumberOfSeats
  emad.BusinessSeats+=book.BusinessNumberOfSeats
  emad.EconomySeats+=book.EconomyNumberOfSeats

  emad.ReservedFirstSeats-=book.FirstNumberOfSeats;
  emad.ReservedBusinessSeats-=book.BusinessNumberOfSeats;
  emad.ReservedEconomySeats-=book.EconomyNumberOfSeats;

  emad.FirstSeatsNumbers = combine(emad.FirstSeatsNumbers,book.FirstSeatsNumbers);
  emad.BusinessSeatsNumbers = combine(emad.BusinessSeatsNumbers,book.BusinessSeatsNumbers);
  emad.EconomySeatsNumbers = combine(emad.EconomySeatsNumbers,book.EconomySeatsNumbers);

  emad.ReservedFirstSeatsNumbers = removeSubset(emad.ReservedFirstSeatsNumbers,book.FirstSeatsNumbers)
  emad.ReservedBusinessSeatsNumbers = removeSubset(emad.ReservedBusinessSeatsNumbers,book.BusinessSeatsNumbers)
  emad.ReservedEconomySeatsNumbers = removeSubset(emad.ReservedEconomySeatsNumbers,book.EconomySeatsNumbers)



  await Flight.findByIdAndUpdate(flightId,emad);
  await Booking.findByIdAndRemove(bookingId)


}



function isSubset(arr1, arr2,)
{
  let m = arr1.length;
  let n = arr2.length;
    let i = 0;
    let j = 0;
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++)
            if (arr2[i] == arr1[j])
                break;

        if (j == m)
            return false;
    }

    return true;
}
function combine(arr1,arr2){
  let n = arr2.length;
  let i = 0;
  for (i = 0; i < n; i++) {
    arr1.push(arr2[i]);

  }

  return arr1;
}
function removeSubset(arr1, arr2)
{
  let m = arr1.length;
  let n = arr2.length;
    let i = 0;
    let j = 0;
    for (i = 0; i < n; i++) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);

    }

    return arr1;
}




const findFlights = (req,res)=>{
  const data = req.body;
  const val ={};
  if(data.From!=null && data.From!="")
      Object.assign(val,{From:data.From})
  if(data.To!=null && data.To!="")
      Object.assign(val,{To:data.To})

  
  Flight.find(val).then((result)=>{
      resData =  filter(result,data) ;
      res.status(200).json(resData);
      
  }).catch (error=>{
    console.log(error.message)
      res.send([]);
  })
};


const getBookFlight = (req,res)=>{

    
  const id = req.params.id;
      Flight.findById(id).select("-_id").then((result)=>{
          res.status(200).json(result);

      }).catch((err)=>{
          res.status(409).json({message: err.message})
      })
  
};

const getProfile = (req,res)=>{

  
  const id = req.user._id.toString();
  //console.log(id)
      Client.findById(id).then((result)=>{
        res.status(200).json({
            name:result.name,
            email:result.email,
            passport:result.passport,
            age:result.age
          });
  

      }).catch((err)=>{
          res.status(409).json({message: err.message})
      })
  
};

const updateProfile = (req,res)=>{
    Client.findByIdAndUpdate(req.user._id.toString(),req.body).then(result =>{
      
        res.send("User updated successfully");
    }).catch(err => {
        res.send("error");
      });
    
};

const getBookings = (req,res)=>{
  const id = req.params.id;
      Booking.find({clientId:id}).then((result)=>{
          res.status(200).send(result);
      }).catch((err)=>{
          res.status(409).json({message: err.message})
      })
  

};







function filter(result,data){
  ans=[];
  for(let i = 0 ; i <result.length;i++){
      let temp = result[i]
      x=(formatDate(result[i].DateD)==formatDate(data.DateD))||data.DateD==''||data.DateD==null;
      y=formatDate(result[i].DateA)==formatDate(data.DateA)||data.DateA==''||data.DateA==null;
      z=(data.FirstSeats<=result[i].FirstSeats|| data.FirstSeats=='' ||data.FirstSeats==null)&&
        (data.EconomySeats<=result[i].EconomySeats||data.EconomySeats==''||data.EconomySeats==null)&&
        (data.BusinessSeats<=result[i].BusinessSeats||data.BusinessSeats==''||data.BusinessSeats==null);
      if(x && y&&z)
        ans.push(temp);
  }
  return ans;

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


  return sMonth + "/" + sDay + "/" + sYear ;
}

function padValue(value) {
  return (value < 10) ? "0" + value : value;
}












module.exports=
{
signUp,
SignIn,
book,
findFlights,
getBookFlight,
getProfile,
updateProfile,
cancelBooking,
getBookings,
deleteClientFlight

}
