import { Router } from 'express';
import { getAllComputers, addOneComputer, updateOneComputer, deleteOneComputer } from './Computers';


// Computer-route
const computerRouter = Router();
computerRouter.get('/all', getAllComputers);
computerRouter.post('/add', addOneComputer);
computerRouter.put('/update', updateOneComputer);
computerRouter.delete('/delete/:id', deleteOneComputer);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/computers', computerRouter);
export default baseRouter;
