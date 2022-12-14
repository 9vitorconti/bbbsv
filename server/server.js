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
    const extension = '.json';
        const rawData = await worker(dir,true);
        const files = rawData.map((file)=>{
            if(file?.filename){
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
    
    //Adds UNIQUE trainers to trianer's array.
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
        const objectSize = Object.keys(data[i].users).length;
        if(objectSize>2){
        for(const user in data[i].users){
            trainers.map(trainer=>{
                if(trainer.name===data[i].users[user].name){
                    if(data[i].users)
                  trainer.dashboards.push(data[i]);
                  
                }
            })
        }
    }
    }

    trainers.map(trainer=>{
        
        let uniqueDashBoards = [...new Set(trainer.dashboards)];
        trainer.dashboards = uniqueDashBoards;
    })
    //Adds total time with microphone
    trainers.map(trainer=>{
        
        trainer.dashboards.map(dashboard =>{ 
            for(const key in dashboard.users){
                if(dashboard.users[key].name===trainer.name){
                    if(!trainer.totalTalkTime){trainer.totalTalkTime=0}
                    trainer.totalTalkTime += dashboard.users[key].talk.totalTime;

                }
            }
        })
    })
    // for(let i=0;i<data.length;i++){
    //     for(const user in data[i].users){
    //         trainers.map(trainer=>{
    //             if(trainer.name===data[i].users[user].name){
    //                 if(!trainer.totalTalkTime){trainer.totalTalkTime=0}
    //                 trainer.totalTalkTime += data[i].users[user].talk.totalTime;
    //             }
    //         })
    //     }
    // }
    //Adds total number of messages
    trainers.map(trainer=>{
        trainer.dashboards.map(dashboard=>{
            for(const key in dashboard.users){
                if(!trainer.totalMessages){trainer.totalMessages=0, trainer.rating=[]}
                trainer.totalMessages += dashboard.users[key].totalOfMessages;
            }
        })
    });
    // for(let i=0;i<data.length;i++){
    //     for(const user in data[i].users){
    //         trainers.map(trainer=>{
    //             if(trainer.name===data[i].users[user].name){
    //                 if(!trainer.totalMessages){trainer.totalMessages=0, trainer.rating=[]}
    //                 trainer.totalMessages += data[i].users[user].totalOfMessages
    //             }
    //         })
    //     }
    // }
    //Adds token to each dashboard;
    trainers.map(trainer=>{
        for(let i=0;i<trainer.dashboards.length;i++){
            const token = fs.readdirSync(`${DIR}/${trainer.dashboards[i].intId}`)
            if(token){
                trainer.dashboards[i].token = token[0];
            }
        }
        
    })
    //Calculates Rating
    trainers.map(trainer=>{
        trainer.totalClasses = trainer.dashboards.length;
        trainer.rating = convertMStoRating(trainer);
        
    })
    response.send(trainers);
});

const convertMStoRating=(trainer)=>{
    const minutes = Math.floor((trainer?.totalTalkTime/1000/60)/trainer.totalClasses);
    let rating = [0,-1,-1,-1,-1 ];
    if(minutes>5) {rating = [0,-1,-1,-1,-1];}
    if(minutes>20) {rating = [1,-1,-1,-1,-1];}
    if(minutes>30) {rating = [1,1,0,-1,-1];}
    if(minutes>60) {rating = [1,1,1,-1,-1];}
    if(minutes>120) {rating = [1,1,1,1,-1];}
    if(minutes>130) {rating = [1,1,1,1,1];};
    
    return rating;
     
    
  }

app.get('/api2',async (request,response)=>{
    const files = await getFiles(DIR);
    const data = await readFiles(files);
    response.send(data); 
})


app.listen(PORT,()=>{
    console.log(`Server is listening to ${PORT}`);
});

