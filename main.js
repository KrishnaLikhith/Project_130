believer = "";
phoenix = "";
leftwX = 0;
leftwY = 0;
rightwX = 0;
rightwY = 0;
songPlaying = "";
scorel = 0;
scorer = 0;


function preload() {
    believer = loadSound("Believer.mp3");
    phoenix = loadSound("Phoenix.mp3");

}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPosses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    believer.isPlaying();

    if (scorel > 0.2) {
        circle(leftwX, leftwY, 10);
        fill("#FF0000");
        stroke("#FF0000");
        phoenix.stop();
        if (believer == false) {
            believer.play();
            document.getElementById("song").innerHTML = "Song Playing - Believer";
        }

    }
    phoenix.isPlaying();
    phoenix = loadSound("Phoenix.mp3");
    if (scorer > 0.2) {
        circle(rightwX, rightwY, 10);
        fill("#FF0000");
        stroke("#FF0000");
        believer.stop();
        if (phoenix = false) {
            phoenix.play();
            document.getElementById("song").innerHTML = "Song Playing - Phoenix";
        }
    }


}
function modelLoaded() {
    console.log("Model is Loaded");
}
function gotPosses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwX = results[0].pose.leftWrist.x;
        leftwY = results[0].pose.leftWrist.y;
        rightwX = results[0].pose.rightWrist.x;
        rightwY = results[0].pose.rightWrist.y;
        scorel = results[0].pose.keypoints[9].score;
        scorer = results[0].pose.keypoints[10].score;
    }
}
function play(){
    phoenix.play();
    phoenix.setVolume(1);
    phoenix.rate(1);
}