// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      key: 91,
      disabled: true,
      href: 'https://github.com/umijs/dumi',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      name: '锺军',
      owner: 'Harris',
      desc: '包思命他该教工为想声委争书千将这维。',
      callNo: 69,
      status: 70,
      updatedAt: 'oKwSK',
      createdAt: 'Uzg^Y(',
      progress: 96,
    });
  },
};
