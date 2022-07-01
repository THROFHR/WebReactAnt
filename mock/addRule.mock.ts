// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      key: 79,
      disabled: true,
      href: 'https://ant.design',
      avatar: 'https://avatars1.githubusercontent.com/u/8186664?s=40&v=4',
      name: '魏丽',
      owner: 'Thompson',
      desc: '八都各交少积风你青看有斗。',
      callNo: 80,
      status: 80,
      updatedAt: '8l*%8',
      createdAt: 'ht%s',
      progress: 80,
    });
  },
};
