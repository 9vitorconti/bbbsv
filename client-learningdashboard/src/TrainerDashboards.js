import { useState } from "react";
const ENDPOINT_URL = 'https://bia.timesedu.com.au/learning-analytics-dashboard/?meeting=';

const TrainerDashboards = ({trainer,onCloseDashboard}) => {

const [dashboards,setDashboards] = useState([trainer.dashboards]);
const onCloseDashboardHandler = () =>{
    onCloseDashboard(null);
}
const convertUTCToDate = (utc) =>{ 
   let d = new Date(utc); // The 0 there is the key, which sets the date to the epoch
   
   return d.toLocaleDateString();
}
const openUrl = (url) =>{
    window.open(url,'_blank','noopener,noreferrer');
}
const renderedDashboards = dashboards[0].map(dashboard=>{
   return (
     <tr key={dashboard.intId + Math.random() * Math.random()}>
       <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
         {dashboard.name}
       </td>
       <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
         {convertUTCToDate(dashboard.createdOn)}
       </td>
       <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
         {trainer.name}
       </td>
       <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
         <button
           className="h-6 px-4 text-white transition-colors duration-150 border shadow-md bg-gray-600 border-gray-600 text-xs rounded-lg focus:shadow-outline hover:bg-white hover:text-gray-800"
           onClick={()=>openUrl(`${ENDPOINT_URL}+${dashboard.intId}&report=${dashboard.token}`)}
         >
           Details
         </button>
       </td>
     </tr>
   );
})

    return (
      <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
        <div
          style={{ backgroundPosition: "10px 10px" }}
          className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
        ></div>
        <div className="relative rounded-xl overflow-auto">
          <div className="shadow-sm overflow-hidden my-8">
            <table className="border-collapse table-fixed w-full text-sm">
              <thead>
                <tr>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Name
                  </th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Class Date
                  </th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    Trainer
                  </th>
                  <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                    
                    <button onClick={onCloseDashboardHandler} className="relative ml- h-6 px-4 text-white transition-colors duration-150 border shadow-md bg-red-500 border-red-500 text-xs rounded-lg focus:shadow-outline">
                    <i className="fa-regular fa-circle-xmark"></i> Close
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800">
                {renderedDashboards}
              </tbody>
            </table>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
      </div>
    );
}

export default TrainerDashboards;