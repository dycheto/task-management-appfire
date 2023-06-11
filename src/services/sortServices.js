export const sortByTimeCreated = (tasks) => {

    const sortedTaks = Object.entries(tasks).sort((a, b) => b[1].timestamp.seconds - a[1].timestamp.seconds);

    return sortedTaks
}