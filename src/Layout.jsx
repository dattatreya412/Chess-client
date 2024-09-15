// import React, { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { isTokenValid } from "./FunctionsToolBox/tokenValidity";
// import Login from "./pages/Login";
// import SideNavBar from "./components/SideNavBar/SideNavBar";
// import { socket } from './sockets';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateStatus } from './store/userSlice';
// import { fetchUser } from "./store/userSlice";  

// function Layout() {
//   const token = localStorage.getItem("authToken");
//   const tokenIsValid = isTokenValid(token);
//   const objectId = useSelector(state => state.user._id);
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const status = useSelector((state) => state.user.status);
//   const error = useSelector((state) => state.user.error);
//   // console.log(JSON.stringify(user))
//   useEffect(() => {
//     dispatch(fetchUser(localStorage.getItem("Chess:username")));
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("trigerd useEffect")
//     socket.on('connection', () => {       
//       if (!objectId) {
//         socket.emit('reconnect');
//       } else {
//         console.log('connected...');
//         dispatch(updateStatus({ objectId, isLive: true }));
//         socket.emit('sendObjectId', objectId);
//       }
//     });

//     return () => {
//       socket.off('connection');
//     };
//   }, [dispatch, objectId]);


//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "failed") {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <>
//       {tokenIsValid ? (
//         <div className="flex">
//           <SideNavBar />
//           <div className="flex w-screen">
//             <div className="w-1/12 h-screen"></div>
//             <div className="w-11/12 mx-32 my-5">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Login />
//       )}
//     </>
//   );
// }

// export default Layout;





import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { isTokenValid } from "./FunctionsToolBox/tokenValidity";
import Login from "./pages/Login";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import { socket } from './sockets';
import { useSelector, useDispatch } from 'react-redux';
import { updateStatus } from './store/userSlice';
import { fetchUser } from "./store/userSlice";

function Layout() {
  const token = localStorage.getItem("authToken");
  const tokenIsValid = isTokenValid(token);
  const objectId = useSelector(state => state.user._id);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  // console.log(JSON.stringify(user));

  useEffect(() => {
    const username = localStorage.getItem("Chess:username");
    if (username) {
      dispatch(fetchUser(username));
    } else {
      console.error("Username not found in localStorage");
    }
  }, [dispatch]);

  useEffect(() => {
    socket.on('connection', () => {
      if (!objectId) {
        socket.emit('reconnect');
        console.log('reconnecting...');
      } else {
        console.log('connected...');
        dispatch(updateStatus({ objectId, isLive: true }));
        socket.emit('sendObjectId', objectId);
      }
    });

    return () => {
      socket.off('connection');
    };
  }, [dispatch, objectId]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {tokenIsValid ? (
        <div className="flex">
          <SideNavBar />
          <div className="flex w-screen">
            <div className="w-1/12 h-screen"></div>
            <div className="w-11/12 mx-32 my-5">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Layout;

