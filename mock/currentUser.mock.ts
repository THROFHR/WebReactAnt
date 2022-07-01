// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.status(200).send({
      name: '黄秀英',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '168f3f8f-d9a9-44C5-2BdE-6fBc6fdB4CDe',
      email: 'c.lkicwmrkjh@nuvlvrgvv.ht',
      signature: '个想而况管严上规界量为新究。',
      title: '式天利族力具八南领影示无住但。',
      group: '前端 6 组',
      tags: [
        { key: 1, label: '大长腿' },
        { key: 2, label: '小清新' },
        { key: 3, label: '阳光少年' },
        { key: 4, label: '小清新' },
        { key: 5, label: '川妹子' },
        { key: 6, label: 'IT 互联网' },
        { key: 7, label: '大咖' },
      ],
      notifyCount: 100,
      unreadCount: 95,
      country: '印度',
      access: '适易联已压感八没出马决知但变即但传。',
      geographic: { province: { label: '重庆', key: 8 }, city: { label: '合肥市', key: 9 } },
      address: '广西壮族自治区 玉林市 其它区',
      phone: '11232102588',
    });
  },
};
