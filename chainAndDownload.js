// Open Profile and select the first photo such that you see the photo popup and the right arrow.
// if you right click on the icon you can see the class name coreSpriteRightPaginationArrow.
// if the class name is not present the the script won't work. Instagram has changed :D
// In the console paste the content of this file and watch the magic. 
// The scripts goes through the entire profile and at the ends asks you to press OK to begin download one by one.

var linkList = []

function forceDownload(item){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", item.url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = item.fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

function startBulkDownloads(){
    linkList.map(forceDownload)
}

function saveUrl(url, fileName, alt){
    linkList.push({
        url : url,
        fileName : fileName,
        alt : alt
    })
}

function parsePageForImage(){
    var possibleChild = document.getElementsByClassName("ZyFrc");
    for( var _ of possibleChild){
    if(_.children 
            && _.children[0] 
            && _.children[0].children
            && _.children[0].children[0]
            && _.children[0].children[0].children
            && _.children[0].children[0].children[0]
            && _.children[0].children[0].children[0].tagName == 'IMG'
            ){  
                var imageDiv = _.children[0].children[0].children[0]
                var alt = imageDiv.getAttribute('alt');
                var url = imageDiv.getAttribute('src');
                var userName = alt.split(' ')[2];
                saveUrl(url,userName+"_"+ linkList.length +".png",alt)
            }
        else if(_.children 
                && _.children[0] 
                && _.children[0].children
                && _.children[0].children[0]
                && _.children[0].children[0].children
                && _.children[0].children[0].children[0]
                && _.children[0].children[0].children[0].children
                && _.children[0].children[0].children[0].children[0]
                && _.children[0].children[0].children[0].children[0].tagName == 'IMG'){
                    // When someone is tagged
                    var imageDiv =_.children[0].children[0].children[0].children[0]
                    var alt = imageDiv.getAttribute('alt');
                    var url = imageDiv.getAttribute('src');
                    var userName = alt.split(' ')[3]
                    saveUrl(url,userName+"_"+ linkList.length +".png",alt)
       }
    }
}



picturesViewed = 0;
nextOne = document.getElementsByClassName('coreSpriteRightPaginationArrow')[0];
 var openNext = function(){
    var failSafe = document.getElementsByClassName('coreSpriteRightPaginationArrow')[0];
    parsePageForImage();
    if(failSafe == undefined){
        console.log("Reached Last",linkList)
        console.log("Starting Bulk Download")
        startBulkDownloads();
    }else{
        picturesViewed++;
        console.log("Checked ",picturesViewed," pictures");
        setTimeout(()=>{
            nextOne.click();
            setTimeout(()=>{
                openNext()
            },3000);
        },1000);
    }
}
openNext();
