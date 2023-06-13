import {
    setDoc,
    doc,
    getDoc,
    updateDoc,
    deleteField,
} from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { db } from "../firebase";
import { v4 } from 'uuid';

export const addTask = async (task, userData) => {
    const userId = userData.uid;
    const taskId = v4();

    try {
        const userRef = await getDoc(doc(db, "userTasks", userId));
        if (!userRef.exists()) {
            await setDoc(doc(db, "userTasks", userId), {
                [taskId]: {
                    title: task.title,
                    description: task.description,
                    timestamp: Timestamp.fromDate(new Date()),
                    taskId: taskId,
                    category: task.category
                }
            })
        } else {
            await updateDoc(doc(db, "userTasks", userId), {
                [taskId]: {
                    title: task.title,
                    description: task.description,
                    timestamp: Timestamp.fromDate(new Date()),
                    taskId: taskId,
                    category: task.category
                }
            })
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateTask = async (task, userData) => {
    const userId = userData.uid;
    const taskId = task.taskId;
    try {
        const docRef = doc(db, "userTasks", userId);
        await updateDoc(docRef, {
            [taskId]: {
                title: task.title,
                description: task.description,
                timestamp: Timestamp.fromDate(new Date()),
                taskId: taskId,
                category: task.category
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteTask = async (userData, taskId) => {
    const userId = userData.uid;
    const taskRef = doc(db, "userTasks", userId);

    try {
        await updateDoc(taskRef, {
            [taskId]: deleteField()
        })
    } catch (error) {
        throw new Error(error.message)
    }
}