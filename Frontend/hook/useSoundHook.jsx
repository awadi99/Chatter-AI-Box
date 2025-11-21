const keyStrokeSound =[
    new Audio("/sound/frontend_public_sounds_keystroke1.mp3"),
    new Audio("/sound/keystroke2.mp3"),
    new Audio("/sound/keystroke3.mp3"),
    new Audio("/sound/keystroke4.mp3"),

]


function useKeyboardSound(){
    const playRandomKeyStrokeSound=()=>{
        let randomSound = keyStrokeSound[Math.floor(Math.random()*keyStrokeSound.length)];
        randomSound.currentTime=0;
        randomSound.volume=1;
        randomSound.play().catch((err)=>{console.log(err)})
    };
    return {playRandomKeyStrokeSound};
}

export default useKeyboardSound;