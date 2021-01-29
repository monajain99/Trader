import React from 'react';
import '../../styles/Navbar.css'

function LandingPage(setAuthenticated) {
  return (
    <div>
      <div className="landing-page_intro">
      <div className="landing_page_h1">

        <h1 >Pro Trader</h1>
        <h2>Meet the new standards of MARKET TRADING</h2>
        <h5>Practice with trial money of 100,000</h5>
        </div>
        </div>
    </div>
  );
}

export default LandingPage;


// import React from "react";
// import { Navbar } from "reactstrap";
// import "../../styles/Navbar.css";

// function LandingPage({ authenticated, setAuthenticated }) {
//   return (
//     <div>
//       <div className="landing_page">
//         <Navbar
//           authenticated={authenticated}
//           setAuthenticated={setAuthenticated}
//         />
//         <div className="landing-page landing_page_heading landing_page_h1">
//           <h1>Meet the new standards of MARKET TRADING</h1>
//         </div>
//         <div>
//           <svg
//             className="landing_page landing-page__background"
//             fill="#5eb5f8"
//             height="100%"
//           >
//             <path d="M600 0 L0 0 L3200 5250 Z" />
//             <path d="M0 0 L0 2000 L4100 4040 Z" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

