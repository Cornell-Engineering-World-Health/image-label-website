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

export async function downloadImage(imagePrefix) {
  const imageRef = ref(storage, imagePrefix);
  var rt = {};

  // GET [imagePrefix] URL
  const url = await getDownloadURL(imageRef);
  const fullMetadata = await getMetadata(imageRef);
  rt = {
    path: imagePrefix,
    url: url,
    metadata: fullMetadata.customMetadata,
  };
  return rt;
}

// Returns: a list of image metadata by task
export async function downloadImageByTasks(tasks, thumbnail) {
  const imageRef = collection(db, "images");

  const taskRequests = tasks.map(async (t) => {
    const q = query(imageRef, where("task", "==", t), orderBy("date", "desc"));

    const querySnapshot = await getDocs(q);

    const imageRequests = querySnapshot.docs.map(async (doc) => {
      try {
        var imagePath = doc.data().ref; // image/task/...
        if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");

        // GET metadata of the image
        return await downloadImage(imagePath);
      } catch (e) {
        console.log(e);
      }
    });
    return await Promise.all(imageRequests);
  });

  return (await Promise.all(taskRequests)).flat();
}

// Returns: a list of image metadata by user
export async function downloadImageByUsers(users, thumbnail) {
  const imageRef = collection(db, "images");

  const usersRequests = users.map(async (email) => {
    const q = query(
      imageRef,
      where("email", "==", email),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);

    const imageRequests = querySnapshot.docs.map(async (doc) => {
      var imagePath = doc.data().ref; // image/task/...
      if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");

      // GET metadata of the image
      return await downloadImage(imagePath);
    });

    return await Promise.all(imageRequests);
  });

  return (await Promise.all(usersRequests)).flat();
}

// Returns: a list of image metadata by user & task
export async function downloadImageByTasksAndUsers(tasks, users, thumbnail) {
  const imageRef = collection(db, "images");

  // var images = [];

  const usersRequests = users.map(async (email) => {
    //each user in filter
    const q = query(
      imageRef,
      where("email", "==", email),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);

    const imageRequests = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      // if task is in filter
      if (tasks.includes(data.task)) {
        var imagePath = data.ref; // image/task/...
        if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");
        return await downloadImage(imagePath);
      }
    });

    return await Promise.all(imageRequests);
  });

  return (await Promise.all(usersRequests)).flat();
}

export async function downloadAllImages(thumbnail) {
  const imageRef = collection(db, "images");

  const q = query(imageRef, orderBy("date", "desc"), limit(10));
  const querySnapshot = await getDocs(q);

  // Map querySnapshot to array of async functions (Promises) [forEach is synchronous!]
  const imageRequests = querySnapshot.docs.map(async (doc) => {
    var imagePath = doc.data().ref; // image/task/...
    if (thumbnail) imagePath = imagePath.replace("images", "thumbnails");

    // Return image objects
    return await downloadImage(imagePath);
  });

  // Return array of resolved promises (i.e. the image objects)
  return Promise.all(imageRequests);
}
