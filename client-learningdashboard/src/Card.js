const Card = ({trainer, onSelectTrainer}) => {

const convertMsToTimeString = (ms) => {
    const twoDigits =(num)=> {
        return num.toString().padStart(2,'0');
    }
    let seconds = Math.floor(ms/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    seconds = seconds%60;
    minutes = minutes%60;
    return `${twoDigits(hours)}H:${twoDigits(minutes)}M:${twoDigits(seconds)}S`
}
const onClickHandler = () =>{
  onSelectTrainer(trainer);
}
  const renderedRating = trainer.rating.map(star=>{
      if(star===1){
        return <i key={Math.random()} className="fa-solid fa-star"></i>;
      }
      if(star===0.5){
        return <i key={Math.random()} className="fa-solid fa-star-half-stroke"></i>
      }
      return <i key={Math.random()} className="fa-regular fa-star"></i>
    });

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
            <p className="text-xs mt-8 font-mono"><span className="font-bold font-sans">Name:</span> {trainer.name} </p>
            <p className="text-xs mt-1 font-mono"><span className="font-bold font-sans">Classes:</span>  {trainer.totalClasses}</p>
            <p className="text-xs mt-1 font-mono"><span className="font-bold font-sans">Total Talk:</span>  <span className="text-red-600">{convertMsToTimeString(trainer.totalTalkTime)}</span></p>
            <p className="text-xs mt-1 font-mono"><span className="font-bold font-sans">AVG Talk per class:</span>  <span className="text-red-600">{convertMsToTimeString(trainer.totalTalkTime/trainer.totalClasses)}</span></p>
            <p className="text-xs mt-2 font-mono"><span className="font-bold font-sans">Rating: </span><span className="ml-1">{renderedRating}</span></p>
          </div>
          
        </div>
        <div className="flex justify-center mx-auto mt-8">
        <button className="h-6 px-4 text-white transition-colors duration-150 border shadow-md bg-gray-600 border-gray-600 text-xs rounded-lg focus:shadow-outline hover:bg-white hover:text-gray-800" onClick={onClickHandler}>View Classes</button>
        </div>
        
      </div>
    );
}

export default Card;