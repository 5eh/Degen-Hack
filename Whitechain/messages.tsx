import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Register from "../components/Register/LoginForm";
import ListChats from "../components/Messages/ListChats";
import Messenger from "../components/Messages/Messenger";
import SendMessage from "../components/Messages/SendMessage";
import styles from "../styles/Message.module.css";

const Messages = () => {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // if (user)
  return (
    <>
      <br className="mt-10" />
      <Navbar />
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.listchats}>
          <ListChats />
        </div>
        <div className={styles.messenger}>
          <Messenger />
          <div className={styles.sendmessage}>
            <SendMessage />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
//   return (
//     <>
//       <br className="mt-10" />
//       <Navbar />
//       <div className="wrapper">
//         <Register />
//       </div>
//       <Footer />
//     </>
//   );
// };

export default Messages;
