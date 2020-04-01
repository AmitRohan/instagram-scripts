// Open Profile and select the first photo such that you see the photo popup and the right arrow.
// if you right click on the icon you can see the class name coreSpriteRightPaginationArrow.
// if the class name is not present the the script won't work. Instagram has changed :D
// In the console paste the content of this file and watch the magic. 
picturesSeen = 0;
nextOne = document.getElementsByClassName('coreSpriteRightPaginationArrow')[0];
var showNext = function(){
    picturesSeen++;
    console.log("I have seen ",picturesSeen," pictures");
    nextOne.click();
    setTimeout(()=>{
      showNext();
    },3000);
}
showNext();
