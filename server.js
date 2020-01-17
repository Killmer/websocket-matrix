const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

const icludeText = (text, string) => {
    string = string.toUpperCase();
    text = text.toUpperCase();
    let result = string.search(text);

    return result !== -1;
};

server.on('connection',  ws => {
    let fateQuestion = false;
    let pillsQuestion = false;
    let pillsQuestionDone = false;
    ws.on('message', message => {

        // answer after rabbit help
        if(icludeText('Morpheus', message)) {
            setTimeout(() =>  ws.send("I'm here Neo!"), 4000);
            setTimeout(() =>  {
                ws.send("Do you believe in fate?");
            }, 7000);
            fateQuestion = true;
        }

        // answer about fate questions
        if(fateQuestion && (icludeText('Yes', message))) {
            setTimeout(() =>  ws.send("You are the ONE! Truly!!!"), 3000);
            fateQuestion = false;
            pillsQuestion = true;
        }
        if(fateQuestion && (icludeText('No', message))) {
            setTimeout(() =>  ws.send("Why not?"), 3000);
            setTimeout(() =>  ws.send("You are the ONE, Neo! This is your fate..."), 15000);
            fateQuestion = false;
            pillsQuestion = true;
        }

        // answer about pills
        if(pillsQuestion) {
            pillsQuestion = false;
            setTimeout(() =>  ws.send("I'm talking about the Matrix, Neo..."), 23000);
            setTimeout(() =>  ws.send("This is your last chance. After this, there is no turning back!"), 28000);
            setTimeout(() =>  ws.send("You take the blue pill - the story end..."), 32000);
            setTimeout(() =>  ws.send("You wake up in your bed and believe whatever you want to believe."), 36000);
            setTimeout(() =>  ws.send("You take the red pill!"), 39000);
            setTimeout(() =>  ws.send("You stay in wonderland and I'll show you how deep the rabbit hole goes!"), 43000);
            setTimeout(() =>  ws.send("Remember! All I'm offering is the TRUTH! Nothing MORE..."), 48000);
            setTimeout(() => {
                pillsQuestionDone = true;
            }, 50000);
        }
        if(pillsQuestionDone && (icludeText('Blue', message))) {
            server.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
            setTimeout(() =>  ws.send("Good Bye, Neo..."), 5000);
            pillsQuestionDone = false;
        }
        if(pillsQuestionDone && (icludeText('Red', message))) {
            server.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
            setTimeout(() =>  {
                ws.send("Come with me... It's time to know the TRUTH!");
            }, 5000);
            setTimeout(() => {
                ws.close();
            },6000);
            pillsQuestionDone = false;

        } else {
            server.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            })
        }
    });
    setTimeout(() => {
        ws.send('Wake up, Neo...');
    }, 6000);
    setTimeout(() => ws.send('The Matrix has you...'), 12000);
    setTimeout(() => ws.send('Follow the white rabbit.'), 17000);
    setTimeout(() => ws.send('Knock, knock, Neo.'), 22000);
});