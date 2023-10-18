import { extract } from '@extractus/article-extractor';
import * as rn from 'random-number';
import { create, Whatsapp } from 'venom-bot';
import { setTimeout } from 'timers/promises';

const input = 'https://coleccionsolo.com/visits/';
const article = await extract(input);

let countOriginalPara = article.content.match(/<p>(.*?)<\/p>/g).length;

create({
  session: 'session-name', //name of session
})
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  let count = 1;
  while (true) {
    try {
      const article = await extract(input);

      let countNewPara = article.content.match(/<p>(.*?)<\/p>/g).length;

      if (countNewPara !== countOriginalPara) {
        client.sendText('34643216057@c.us', 'Si consiguio 👌');
      } else {
        client.sendText('34643216057@c.us', 'No consiguio 🕷');
      }
      const gen = rn.generator({
        min: 900000,
        max: 1800000,
        integer: true,
      });
      const interval = gen();

      if (count % 5 === 0) countOriginalPara = countNewPara;
      count++;
      await setTimeout(interval);
    } catch (err) {
      console.error(err);
    }
  }
}
