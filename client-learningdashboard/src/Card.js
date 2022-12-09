const Card = ({trainer}) => {

const convertMsToTime = (ms) => {
    const twoDigits =(num)=> {
        return num.toString().padStart(2,'0');
    }
    let seconds = Math.floor(ms/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    seconds = seconds%60;
    minutes = minutes%60;
    return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`
}
    return (
      <div className="inline-block m-2 mt-5 border-solid border max-sm:w-full rounded-2xl w-60 h-80 border-gray-300 shadow-md content-center">
        <div className="flex mx-auto justify-center mt-8">
          <img
            className="w-20 rounded-full"
            src="https://elearning.bia.edu.au/theme/image.php/lambda/core/1667881131/u/f1"
            alt="trainer-avatar"
          />
        </div>
        <div className="flex justify-center mx-auto">
          <div>
            <p className="text-xs mt-8"><span className="font-bold">Name:</span> {trainer.name} </p>
            <p className="text-xs mt-1"><span className="font-bold">Classes:</span>  {trainer.totalClasses}</p>
            <p className="text-xs mt-1"><span className="font-bold">Total Talk:</span>  <span className="text-red-600">{convertMsToTime(trainer.totalTalkTime)}</span></p>
            <p className="text-xs mt-1"><span className="font-bold">AVG Talk class:</span>  <span className="text-red-600">{convertMsToTime(trainer.totalTalkTime/trainer.totalClasses)}</span></p>
          </div>
          
        </div>
        <div className="flex justify-center mx-auto mt-11">
        <button className="h-6 px-4 text-white transition-colors duration-150 border bg-blue-500 border-blue-400 text-xs rounded-lg focus:shadow-outline hover:bg-white hover:text-blue-500">View Classes</button>
        </div>
        
      </div>
    );
}

export default Card;