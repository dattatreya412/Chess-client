import { socket } from "../sockets";

const onDrop = (sourceSquare, targetSquare) => {
  const move = {
    from: sourceSquare,
    to: targetSquare,
    promotion: "q",
  };

  socket.emit("move", move);
  return true;
};

export default onDrop;
