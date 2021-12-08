import React, { useEffect, useState } from "react";
import yellowTrace from "../../images/yellowDot.png"
import confirmation from '../../images/submission.png'
import instructions from '../../images/instructions.png'
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db, auth } from '../../firebase/setup';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import Carousel from 'react-elastic-carousel'


export const RelabelScreen = () => {
  const [cords, changeCords] = useState([])
  const [images, changeImages] = useState([])
  const [currImage, changeImage] = useState()
  const [urlDict, updateURLDict] = useState({})
  const [labeled, updateLabeled] = useState([])
  const [type, changeType] = useState('')

  function resetCanvas(type) { //resets canvas
    if (type == "hard") {
      var el = document.getElementById('canvas'), //hard reset clears canvas of all event listeners
        elClone = el.cloneNode(true);
      el.parentNode.replaceChild(elClone, el);
    }
    var context = document.getElementById("canvas").getContext("2d")
    context.clearRect(0, 0, 750, 750)
    var imgSprite = new Image()
    imgSprite.src = currImage
    imgSprite.onload = function (e) {
      context.drawImage(imgSprite, 0, 0, 750, 750);
    }
    changeCords([])
  }

  const onChange = (current) => { //when scrolling to another image, reset everything and update current image shown
    var el = document.getElementById('canvas'), //clear canvas of all event listeners
      elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
    document.getElementById("box").checked = false;
    document.getElementById("polygon").checked = false;
    var context = document.getElementById("canvas").getContext("2d")
    context.clearRect(0, 0, 750, 750)
    var imgSprite = new Image()
    if (labeled.includes(current.item.src)) { //show confirmation image if image has already been labeled
      imgSprite.src = confirmation
    } else {
      imgSprite.src = current.item.src
    }
    changeImage(current.item.src)
    imgSprite.onload = function (e) {
      context.drawImage(imgSprite, 0, 0, 750, 750);
    }
    changeCords([])

  }

  useEffect(() => { //get image data from firestore, draw first image to be shown
    async function getImages() {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      var count = 0
      querySnapshot.forEach(async (doc) => {
        if (doc.data().email == auth.currentUser.email) {
          const imagesPerUser = doc.data().assignedImages;
          imagesPerUser.forEach(async (image) => {
            const storage = getStorage();
            const imageRef = ref(storage, image);
            await getDownloadURL(imageRef)
              .then((url) => {
                if (count == 0) {
                  count += 1
                  changeImage(url)
                  var context = document.getElementById("canvas").getContext("2d")
                  var imgSprite = new Image()
                  imgSprite.src = instructions
                  imgSprite.onload = function (e) {
                    context.drawImage(imgSprite, 0, 0, 750, 750);
                  }
                }
                var tempDict = urlDict;
                tempDict[url] = image
                updateURLDict(tempDict)
                var imageList = images;
                if (!imageList.includes(url)) {
                  imageList.push(url)
                  changeImages(imageList)
                }
              })
          })


        }
      })
    }
    getImages()
  }, []);

  return (
    < div >
      <Carousel
        onNextEnd={onChange}
        onPrevEnd={onChange}>
        {images !== [] && images.map((image) =>
          <img id={image} height="150" src={image}></img>
        )}
      </Carousel>
      <div className="image_canvas">
        <button style={{ marginRight: 30 }} onClick={() => { resetCanvas('soft') }} id="button">Reset</button>
        <canvas id="canvas" width="750" height="750">
          <img src={currImage} height="750" id="image"></img>
        </canvas>
        <button style={{ marginLeft: 30 }} onClick={async () => { //code for submission
          if (currImage in urlDict) {
            const imageQuery = query(collection(db, 'images'), where("ref", "==", urlDict[currImage])) //first add image data to image record
            const imageQuerySnapshot = await getDocs(imageQuery);
            imageQuerySnapshot.forEach(async (document) => {
              const ref = doc(db, 'images', document.id);
              await updateDoc(ref, { 'coordinates': JSON.stringify(cords) })
            })
            const userQuery = query(collection(db, 'users'));
            const userQuerySnapshot = await getDocs(userQuery);
            userQuerySnapshot.forEach(async (document) => { // then remove image from assigned images of user
              if (document.data().email == auth.currentUser.email) {
                const ref = doc(db, 'users', document.id);
                var assignedImagesList = document.data().assignedImages
                assignedImagesList.splice(assignedImagesList.indexOf(currImage))
                await updateDoc(ref, { 'assignedImages': assignedImagesList })
              }
            })
            var tempLabeled = labeled
            tempLabeled.push(currImage)
            updateLabeled(tempLabeled)
            var canvas = document.getElementById('canvas')
            var context = canvas.getContext('2d')
            context.clearRect(0, 0, 750, 750)
            var imgSprite = new Image()
            imgSprite.src = confirmation
            imgSprite.onload = function (e) {
              context.drawImage(imgSprite, 0, 0, 750, 750);
            }
          }
        }} id="submit">Submit</button>
      </div>
      <div>
        <input onChange={function () {
          resetCanvas('hard')
          changeType('polygon')
          const canvas = document.getElementById("canvas")
          const context = canvas.getContext("2d")
          var draw = false;

          function uniq(a) { //remove duplicates from array
            var seen = {};
            return a.filter(function (item) {
              return seen.hasOwnProperty(item) ? false : (seen[item] = true);
            });
          }

          var mouseClicked = function (mouse) {
            if (draw == true) {
              //get mouse coordinates
              var rect = canvas.getBoundingClientRect();
              var mouseXPos = (mouse.x - rect.left);
              var mouseYPos = (mouse.y - rect.top);
              var new_cords = [Math.round(mouseXPos) / 750, Math.round(mouseYPos) / 750]
              var curr_cords = cords
              curr_cords.push(new_cords)
              changeCords(curr_cords)
              var marker = new Image()
              marker.src = yellowTrace  //add yellow dot to signify traced pixel
              marker.onload = function (e) {
                context.drawImage(this, mouseXPos - 2.5, mouseYPos - 2.5, 5, 6);
              }
            }
          }
          canvas.addEventListener("mousedown", function (event) {
            draw = true;
          })
          canvas.addEventListener("mousemove", function (event) {
            mouseClicked(event)
          })
          canvas.addEventListener("mouseup", function (event) {
            draw = false;
            changeCords(uniq(cords)) //remove duplicates from array, then print array
            console.log(cords)
          })
        }
        } type="radio" id="polygon" name="type" ></input>
        <label for="polygon">Semantic Segmentation</label>
        <input onChange={function (e) {
          resetCanvas('hard')
          changeType('box')
          var draw = false;
          const canvas = document.getElementById("canvas")
          const context = canvas.getContext("2d")
          var cords = [-1, -1, -1, -1]

          var mouseClicked = function (mouse) {
            if (draw == true) {
              var marker = new Image()
              var rect = canvas.getBoundingClientRect();
              var mouseXPos = (mouse.x - rect.left);
              var mouseYPos = (mouse.y - rect.top);
              marker.src = yellowTrace  //add yellow dot to signify traced pixel
              marker.onload = function (e) {
                context.drawImage(this, mouseXPos - 2.5, mouseYPos - 2.5, 5, 6);
              }
            }
          }

          canvas.addEventListener("mousedown", function (mouse) {
            var rect = canvas.getBoundingClientRect();
            var mouseXPos = (mouse.x - rect.left);
            var mouseYPos = (mouse.y - rect.top);
            cords[0] = mouseXPos / 750
            cords[1] = mouseYPos / 750
            draw = true;
          })

          canvas.addEventListener("mousemove", function (mouse) {
            mouseClicked(mouse)
          })

          canvas.addEventListener("mouseup", function (mouse) {
            draw = false;
            var rect = canvas.getBoundingClientRect();
            var mouseXPos = (mouse.x - rect.left);
            var mouseYPos = (mouse.y - rect.top);
            cords[2] = mouseXPos / 750
            cords[3] = mouseYPos / 750
            context.clearRect(0, 0, 750, 750)
            var imgSprite = new Image()
            imgSprite.src = currImage
            imgSprite.onload = function (e) {
              context.drawImage(imgSprite, 0, 0, 750, 750);
              context.beginPath();
              context.lineWidth = "6";
              context.strokeStyle = "red";
              context.rect(cords[0] * 750, cords[1] * 750, (cords[2] * 750) - (cords[0] * 750), (cords[3] * 750) - (cords[1] * 750))
              context.stroke();
            }
            changeCords(cords)
            console.log(cords)
          })
        }} type="radio" id="box" name="type"></input>
        <label for="box">Box Labels</label>
      </div>
    </div >
  )
}