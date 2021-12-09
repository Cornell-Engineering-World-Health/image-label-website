import { db, storage } from './setup';
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

function createMetadataObj(data) {
  return {
    date: data.date,
    labels: data.labels,
    task: data.task,
  };
}

export async function downloadImage(imagePrefix, data) {
  const imageRef = ref(storage, imagePrefix);
  var rt = {};

  // GET [imagePrefix] URL
  const url = await getDownloadURL(imageRef);
  rt = {
    path: imagePrefix,
    url: url,
    metadata: createMetadataObj(data),
  };
  return rt;
}

// Returns: a list of image metadata by task
export async function downloadImageByTasks(time, tasks, thumbnail) {
  const imageRef = collection(db, 'images');

  const taskRequests = tasks.map(async (t) => {
    const q = query(
      imageRef,
      where('task', '==', t),
      where(
        'date',
        '>=',
        time === 0 ? new Date(0) : new Date(Date.now() - time)
      ),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const imageRequests = querySnapshot.docs.map(async (doc) => {
      try {
        var imagePath = doc.data().ref; // image/task/...
        if (thumbnail) imagePath = imagePath.replace('images', 'thumbnails');

        // GET metadata of the image
        return await downloadImage(imagePath, doc.data());
      } catch (e) {
        console.log(e);
      }
    });
    return await Promise.all(imageRequests);
  });

  return (await Promise.all(taskRequests)).flat();
}

// Returns: a list of image metadata by user
export async function downloadImageByUsers(time, users, thumbnail) {
  const imageRef = collection(db, 'images');

  const usersRequests = users.map(async (email) => {
    const q = query(
      imageRef,
      where('email', '==', email),
      where(
        'date',
        '>=',
        time === 0 ? new Date(0) : new Date(Date.now() - time)
      ),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const imageRequests = querySnapshot.docs.map(async (doc) => {
      var imagePath = doc.data().ref; // image/task/...
      if (thumbnail) imagePath = imagePath.replace('images', 'thumbnails');

      // GET metadata of the image
      return await downloadImage(imagePath, doc.data());
    });

    return await Promise.all(imageRequests);
  });

  return (await Promise.all(usersRequests)).flat();
}

// Returns: a list of image metadata by user & task
export async function downloadImageByTasksAndUsers(
  time,
  tasks,
  users,
  thumbnail
) {
  const imageRef = collection(db, 'images');

  // var images = [];

  const usersRequests = users.map(async (email) => {
    //each user in filter
    const q = query(
      imageRef,
      where('email', '==', email),
      where(
        'date',
        '>=',
        time === 0 ? new Date(0) : new Date(Date.now() - time)
      ),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const imageRequests = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      // if task is in filter
      if (tasks.includes(data.task)) {
        var imagePath = data.ref; // image/task/...
        if (thumbnail) imagePath = imagePath.replace('images', 'thumbnails');
        return await downloadImage(imagePath, doc.data());
      }
    });

    return await Promise.all(imageRequests);
  });

  return (await Promise.all(usersRequests)).flat();
}

export async function downloadAllImages(time, thumbnail) {
  const imageRef = collection(db, 'images');

  const q = query(
    imageRef,
    orderBy('date', 'desc'),
    where('date', '>=', time === 0 ? new Date(0) : new Date(Date.now() - time)),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  // Map querySnapshot to array of async functions (Promises) [forEach is synchronous!]
  const imageRequests = querySnapshot.docs.map(async (doc) => {
    var imagePath = doc.data().ref; // image/task/...
    if (thumbnail) imagePath = imagePath.replace('images', 'thumbnails');

    // Return image objects
    return await downloadImage(imagePath, doc.data());
  });

  // Return array of resolved promises (i.e. the image objects)
  return Promise.all(imageRequests);
}
