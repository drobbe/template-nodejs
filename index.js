import { extract } from '@extractus/article-extractor';
import * as rn from 'random-number';
import axios from 'axios';

import { setTimeout } from 'timers/promises';

const input = 'https://coleccionsolo.com/visits/';
const article = await extract(input);

let countOriginalPara = article.content.match(/<p>(.*?)<\/p>/g).length;

async function start() {
  let count = 1;
  while (true) {
    try {
      const article = await extract(input);

      let countNewPara = article.content.match(/<p>(.*?)<\/p>/g).length;

      if (countNewPara !== countOriginalPara) {
        makeRequest({
          title: 'Si consiguio 👌👌👌',
          content: 'Ha conseguido nueva información apresurate !!!!!!!',
        });
      } else {
        makeRequest({
          title: 'No consiguio 🦗🦗🦗',
          content: 'Nade nuevo tristemente',
        });
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

start();

async function makeRequest(data) {
  const { title, content } = data;
  try {
    const response = await axios.get(
      `http://xdroid.net/api/message?k=k-7fe7f460e65b&t=${encodeURI(
        title
      )}&c=${encodeURI(content)}&u=https%3A%2F%2Fcoleccionsolo.com%2Fvisits%2F`
    );
    console.log(response.statusText);
  } catch (error) {
    console.error(error);
  }
}
