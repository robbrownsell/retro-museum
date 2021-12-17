import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import ComputerDao from '@daos/Computer/ComputerDao.mock';
import { paramMissingError } from '@shared/constants';

const computerDao = new ComputerDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/**
 * Get all computers.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getAllComputers(req: Request, res: Response) {
    const computers = await computerDao.getAll();
    return res.status(OK).json({ computers });
}


/**
 * Add one computer.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addOneComputer(req: Request, res: Response) {
    const { computer } = req.body;
    if (!computer) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await computerDao.add(computer);
    return res.status(CREATED).end();
}


/**
 * Update one computer.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function updateOneComputer(req: Request, res: Response) {
    const { computer } = req.body;
    if (!computer) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    computer.id = Number(computer.id);
    await computerDao.update(computer);
    return res.status(OK).end();
}


/**
 * Delete one computer.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteOneComputer(req: Request, res: Response) {
    const { id } = req.params;
    await computerDao.delete(Number(id));
    return res.status(OK).end();
}
