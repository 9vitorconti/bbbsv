const express = require('express');
const worker = require('node-recursive-directory');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const DIR = './dashboards';
const app = express();
const cors = require('cors');


app.use(cors());


/* Searches for .JSON files within a directory and retrieves their full filepath */
const getFiles = async (dir) =>{
        const rawData = await worker(dir,true);
        const files = rawData.map((file)=>{
            if(file?.filename){
                let extension = '.json';
                if((path.extname(file.filename)===extension)){
                    return file.fullpath;
                }
            }
        }
    )
    return files;
}

/* Reads all JSON Files passed in the 'FILES' parameter and returns them in one single JSON Object */
const readFiles = (files) => {
    const jsonObject = [];
    files.forEach(async element => {
        if(element){
            let file = await fs.readFileSync(element);
            let JSONFile = JSON.parse(file);
            jsonObject.push(JSONFile);
        }
    });
    return jsonObject;
}



app.get('/api',async (request,response)=>{
    const files = await getFiles(DIR);
    const data = await readFiles(files);
    const trainers = [];
    //Adds dashboards to its trainers
    for(let i=0;i<data.length;i++){
        for(const id in data[i].users){
            if(data[i].users[id].isModerator){
                let isTrainerAlreadyInArray = false;
                trainers.map(trainer=>{
                    if (
                      trainer.name === data[i].users[id].name ||
                      data[i].users[id].name === "Ethan Stubbs" ||
                      data[i].users[id].name === "Vitor Conti" ||
                      data[i].users[id].name === "Jinky Tunacao" ||
                      data[i].users[id].name === "Xingzi (Kathy) FENG"
                    ) {
                      isTrainerAlreadyInArray = true;
                    }
                });
                if(!isTrainerAlreadyInArray){
                    trainers.push({name: data[i].users[id].name, dashboards: []});
                    
                }
            }
        }
    }
    //Adds dashboards to its trainers
    for(let i=0;i<data.length;i++){ 
        for(const user in data[i].users){
            trainers.map(trainer=>{
                if(trainer.name===data[i].users[user].name){
                  trainer.dashboards.push(data[i]);
                }
            })
        }
    }
    //Adds total time with microphone
    for(let i=0;i<data.length;i++){
        for(const user in data[i].users){
            trainers.map(trainer=>{
                if(trainer.name===data[i].users[user].name){
                    if(!trainer.totalTalkTime){trainer.totalTalkTime=0}
                    trainer.totalTalkTime += data[i].users[user].talk.totalTime;
                }
            })
        }
    }
    //Adds total number of messages
    for(let i=0;i<data.length;i++){
        for(const user in data[i].users){
            trainers.map(trainer=>{
                if(trainer.name===data[i].users[user].name){
                    if(!trainer.totalMessages){trainer.totalMessages=0}
                    trainer.totalMessages += data[i].users[user].totalOfMessages
                }
            })
        }
    }
    trainers.map(trainer=>{
        trainer.totalClasses = trainer.dashboards.length;
    })
    response.send(trainers);
});

app.get('/api2',async (request,response)=>{
    const files = await getFiles(DIR);
    const data = await readFiles(files);
    response.send(data); 
})


app.listen(PORT,()=>{
    console.log(`Server is listening to ${PORT}`);
});

