import moveSound from "../assets/audio/move-self.mp3"

function playMoveSound() {
  return new Promise((resolve) => {
    const audio = new Audio(moveSound);
    audio.play();
    audio.onended = resolve;
  });
}

export const handleMove = async (
  game,
  move,
  validMoves,
  setBoardFen,
  setPresentMoveCount,
  presentMoveCount,
  next,
  rating
) => {
  await playMoveSound();
    const index = presentMoveCount;
    console.log(JSON.stringify(validMoves))
    console.log(index)
    console.log(validMoves[index])
    try{
    if (game.move(move)) {
      console.log("played Move" +JSON.stringify(move))
      console.log("correct move" + JSON.stringify(validMoves[index]))
      setBoardFen(game.fen()); 
      if (
        move.from === validMoves[index].from &&
        move.to === validMoves[index].to
      ) {
        console.log("valid")
        setPresentMoveCount((prevCount) => prevCount + 1);
        if (index + 1 < validMoves.length) {
          setTimeout(async ()=>{
            await playMoveSound();
          const autoMove = validMoves[index + 1];
          game.move(autoMove);
          setBoardFen(game.fen());
          setPresentMoveCount((prevCount) => prevCount + 1);
          },500)
        } else {
          console.log("correct")
          setTimeout(()=>{
            console.log("next")
            next('correct', rating)
          },500)
        }
      } else {
        console.log("wrong")
        setTimeout(()=>{
          console.log("next")
          next('wrong', rating)
        },2000)
      }
    } else {
      console.log('Invalid Move') // Invalid move
    }
  } catch (err) {
    console.error("Invalid Move:", err);
  }
  
};
