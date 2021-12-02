import { db, storage } from "./setup";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { ref, getDownloadURL, getMetadata } from "firebase/storage";

// [downloadImage(url)] GETS the URL and metadata of [imagePrefix]
// and returns the data
// Requires: [imagePrefix] is a valid folder prefix.
// An example of a valid folder prefix is 'images/task1'.
export async function downloadImage(imagePrefix) {
  const imageRef = ref(storage, imagePrefix);
  var rt = {};

  // GET [imagePrefix] URL
  await getDownloadURL(ref(storage, imagePrefix))
    .then(async (url) => {
      // Get metadata properties
      await getMetadata(imageRef)
        .then((fullMetadata) => {
          rt = {
            path: imageRef,
            url: url,
            metadata: fullMetadata.customMetadata,
          };
          console.log(rt);
          // return {
          //   path: imageRef,
          //   url: url,
          //   metadata: fullMetadata.customMetadata,
          // };
        })
        .catch((error) => {
          // Error getting metadata
          alert(error);
          console.log(error);
        });
    })
    .catch((error) => {
      // Error getting URL
      alert(error);
      console.log(error);
    });
  return rt;
}

// Returns: a list of image metadata by task
export async function downloadImageByTasks(tasks, thumbnail) {
  const imageRef = collection(db, "images");
  var images = [];

  tasks.forEach(async (t) => {
    const q = query(imageRef, where("task", "==", t), orderBy("date", "desc"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      var imagePath = doc.data().ref; // image/task/...
      if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");

      // GET metadata of the image
      images.push(await downloadImage(imagePath));
    });
  });

  return images;
}

// Returns: a list of image metadata by user
export async function downloadImageByUsers(users, thumbnail) {
  const imageRef = collection(db, "images");

  var images = [];

  users.forEach(async (email) => {
    const q = query(
      imageRef,
      where("email", "==", email),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      var imagePath = doc.data().ref; // image/task/...
      if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");

      // GET metadata of the image
      images.push(await downloadImage(imagePath));
    });
  });

  return images;
}

// Returns: a list of image metadata by user & task
export async function downloadImageByTasksAndUsers(tasks, users, thumbnail) {
  const imageRef = collection(db, "images");

  var images = [];

  users.forEach(async (email) => {
    //each user in filter
    const q = query(
      imageRef,
      where("email", "==", email),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      // if task is in filter
      if (tasks.includes(data.task)) {
        var imagePath = data.ref; // image/task/...
        if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");

        // GET metadata of the image
        images.push(await downloadImage(imagePath));
      }
    });
  });

  return images;
}

export async function downloadAllImages(thumbnail) {
  const imageRef = collection(db, "images");
  console.log("hi");
  var images = [];

  const q = query(imageRef, orderBy("date", "desc"), limit(10));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    var imagePath = doc.data().ref; // image/task/...
    if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");
    console.log(imagePath);
    // GET metadata of the image
    images.push(await downloadImage(imagePath));
  });

  return images;
}
