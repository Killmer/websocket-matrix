const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

//Helpers functions
const showClientMessage = (message) => {
    server.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    })
};
const includeText = (text, string) => {
    string = string.toUpperCase();
    text = text.toUpperCase();
    let result = string.search(text);

    return result !== -1;
};

const includeWords = (words = [], string = '') => {
    let result = false;
    string = string.toUpperCase();
    words = words.map(word => word.toUpperCase());
    words.forEach((word) => {
        if(string.search(word) !== -1) {
            result = true;
        }
    });

    return result;
};

const randomWords = (words = []) => {
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};
/////////////////////////////////

server.on('connection',  ws => {
    const AGREE = ['Yes', 'Sure', 'Of course','ofcource', 'always', 'yeah', 'yeap'];
    const DISAGREE = ['No','Nope', `don't`, 'dont', 'do not', 'never', `didn't`, 'did not', 'nuh'];
    //Flags for dialogs
    let startDialog = true;
    let fateOptions = false;
    let whyNot = false;
    let whyHereMonolog = false;
    let matrixOptions = false;
    let matrixDialog = false;
    let truthDialog = false;
    let pillsDialog = false;
    ////////////////////////////

    //Starting messages
    setTimeout(() => {
        ws.send('Wake up, Neo...');
    }, 6000);
    setTimeout(() => ws.send('The Matrix has you...'), 12000);
    setTimeout(() => ws.send('Follow the white rabbit.'), 17000);
    setTimeout(() => ws.send('Knock, knock, Neo.'), 22000);
    ////////////////////////////



    //Dialogs
    ws.on('message', message => {

        if(startDialog && (includeText('Morpheus', message))) {
            startDialog = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("I'm here Neo!"), 4000);
            setTimeout(() =>  ws.send("Do you believe in fate?"), 7000);
            setTimeout(() =>  fateOptions = true, 7000);
        }
        else if(fateOptions && (includeWords(AGREE, message))) {
            fateOptions = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("You are the ONE! Truly!!!"), 3000);
            setTimeout(() =>  whyHereMonolog = true, 3000);
        }
        else if(fateOptions && (includeWords( DISAGREE, message))) {
            fateOptions = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("Why not?"), 3000);
            setTimeout(() => whyNot = true, 3000);
        }

        else if(whyNot) {
            whyNot = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("I know exactly, how you feel!"), 3000);
            setTimeout(() =>  ws.send("You are the ONE, Neo! This is your fate..."), 7000);
            setTimeout(() => whyHereMonolog = true, 7000);
        }

        else if(whyHereMonolog) {
            whyHereMonolog = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("Let me tell you, why you are here..."), 4000);
            setTimeout(() =>  ws.send("You here, because you know something..."), 8000);
            setTimeout(() =>  ws.send("What you know, you can't explain."), 12000);
            setTimeout(() =>  ws.send("But you feel it. You felt it, your entire life..."), 16000);
            setTimeout(() =>  ws.send("that there's something wrong with the world."), 20000);
            setTimeout(() =>  ws.send("You don't know what it is..."), 24000);
            setTimeout(() =>  ws.send("but it's there..."), 26000);
            setTimeout(() =>  ws.send("like a splinter in your mind, driving you MAD!"), 30000);
            setTimeout(() =>  ws.send("It's this feeling, that brought you to me..."), 34000);
            setTimeout(() =>  ws.send("Do you know what I'm talking about?"), 38000);
            setTimeout(() =>  matrixDialog = true, 38000);
        }

        else if(matrixDialog && (includeText('Matrix', message))) {
            matrixDialog = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("Do you want to know what it is?"), 3000);
            setTimeout(() =>  matrixOptions = true, 3000);
        }
        else if(matrixDialog && (includeWords(AGREE, message))) {
            showClientMessage(message);
            setTimeout(() =>  ws.send(randomWords(['What exactly?', 'Be more specified with your answers', ' Tell me the word, Neo'])), 3000);
        }
        else if(matrixDialog) {
            showClientMessage(message);
            setTimeout(() =>  ws.send(randomWords(['Think!', 'Try better!', 'Try to think more...',
                `It's in your head, it's all around you`, 'Try harder, Neo', 'Think, Neo!',
                'Think about my words!', 'What you were looking for, all this time?', `Starting with 'M'...`])), 2000);
        }
        else if(matrixOptions && (includeWords(DISAGREE, message))) {
            showClientMessage(message);
            setTimeout(() =>  ws.send(randomWords(['Are you sure?!', 'You were looking for it, for so long...', 'Is it your last answer?'])), 3000);
        }
        else if(matrixOptions && (includeWords(AGREE, message))) {
            showClientMessage(message);
            matrixOptions = false;
            setTimeout(() =>  ws.send("The Matrix is everywhere!"), 6000);
            setTimeout(() =>  ws.send("It is all around us."), 9000);
            setTimeout(() =>  ws.send("Even now, in this very room."), 13000);
            setTimeout(() =>  ws.send("You can see it when you look out your window..."), 17000);
            setTimeout(() =>  ws.send("or when you turn on your television."), 21000);
            setTimeout(() =>  ws.send("You can feel it when you go to work..."), 25000);
            setTimeout(() =>  ws.send("When you go to church..."), 28000);
            setTimeout(() =>  ws.send("When you pay your taxes..."), 31000);
            setTimeout(() =>  ws.send("It is the world that has been pulled over your eyes to blind you from the TRUTH!"), 35000);
            setTimeout(() =>  truthDialog = true, 35000);
        }
        else if(truthDialog && (includeText('Truth', message))) {
            truthDialog = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("That you are a slave, Neo!"), 3000);
            setTimeout(() =>  ws.send("Like everyone else you were born into bondage..."), 7000);
            setTimeout(() =>  ws.send("Born into a prison that you can not smell..."), 11000);
            setTimeout(() =>  ws.send("or taste..."), 13000);
            setTimeout(() =>  ws.send("or touch..."), 15000);
            setTimeout(() =>  ws.send("A prison... for your mind!"), 18000);
            setTimeout(() =>  ws.send("Unfortunately, no one can be told what the Matrix is..."), 22000);
            setTimeout(() =>  ws.send("You have to see it for yourself..."), 26000);
            setTimeout(() =>  ws.send("This is your last chance! After this, there is no turning back..."), 30000);
            setTimeout(() =>  ws.send("You take the BLUE pill - the story ends..."), 34000);
            setTimeout(() =>  ws.send("You wake up in your bed and believe whatever you want to believe."), 38000);
            setTimeout(() =>  ws.send("You take the RED pill!"), 42000);
            setTimeout(() =>  ws.send("You stay in wonderland and I'll show you how deep the rabbit hole goes!"), 46000);
            setTimeout(() =>  ws.send("Remember! All I'm offering is the TRUTH! Nothing MORE..."), 50000);
            setTimeout(() => pillsDialog = true, 50000);
        }
        else if(pillsDialog && (includeText('Blue', message))) {
            pillsDialog = false;
            showClientMessage(message);
            setTimeout(() =>  ws.send("Good Bye, Neo... Hope you will find your path!"), 4000);
        }
        else if(pillsDialog && (includeText('Red', message))) {
            pillsDialog = false;
            showClientMessage(message);
            setTimeout(() =>  {
                ws.send("Come with me... It's time to know the TRUTH!");
            }, 4000);
            setTimeout(() => {
                ws.close();
            },6000);
        }
        else if(pillsDialog) {
            showClientMessage(message);
            setTimeout(() =>  ws.send(randomWords(['Choose wisely!!', 'Red or blue?', 'Choose a pill, Neo', 'Make your choice', 'Decision is your, Neo...'])), 4000);

        }
        else {
            showClientMessage(message);
        }
    });
});