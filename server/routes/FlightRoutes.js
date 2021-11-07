const express=require('express');
const flightController=require('../Controller/FlightController');
const flightRouter=express.Router();
flightRouter.use(express.json());
flightRouter.use(express.urlencoded({extended: false}));




flightRouter.post('/',flightController.userLogin);

flightRouter.post('/createFlights',flightController.createFlight);

flightRouter.get('/getFlights',flightController.findAllFlights);

flightRouter.delete('/deleteFlights/:id',flightController.deleteFlight);

flightRouter.post('/doUpdateFlights/:id',flightController.updateFlight);

flightRouter.get('/updateFlights/:id',flightController.getUpdateFlight);

flightRouter.post('/getFlights',flightController.findFlights);


module.exports=flightRouter;