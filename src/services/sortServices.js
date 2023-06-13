export const sortByTimeCreated = (tasks) => {

    const sortedTaks = Object.entries(tasks).sort((a, b) => b[1].timestamp.seconds - a[1].timestamp.seconds);

    return sortedTaks;
}

export const sortByCategory = (tasks, category) => {
    let sortedTasksArray = [];
    tasks.map(tasks => {
        if (tasks[1].category === category) {
            sortedTasksArray.push(tasks);
        }
    });
    
    return sortedTasksArray;
}