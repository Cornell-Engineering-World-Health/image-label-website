import { db } from './setup';
import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  arrayUnion,
  setDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';

export async function createTask(task, labels) {
  const ref = doc(db, 'tasks', task);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    // task exists
    const doUpdate = window.confirm('Task already exists. Update labels?');
    if (doUpdate) {
      try {
        await updateDoc(ref, {
          labels: arrayUnion(...labels),
        });
      } catch (e) {
        alert(e);
      }
    }
  } else {
    // task does not exist, create new task
    try {
      //add to task collection
      await setDoc(ref, {
        labels: labels,
      });
      //add to taskList
      await updateDoc(doc(db, 'lists', 'taskList'), {
        tasks: arrayUnion(task),
      });
    } catch (e) {
      alert(e);
    }
  }
}

export async function getUsersList() {
  const docRef = doc(db, 'lists', 'userList');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()['users'];
    return data;
  } else {
    alert('userslist error!');
    return [];
  }
}

export async function getTasksList() {
  const docRef = doc(db, 'lists', 'taskList');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()['tasks'];
    return data;
  } else {
    alert('taskslist error!');
    return [];
  }
}

export async function getGroupsList() {
  const docRef = doc(db, 'lists', 'groupList');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data()['groups'];
    return data;
  } else {
    alert('groupslist error!');
    return [];
  }
}

export async function assignTaskToUser(assignToUser, assignTask) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', assignToUser));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc, {
        currentTask: assignTask,
        // assignedTasks: arrayUnion(assignTask),
      });
      alert('Successfully assigned task to user!');
    });
  } catch (e) {
    alert(e);
  }
}

export async function assignTaskToGroup(assignToGroup, assignTask) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('groupID', '==', assignToGroup));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc, {
        currentTask: assignTask,
        // assignedTasks: arrayUnion(assignTask),
      });
      alert('Successfully assigned task to group!');
    });
  } catch (e) {
    alert(e);
  }
}

export async function getBugReports() {
  try {
    const bugsRef = collection(db, 'bugs');
    const q = query(bugsRef);
    const querySnapshot = await getDocs(q);

    var data = [];

    querySnapshot.forEach(async (doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (e) {
    alert(e);
    return [];
  }
}
