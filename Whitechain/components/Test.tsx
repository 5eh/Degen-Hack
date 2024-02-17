// components/Test.tsx

import { MongoAPIError } from 'mongodb'
import React from 'react'

const Test = () => {
  
  function TestConnection() {
    console.log("Hello")
  }
  
  return ( 
    <button onClick={() => {TestConnection()}}>Check for MongoClient</button>
    

  )
}

export default Test


// import React, { useState, useEffect } from "react";

// interface Listing {
//   title: string;
//   description: string;
//   creatorUID: string;
// }

// const Marketplace: React.FC = () => {
//   const [listing, setListing] = useState<Listing | null>(null);
//   const [isAccepted, setIsAccepted] = useState<boolean>(false);
//   const [uid, setUID] = useState<string>("");

//   useEffect(() => {
//     // Check if a UID already exists in sessionStorage
//     const storedUID = sessionStorage.getItem("uid");
//     if (storedUID) {
//       setUID(storedUID);
//     } else {
//       // Generate a UID for the current session/tab
//       const currentUID = Math.random().toString(36).substr(2, 9);
//       setUID(currentUID);
//       sessionStorage.setItem("uid", currentUID);
//     }

//     const storedListing = localStorage.getItem("listing");
//     const storedIsAccepted = localStorage.getItem("isAccepted");

//     if (storedListing) setListing(JSON.parse(storedListing));
//     if (storedIsAccepted) setIsAccepted(true);

//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === "listing" && e.newValue) {
//         setListing(JSON.parse(e.newValue));
//       }
//       if (e.key === "isAccepted" && e.newValue) {
//         setIsAccepted(true);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const handleCreateListing = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const newListing: Listing = {
//       title: formData.get("title") as string,
//       description: formData.get("description") as string,
//       creatorUID: uid,
//     };
//     setListing(newListing);
//     localStorage.setItem("listing", JSON.stringify(newListing));
//   };

//   const handleAcceptListing = () => {
//     setIsAccepted(true);
//     localStorage.setItem("isAccepted", "true");
//   };

//   const isCreator = listing?.creatorUID === uid;

//   return (
//     <div>
//       {!listing ? (
//         <form onSubmit={handleCreateListing}>
//           <label>
//             Title:
//             <input type="text" name="title" required />
//           </label>
//           <br />
//           <label>
//             Description:
//             <input type="text" name="description" required />
//           </label>
//           <br />
//           <button type="submit">Create Listing</button>
//         </form>
//       ) : (
//         <div>
//           <h2>{listing.title}</h2>
//           <p>{listing.description}</p>
//           {isCreator ? (
//             isAccepted ? (
//               <p>Your listing has been accepted!</p>
//             ) : (
//               <p>Waiting for someone to accept your listing...</p>
//             )
//           ) : !isAccepted ? (
//             <button onClick={handleAcceptListing}>Accept Listing</button>
//           ) : (
//             <p>Listing has been accepted!</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Marketplace;
