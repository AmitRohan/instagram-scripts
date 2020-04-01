// Open Profile and select the first photo such that you see the photo popup and the right arrow.
// if you right click on the icon you can see the class name coreSpriteRightPaginationArrow.
// if the class name is not present the the script won't work. Instagram has changed :D
// In the console paste the content of this file and watch the magic. 
// If a image is already liked, the script will unlike it and then like it again. Othertise it will just like go to next picture.
picturesLiked = 0;
nextOne = document.getElementsByClassName('coreSpriteRightPaginationArrow')[0];
 var likeAndNext = function(){
    for( var _ of document.getElementsByTagName('svg')){
        if(_.getAttribute("aria-label") == 'Like'){
            if(_.parentElement.parentElement.tagName == 'SPAN'){
                _.parentElement.click();

                picturesLiked++;
                console.like("I have liked ",picturesLiked," pictures");
                setTimeout(()=>{
                    nextOne.click();
                    setTimeout(()=>{
                        likeAndNext()
                    },3000);
                },1000);
            }   
        }else if(_.getAttribute("aria-label") == 'Unlike'){
            if(_.parentElement.parentElement.tagName == 'SPAN'){
                _.parentElement.click();
                setTimeout(()=>{
                    likeAndNext();
                },1000);
            }
            
        }      
    } 
}
likeAndNext();
