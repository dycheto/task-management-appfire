export const formatData = (data) => {
    let parsedData = [];

    data.map(task => {
        parsedData.push(task[1]);
    })

    return parsedData;
}