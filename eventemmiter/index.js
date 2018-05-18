ChatApp = require('./chat.js');


let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', chatOnMessage);
  vkChat.removeListener('message', readyToAnswer);
  vkChat.close();
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
  facebookChat.removeListener('message', readyToAnswer);
}, 15000 );


const readyToAnswer = () => {
  console.log('Готовлюсь к ответу');
};

webinarChat.on('message', readyToAnswer);
vkChat.setMaxListeners(2);
vkChat.on('message', readyToAnswer);


vkChat.on('close', () => {
  console.log('Чат вконтакте закрылся :(');
});

// Закрыть вебинар
setTimeout( ()=> {
  console.log('Вебинар завершился');
  webinarChat.removeListener('message', chatOnMessage);
}, 30000 );

