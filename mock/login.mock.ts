// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/login/account': (req: Request, res: Response) => {
    res.status(200).send({ status: 'error', type: 10, currentAuthority: 'admin' });
  },
};
